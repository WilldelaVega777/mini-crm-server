//---------------------------------------------------------------------
// Imports Section:
//---------------------------------------------------------------------
import { importSchema }             from 'graphql-import';
import { gql }                      from 'apollo-server-express';

import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';



//---------------------------------------------------------------------
// Imports Section (GraphQL Schema File):
//---------------------------------------------------------------------
const typeDefsString = importSchema(
    'src/models/graphql/typedefs/general.typedefs.graphql'
);

//---------------------------------------------------------------------
// Custom Scalars
//---------------------------------------------------------------------
const resolverMap = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value)
        {
            return new Date(value); // value from the client
        },
        serialize(value)
        {
            return value.getTime(); // value sent to the client
        },
        parseLiteral(ast)
        {
            if (ast.kind === Kind.INT)
            {
                return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        },
    })
};

export const typeDefs = gql(typeDefsString);
