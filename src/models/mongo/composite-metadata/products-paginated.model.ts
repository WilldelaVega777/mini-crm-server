//--------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------
import { Product }              from '../product.model';
import { PaginatedMetadata }    from '../generic/paginated-metadata';

//--------------------------------------------------------------------------
// Class Section
//--------------------------------------------------------------------------
export class ProductsPaginated
{
    //---------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------
    public products: Product[];
    public metadata: PaginatedMetadata;

    //---------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------
    constructor(pProducts?: Product[], pMetadata?: PaginatedMetadata)
    {
        if (pProducts)
        {
            this.products = pProducts;
        }

        if (pMetadata)
        {
            this.metadata = pMetadata;
        }
    }
}
