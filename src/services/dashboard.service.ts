//--------------------------------------------------------------------------
// Imports Section: (Models)
//--------------------------------------------------------------------------
import * as mongoose    from 'mongoose';


//--------------------------------------------------------------------------
// Imports Section: (Models)
//--------------------------------------------------------------------------
import * as Models      from '../models/mongo/models';
import { OrderItem }    from '../models/mongo/models';
import { orderModel }   from '../models/mongo/models';
import { TopCustomer }  from '../models/mongo/top-customer.model';
import { OrderStatus }  from '../models/mongo/enums/order-status.enum';
import { ObjectId }     from 'mongodb';

//--------------------------------------------------------------------------
// Service Class:
//--------------------------------------------------------------------------
export class DashboardService
{
    //----------------------------------------------------------------------
    // Singleton Implementation:
    //----------------------------------------------------------------------
    public static getInstance(): DashboardService
    {
        if (DashboardService._instance == null)
        {
            DashboardService._instance = new DashboardService();
        }
        return DashboardService._instance;
    }
    private static _instance: DashboardService;


    //----------------------------------------------------------------------
    // Constructor Method Section:
    //----------------------------------------------------------------------
    private constructor() { }

    //----------------------------------------------------------------------
    // Public Methods Section:
    //----------------------------------------------------------------------
    public getTopCustomers() : Promise<TopCustomer[]>
    {
        return new Promise(async (resolve, reject) => {
            const mongoQuery = [
                {
                    $match: {
                        $or: [{ status: 'DISPATCHED' }, { status: 'PAID' }]
                    }
                },
                {
                    '$group': {
                        '_id': '$customer',
                        'total': {
                            '$sum': '$total'
                        }
                    }
                },
                {
                    '$lookup': {
                        'from': 'customers',
                        'localField': '_id',
                        'foreignField': '_id',
                        'as': 'Customer'
                    }
                },
                {
                    '$sort': {
                        'total': -1
                    }
                },
                {
                    '$limit': 10
                }
            ];

            try
            {
                const queryResult = await orderModel.aggregate(mongoQuery);
                const result = queryResult.map((result) => {
                    return ({
                        id: result._id,
                        name: `${result.Customer[0].first_name} ${result.Customer[0].last_name}`,
                        total: result.total
                    } as TopCustomer);
                });
                resolve (result);
            }
            catch (error)
            {
                reject(error);
            }
        });
    }
    //----------------------------------------------------------------------
    public async getTopSellers()
    {
        return new Promise(async (resolve, reject) => {
            const mongoQuery = [
                {
                    '$match': {
                        '$or': [
                            {
                                'status': 'DISPATCHED'
                            }, {
                                'status': 'PAID'
                            }
                        ]
                    }
                }, {
                    '$group': {
                        '_id': '$salesman',
                        'total': {
                            '$sum': '$total'
                        }
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': '_id',
                        'foreignField': '_id',
                        'as': 'salesman'
                    }
                },
                {
                    '$sort': {
                        'total': -1
                    }
                },
                {
                    '$limit': 10
                }
            ];


            try
            {
                const queryResult = await orderModel.aggregate(mongoQuery);
                const result = queryResult.map((result) =>
                {
                    return ({
                        id: result._id,
                        name: `${result.Customer[0].first_name} ${result.Customer[0].last_name}`,
                        total: result.total
                    } as TopCustomer);
                });
                resolve(result);
            }
            catch (error)
            {
                reject(error);
            }

            resolve('');
        });
    }
}




