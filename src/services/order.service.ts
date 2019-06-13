//--------------------------------------------------------------------------
// Imports Section: (Models)
//--------------------------------------------------------------------------
import * as mongoose            from 'mongoose';

//--------------------------------------------------------------------------
// Imports Section: (Models)
//--------------------------------------------------------------------------
import * as Models              from '../models/mongo/models';
import { PaginatedMetadata }    from '../models/mongo/models';
import { OrderItem }            from '../models/mongo/models';
import { OrderStatus }          from '../models/mongo/enums/order-status.enum';


//--------------------------------------------------------------------------
// Service Class:
//--------------------------------------------------------------------------
export class OrderService
{
    //----------------------------------------------------------------------
    // Singleton Implementation:
    //----------------------------------------------------------------------
    public static getInstance(): OrderService
    {
        if (OrderService._instance == null)
        {
            OrderService._instance = new OrderService();
        }
        return OrderService._instance;
    }
    private static _instance: OrderService;


    //----------------------------------------------------------------------
    // Constructor Method Section:
    //----------------------------------------------------------------------
    private constructor() { }

    //----------------------------------------------------------------------
    // Public Methods Section:
    //----------------------------------------------------------------------
    public getOrders(limit: number, offset: number): Promise<Models.Order[]>
    {
        return new Promise((resolve, reject) =>
        {
            Models.orderModel.find({}).limit(limit).skip(offset)
                .then((orders: Models.Order[]) =>
                {
                    resolve(orders.map(order =>
                    {
                        order.id = order['_id'];
                        return order;
                    }));
                })
                .catch(error => reject(error));
        });
    }
    //----------------------------------------------------------------------
    public getOrdersPaginated(limit: number, offset: number): Promise<Models.OrdersPaginated>
    {
        return new Promise((resolve, reject) =>
        {
            Models.orderModel.find({}).limit(limit).skip(offset)
                .then((orders: Models.Order[]) =>
                {
                    const readyOrders: Models.Order[] = (orders.map(order =>
                    {
                        order.id = order['_id'];
                        return order;
                    }));

                    Models.orderModel.countDocuments({}, (error, count) =>
                    {
                        if (error)
                        {
                            reject(error);
                        }
                        else
                        {
                            const ordersMetadata: PaginatedMetadata =
                                new Models.PaginatedMetadata(count);

                            resolve(
                                new Models.OrdersPaginated(
                                    readyOrders, ordersMetadata
                                )
                            );
                        }
                    });
                })
                .catch(error => reject(error));
        });
    }
    //----------------------------------------------------------------------
    public getOrderById(id: string): Promise<Models.Order>
    {
        return new Promise((resolve, reject) =>
        {
            Models.orderModel.findById(
                id,
                (error, order) =>
                {
                    if (error)
                    {
                        reject(error);
                    }
                    else
                    {
                        order.id = order['_id'];
                        resolve(order);
                    }
                }
            );
        });
    }
    //----------------------------------------------------------------------
    public getOrdersByCustomer(limit: number, offset: number, customerId: string)
        : Promise<Models.OrdersPaginated>
    {
        return new Promise((resolve, reject) =>
        {
            Models.orderModel.find({customer: {$eq: customerId}}).limit(limit).skip(offset)
                .then((orders: Models.Order[]) =>
                {
                    const readyOrders: Models.Order[] = (orders.map(order =>
                    {
                        order.id = order['_id'];
                        return order;
                    }));

                    Models.orderModel.countDocuments({ customer: { $eq: customerId }}, (error, count) =>
                    {
                        if (error)
                        {
                            reject(error);
                        }
                        else
                        {
                            const ordersMetadata: PaginatedMetadata =
                                new Models.PaginatedMetadata(count);

                            resolve(
                                new Models.OrdersPaginated(
                                    readyOrders, ordersMetadata
                                )
                            );
                        }
                    });
                })
                .catch(error => reject(error));
        });
    }

    //----------------------------------------------------------------------
    public async createOrder(input: Models.Order): Promise<Models.Order>
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                const newOrder = await Models.orderModel.create(input);

                newOrder.id = newOrder._id;

                const customerToUpdate: Models.Customer = await Models.customerModel.findById(newOrder.customer);

                if (!customerToUpdate.orders)
                {
                    customerToUpdate.orders = [];
                }

                customerToUpdate.orders = customerToUpdate.orders.concat([newOrder]);

                await Models.customerModel.findOneAndUpdate(
                    { _id: customerToUpdate['_id'] },
                    customerToUpdate,
                    { new: false }
                );

                resolve(newOrder);
            }
            catch (error)
            {
                reject(error);
            }
        });
    }
    //----------------------------------------------------------------------
    public updateOrder(input: Models.Order): Promise<Models.Order>
    {
        return new Promise((resolve, reject) =>
        {
            let operation: string;
            if (input.status === OrderStatus.DISPATCHED)
            {
                operation = '-';
            }
            else if (input.status === OrderStatus.CANCELLED)
            {
                operation = '+';
            }
            input.items.forEach(async (orderItem: OrderItem) =>
            {
                await Models.productModel.updateOne(
                    { _id: orderItem.product.id },
                    {
                        '$inc': {
                            'stock': `${operation}${orderItem.quantity}`
                        }
                    });
            });


            Models.orderModel.findOneAndUpdate(
                { _id: input.id },
                input,
                { new: true },
                (error, order) =>
                {
                    if (error)
                    {
                        reject(error);
                    }
                    else
                    {
                        resolve(order);
                    }
                }
            );
        });
    }
    //----------------------------------------------------------------------
    public removeOrder(input: string): Promise<string>
    {
        return new Promise((resolve, reject) =>
        {
            Models.orderModel.findOneAndRemove(
                { _id: input },
                (error) =>
                {
                    if (error)
                    {
                        reject(error);
                    }
                    else
                    {
                        resolve('Se eliminó el registro!');
                    }
                }
            );
        });
    }
}