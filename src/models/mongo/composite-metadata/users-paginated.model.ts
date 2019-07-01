//--------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------
import { User } from '../user.model';
import { PaginatedMetadata } from '../generic/paginated-metadata';

//--------------------------------------------------------------------------
// Class Section
//--------------------------------------------------------------------------
export class UsersPaginated
{
    //---------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------
    public users: User[];
    public metadata: PaginatedMetadata;

    //---------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------
    constructor(pUsers?: User[], pMetadata?: PaginatedMetadata)
    {
        if (pUsers)
        {
            this.users = pUsers;
        }

        if (pMetadata)
        {
            this.metadata = pMetadata;
        }
    }
}
