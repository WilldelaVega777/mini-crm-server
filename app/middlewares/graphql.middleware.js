"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apollo_server_express_1 = require("apollo-server-express");
const general_typedefs_1 = require("../models/graphql/typedefs/general.typedefs");
const general_resolvers_1 = require("../models/graphql/resolvers/general.resolvers");
const jwt = require("jsonwebtoken");
var AppMiddlewares;
(function (AppMiddlewares) {
    class GraphQLMiddleware {
        constructor() { }
        static getInstance() {
            if (GraphQLMiddleware._instance == null) {
                GraphQLMiddleware._instance = new GraphQLMiddleware();
            }
            return GraphQLMiddleware._instance;
        }
        configure(app) {
            const apolloServer = new apollo_server_express_1.ApolloServer({
                typeDefs: general_typedefs_1.typeDefs,
                resolvers: general_resolvers_1.resolvers,
                context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
                    const token = req.headers['authorization'];
                    console.log(`ESTE ES EL TOKEN: ${token}`);
                    if (token !== 'null') {
                        try {
                            const currentUser = yield jwt.verify(token, process.env.SECRET);
                            req.currentUser = currentUser;
                            return { currentUser };
                        }
                        catch (error) {
                            console.error(error);
                        }
                    }
                })
            });
            apolloServer.applyMiddleware({ app });
        }
    }
    AppMiddlewares.GraphQLMiddleware = GraphQLMiddleware;
})(AppMiddlewares || (AppMiddlewares = {}));
module.exports = AppMiddlewares;
//# sourceMappingURL=graphql.middleware.js.map