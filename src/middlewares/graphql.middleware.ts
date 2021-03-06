//--------------------------------------------------------------------------------
// Imports Section: (Node Libraries)
//--------------------------------------------------------------------------------
import * as express       from 'express';
//--------------------------------------------------------------------------------
// Imports Section: (MIddleware Libraries)
//--------------------------------------------------------------------------------
import { ApolloServer }   from 'apollo-server-express';
//--------------------------------------------------------------------------------
// Imports Section: (GraphQL Schemas)
//--------------------------------------------------------------------------------
import { GraphQLSchema }  from 'graphql';
//--------------------------------------------------------------------------------
// Imports Section: (GraphQL Resolvers)
//--------------------------------------------------------------------------------
import { typeDefs }       from '../models/graphql/typedefs/general.typedefs';
import { resolvers }      from '../models/graphql/resolvers/general.resolvers';
import * as dotenv        from 'dotenv';
import * as jwt           from 'jsonwebtoken';

//--------------------------------------------------------------------------------
// Module Section
//--------------------------------------------------------------------------------
module AppMiddlewares
{
    //----------------------------------------------------------------------------
    // Class Section
    //----------------------------------------------------------------------------
    export class GraphQLMiddleware
    {
        //------------------------------------------------------------------------
        // Static Methods Section
        //------------------------------------------------------------------------
        public static getInstance(): GraphQLMiddleware
        {
            if (GraphQLMiddleware._instance == null)
            {
                GraphQLMiddleware._instance = new GraphQLMiddleware();
            }
            return GraphQLMiddleware._instance;
        }

        //------------------------------------------------------------------------
        // Static Fields Section
        //------------------------------------------------------------------------
        private static _instance: GraphQLMiddleware;


        //------------------------------------------------------------------------
        // Constructor Method Section
        //------------------------------------------------------------------------
        constructor() {}


        //------------------------------------------------------------------------
        // Public Methods Section
        //------------------------------------------------------------------------
        public configure(app: express.Application)
        {
            const apolloServer = new ApolloServer(
                {
                    typeDefs,
                    resolvers,
                    context: async ({req}) => {
                        const token = req.headers['authorization'];

                        if (token !== 'null')
                        {
                            try
                            {
                                const currentUser =
                                    await jwt.verify(token, process.env.SECRET);

                                req.currentUser = currentUser;

                                // Debug:
                                // console.log({currentUser});

                                return { currentUser };
                            }
                            catch (error)
                            {
                                if (error.name === 'TokenExpiredError')
                                {
                                    return { currentUser: { user: 'null'}};
                                }
                            }
                        }
                    }
                }
            );

            apolloServer.applyMiddleware({ app });
        }
    }
}
//--------------------------------------------------------------------------------
// Exports Section
//--------------------------------------------------------------------------------
export = AppMiddlewares;
