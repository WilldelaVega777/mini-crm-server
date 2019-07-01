"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_import_1 = require("graphql-import");
const apollo_server_express_1 = require("apollo-server-express");
const graphql_1 = require("graphql");
const language_1 = require("graphql/language");
const typeDefsString = graphql_import_1.importSchema('src/models/graphql/typedefs/general.typedefs.graphql');
const resolverMap = {
    Date: new graphql_1.GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value);
        },
        serialize(value) {
            return value.getTime();
        },
        parseLiteral(ast) {
            if (ast.kind === language_1.Kind.INT) {
                return parseInt(ast.value, 10);
            }
            return null;
        },
    })
};
exports.typeDefs = apollo_server_express_1.gql(typeDefsString);
//# sourceMappingURL=general.typedefs.js.map