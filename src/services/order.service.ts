//--------------------------------------------------------------------------
// Imports Section: (Models)
//--------------------------------------------------------------------------
import * as mongoose            from 'mongoose';

//--------------------------------------------------------------------------
// Imports Section: (Models)
//--------------------------------------------------------------------------
import * as Models              from '../models/mongo/models';
import { PaginatedMetadata }    from '../models/mongo/models';

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
    public async createOrder(input: Models.Order): Promise<Models.Order>
    {
        const newOrder = await Models.orderModel.create(input);
        newOrder.id = newOrder._id;
        return Promise.resolve(newOrder);
    }
    //----------------------------------------------------------------------
    public updateOrder(input: Models.Order): Promise<Models.Order>
    {
        return new Promise((resolve, reject) =>
        {
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
