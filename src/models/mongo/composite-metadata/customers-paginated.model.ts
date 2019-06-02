//--------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------
import { Customer }             from '../customer.model';
import { PaginatedMetadata }    from '../generic/paginated-metadata';

//--------------------------------------------------------------------------
// Class Section
//--------------------------------------------------------------------------
export class CustomersPaginated
{
    //---------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------
    public customers           : Customer[];
    public metadata            : PaginatedMetadata;

    //---------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------
    constructor(pCustomers?: Customer[], pMetadata?: PaginatedMetadata)
    {
        if (pCustomers)
        {
            this.customers = pCustomers;
        }

        if (pMetadata)
        {
            this.metadata = pMetadata;
        }
    }
}
