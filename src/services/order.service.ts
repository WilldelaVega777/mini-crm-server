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
import { ObjectID, ObjectId } from 'mongodb';


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
            Models.orderModel.find({customer: {$eq: new mongoose.mongo.ObjectId(customerId)}}).limit(limit).skip(offset)
                .then((orders: Models.Order[]) =>
                {
                    const readyOrders: Models.Order[] = (orders.map(order =>
                    {
                        order.id = order['_id'];
                        return order;
                    }));

                    Models.orderModel.countDocuments({ customer: { $eq: new mongoose.mongo.ObjectId(customerId) }}, (error, count) =>
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
                // Fix Id's
                input.customer  = await new mongoose.mongo.ObjectId(input.customer);
                input.salesman  = await new mongoose.mongo.ObjectId(input.salesman);
                input['_id']    = await new mongoose.mongo.ObjectId();
                input['id']     = input['_id'].toString();

                input.items.map(async (orderItem: OrderItem) => {
                    orderItem['_id'] = await new mongoose.mongo.ObjectId();
                    orderItem.id = (orderItem['_id']).toString();
                    orderItem.product['_id'] =
                    await new mongoose.mongo.ObjectId(orderItem.product.id);
                    return orderItem;
                });

                // Adjust Projected Stock for Products in Order
                input.items.forEach(async (orderItem: OrderItem) =>
                {
                    await Models.productModel.updateOne(
                        { _id: orderItem.product.id },
                        {
                            '$inc': {
                                'projected_stock': `-${orderItem.quantity}`
                            }
                        }
                    );
                });

                // Create Order in Orders Collection
                const newOrder = await Models.orderModel.create(input);
                newOrder['id'] = newOrder['_id'];
                Models.orderModel.findOneAndUpdate(
                    { _id: input.id },
                    newOrder,
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

                // Find Customer to update (add this order to orders collection)
                const customerToUpdate: Models.Customer = await Models.customerModel.findById(newOrder.customer);

                if (!customerToUpdate.orders)
                {
                    customerToUpdate.orders = [];
                }

                // Add new Order to Customer Object
                customerToUpdate.orders = customerToUpdate.orders.concat([newOrder]);

                // Updates Customer Object
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
        let operation: string;

        return new Promise(async (resolve, reject) =>
        {
            // Recalculate Product stock based in new Order Status
            if (input.status.toString() === 'DISPATCHED')
            {
                operation = '-';
            }
            else if (input.status.toString() === 'CANCELLED')
            {
                operation = '+';
            }
            input.items.forEach(async (orderItem: OrderItem) =>
            {
                if (operation === '-')
                {
                    await Models.productModel.updateOne(
                        { _id: orderItem.product.id },
                        {
                            '$inc': {
                                'stock': `${operation}${orderItem.quantity}`
                            }
                        }
                    );
                }

                if (operation === '+')
                {
                    await Models.productModel.updateOne(
                        { _id: orderItem.product.id },
                        {
                            '$inc': {
                                'projected_stock': `${operation}${orderItem.quantity}`
                            }
                        }
                    );
                }
            });

            // Fix Id's
            input.customer = await new mongoose.mongo.ObjectId(input.customer);
            input.salesman = await new mongoose.mongo.ObjectId(input.salesman);

            // Update Order
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
