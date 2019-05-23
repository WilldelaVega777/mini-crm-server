//--------------------------------------------------------------------------
// Imports Section: (Models)
//--------------------------------------------------------------------------
import * as mongoose     from "mongoose";
import { DocumentQuery } from "mongoose";
//--------------------------------------------------------------------------
// Imports Section: (Models)
//--------------------------------------------------------------------------
import { customerModel } from "../models/mongo/customer.model"
import { emailModel }    from "../models/mongo/email.model";
import { orderModel }    from "../models/mongo/order.model";

import { Customer }      from "../models/mongo/customer.model";
import { CustomerTypes } from "../models/mongo/enums/customer-types.enum";


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
    public getCustomers(limit: number): Promise<Customer[]>
    {
        return new Promise((resolve, reject) => {
            customerModel.find({}).limit(limit)
            .then((customers: Customer[]) => {
                resolve(customers.map(customer => {
                    customer.id = customer['_id']
                    return customer
                }))
            })
            .catch(error => reject(error))
        });
    }
    //----------------------------------------------------------------------
    public getCustomerById(id: string): Promise<Customer>
    {
        return new Promise((resolve, reject) => {
            customerModel.findById(
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
            )
        });
    }
    //----------------------------------------------------------------------
    public async createCustomer(input: Customer): Promise<Customer>
    {
        const newCustomer = await customerModel.create(input);
        newCustomer.id = newCustomer._id;
        return Promise.resolve(newCustomer);
    }
    //----------------------------------------------------------------------
    public updateCustomer(input: Customer): Promise<Customer>
    {
        return new Promise((resolve, reject) => {
            customerModel.findOneAndUpdate(
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
            customerModel.findOneAndRemove(
                {_id: input},
                (error) => {
                    if (error)
                    {
                        reject(error);
                    }
                    else
                    {
                        resolve("Chingó su madre este registro!");
                    }
                }
            )
        });
    }
}
