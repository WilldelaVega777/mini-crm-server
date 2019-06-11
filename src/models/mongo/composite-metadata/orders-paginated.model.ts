//--------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------
import { Order }                    from '../order.model';
import { OrderItem }                from '../order-item.model';
import { PaginatedMetadata }        from '../generic/paginated-metadata';

//--------------------------------------------------------------------------
// Class Section
//--------------------------------------------------------------------------
export class OrdersPaginated
{
    //---------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------
    public orders: Order[];
    public metadata: PaginatedMetadata;

    //---------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------
    constructor(pOrders?: Order[], pMetadata?: PaginatedMetadata)
    {
        if (pOrders)
        {
            this.orders = pOrders;
        }

        if (pMetadata)
        {
            this.metadata = pMetadata;
        }
    }
}
