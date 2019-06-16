//--------------------------------------------------------------------------
// Imports Section: (Models)
//--------------------------------------------------------------------------
import * as mongoose from 'mongoose';

//--------------------------------------------------------------------------
// Imports Section: (Models)
//--------------------------------------------------------------------------
import * as Models from '../models/mongo/models';
import { PaginatedMetadata } from '../models/mongo/models';

//--------------------------------------------------------------------------
// Service Class:
//--------------------------------------------------------------------------
export class ProductService
{
    //----------------------------------------------------------------------
    // Singleton Implementation:
    //----------------------------------------------------------------------
    public static getInstance(): ProductService
    {
        if (ProductService._instance == null)
        {
            ProductService._instance = new ProductService();
        }
        return ProductService._instance;
    }
    private static _instance: ProductService;


    //----------------------------------------------------------------------
    // Constructor Method Section:
    //----------------------------------------------------------------------
    private constructor() { }

    //----------------------------------------------------------------------
    // Public Methods Section:
    //----------------------------------------------------------------------
    public getProducts(limit: number, offset: number): Promise<Models.Product[]>
    {
        return new Promise((resolve, reject) =>
        {
            Models.productModel.find({}).limit(limit).skip(offset)
                .then((products: Models.Product[]) =>
                {
                    resolve(products.map(product =>
                    {
                        product.id = product['_id'];
                        return product;
                    }));
                })
                .catch(error => reject(error));
        });
    }
    //----------------------------------------------------------------------
    public getProductsPaginated(limit: number, offset: number, stock: boolean = false): Promise<Models.ProductsPaginated>
    {
        return new Promise((resolve, reject) =>
        {
            let filter: {};
            if (stock)
            {
                filter = { projected_stock: { $gt : 0 }};
            }

            Models.productModel.find(filter).limit(limit).skip(offset)
                .then((products: Models.Product[]) =>
                {
                    const readyProducts: Models.Product[] = (products.map(product =>
                    {
                        product.id = product['_id'];
                        return product;
                    }));

                    Models.productModel.countDocuments({}, (error, count) =>
                    {
                        if (error)
                        {
                            reject(error);
                        }
                        else
                        {
                            const productsMetadata: PaginatedMetadata =
                                new Models.PaginatedMetadata(count);

                            resolve(
                                new Models.ProductsPaginated(
                                    readyProducts, productsMetadata
                                )
                            );
                        }
                    });
                })
                .catch(error => reject(error));
        });
    }
    //----------------------------------------------------------------------
    public getProductById(id: string): Promise<Models.Product>
    {
        return new Promise((resolve, reject) =>
        {
            Models.productModel.findById(
                id,
                (error, product) =>
                {
                    if (error)
                    {
                        reject(error);
                    }
                    else
                    {
                        product.id = product['_id'];
                        resolve(product);
                    }
                }
            );
        });
    }

    //----------------------------------------------------------------------
    public async createProduct(input: Models.Product): Promise<Models.Product>
    {
        input.projected_stock = input.stock;
        const newProduct = await Models.productModel.create(input);
        newProduct.id = newProduct._id;
        return Promise.resolve(newProduct);
    }
    //----------------------------------------------------------------------
    public updateProduct(input: Models.Product): Promise<Models.Product>
    {
        return new Promise((resolve, reject) =>
        {
            Models.productModel.findOneAndUpdate(
                { _id: input.id },
                input,
                { new: true },
                (error, product) =>
                {
                    if (error)
                    {
                        reject(error);
                    }
                    else
                    {
                        resolve(product);
                    }
                }
            );
        });
    }
    //----------------------------------------------------------------------
    public removeProduct(input: string): Promise<string>
    {
        return new Promise((resolve, reject) =>
        {
            Models.productModel.findOneAndRemove(
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
