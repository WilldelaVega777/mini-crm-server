//---------------------------------------------------------------------
// Imports Section:
//---------------------------------------------------------------------
import { importSchema }             from 'graphql-import';
import { gql }                      from 'apollo-server-express';

//---------------------------------------------------------------------
// Imports Section (GraphQL Schema File):
//---------------------------------------------------------------------
const typeDefsString = importSchema(
    'src/models/graphql/typedefs/general.typedefs.graphql'
);

export const typeDefs = gql(typeDefsString);
