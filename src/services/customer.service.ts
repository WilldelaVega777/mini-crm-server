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
export class CustomerService
{
    //----------------------------------------------------------------------
    // Singleton Implementation:
    //----------------------------------------------------------------------
    public static getInstance() : CustomerService
    {
        if (CustomerService._instance == null)
        {
            CustomerService._instance = new CustomerService();
        }
        return CustomerService._instance;
    }
    private static _instance: CustomerService;


    //----------------------------------------------------------------------
    // Constructor Method Section:
    //----------------------------------------------------------------------
    private constructor() { }

    //----------------------------------------------------------------------
    // Public Methods Section:
    //----------------------------------------------------------------------
    public getCustomers(limit: number, offset: number): Promise<Models.Customer[]>
    {
        return new Promise((resolve, reject) => {
            Models.customerModel.find({}).limit(limit).skip(offset)
            .then((customers: Models.Customer[]) => {
                resolve(customers.map(customer => {
                    customer.id = customer['_id'];
                    return customer;
                }));
            })
            .catch(error => reject(error));
        });
    }
    //----------------------------------------------------------------------
    public getCustomersPaginated(limit: number, offset: number, salesman: string): Promise<Models.CustomersPaginated>
    {
        return new Promise((resolve, reject) =>
        {
            let filter = {};
            if (salesman)
            {
                filter = { 'salesman' : salesman };
            }

            Models.customerModel.find(filter).limit(limit).skip(offset)
                .then((customers: Models.Customer[]) =>
                {
                    const readyCustomers: Models.Customer[] = (customers.map(customer =>
                    {
                        customer.id = customer['_id'];
                        return customer;
                    }));

                    Models.customerModel.countDocuments(filter, (error, count) => {
                        if (error)
                        {
                            reject(error);
                        }
                        else
                        {
                            const customersMetadata: PaginatedMetadata =
                                new Models.PaginatedMetadata(count);

                            resolve(
                                new Models.CustomersPaginated(
                                    readyCustomers, customersMetadata
                                )
                            );
                        }
                    });
                })
                .catch(error => reject(error));
        });
    }
    //----------------------------------------------------------------------
    public getCustomerById(id: string): Promise<Models.Customer>
    {
        return new Promise((resolve, reject) => {
            Models.customerModel.findById(
                id,
                (error, customer) => {
                    if (error)
                    {
                        reject(error);
                    }
                    else
                    {
                        resolve(customer);
                    }
                }
            );
        });
    }
    //----------------------------------------------------------------------
    public async createCustomer(input: Models.Customer): Promise<Models.Customer>
    {
        const newCustomer = await Models.customerModel.create(input);
        newCustomer.id = newCustomer._id;
        return Promise.resolve(newCustomer);
    }
    //----------------------------------------------------------------------
    public updateCustomer(input: Models.Customer): Promise<Models.Customer>
    {
        return new Promise((resolve, reject) => {
            Models.customerModel.findOneAndUpdate(
                { _id: input.id },
                input,
                { new: true },
                (error, customer) =>
                {
                    if (error)
                    {
                        reject(error);
                    }
                    else
                    {
                        resolve(customer);
                    }
                }
            );
        });
    }
    //----------------------------------------------------------------------
    public removeCustomer(input: string): Promise<string>
    {
        return new Promise((resolve, reject) => {
            Models.customerModel.findOneAndRemove(
                {_id: input},
                (error) => {
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
