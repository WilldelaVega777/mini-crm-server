//--------------------------------------------------------------------------
// Class Section
//--------------------------------------------------------------------------
export class PaginatedMetadata
{
    //---------------------------------------------------------------------
    // Public Fields Section
    //---------------------------------------------------------------------
    totalRecords: number;

    //---------------------------------------------------------------------
    // Constructor Method Section
    //---------------------------------------------------------------------
    constructor(pTotalRecords?: number)
    {
        if (pTotalRecords)
        {
            this.totalRecords = pTotalRecords;
        }
        else
        {
            this.totalRecords = 0;
        }
    }
}

const x: PaginatedMetadata = new PaginatedMetadata()
