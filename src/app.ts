//---------------------------------------------------------------
// Imports Section (Libraries)
//---------------------------------------------------------------
import * as express             from 'express';
import { ApolloServer }         from 'apollo-server-express';
//---------------------------------------------------------------
// Middlewares:
//---------------------------------------------------------------
import { MorganMiddleware }         from './middlewares/morgan.middleware';
import { ParsersMiddleware }        from './middlewares/parsers.middleware';
import { StaticContentMiddleware }  from './middlewares/static.middleware';
import { GraphQLMiddleware }        from './middlewares/graphql.middleware';
import { CORSMiddleware }           from './middlewares/cors.middleware';
//---------------------------------------------------------------
// Database:
//---------------------------------------------------------------
import { Database }                 from './config/database';
//---------------------------------------------------------------
// Routes:
//---------------------------------------------------------------
import { ValidationRoutes }         from './routes/validation.routes';


//---------------------------------------------------------------
// Class Section
//---------------------------------------------------------------
class Server
{

    //-----------------------------------------------------------
    // Constructor Method Section:
    //-----------------------------------------------------------
    constructor()
    {
        // Create Express App.
        this.app    = express();

        // Connect Database
        Database.getInstance().connect();

        // Configure App.
        this.configMiddlewares(this.app);
        this.configRouter(this.app);
    }

    //-----------------------------------------------------------
    // Bootstrap App Section:
    //-----------------------------------------------------------
    public static bootstrap(): Server
    {
        return new Server();
    }

    //-----------------------------------------------------------
    // Private Fields Section:
    //-----------------------------------------------------------
    private app          : express.Application;

    //-----------------------------------------------------------
    // Public Methods Section
    //-----------------------------------------------------------
    public getExpressServer() : express.Application
    {
        return this.app;
    }


    //-----------------------------------------------------------
    // Private Methods Section:
    //-----------------------------------------------------------
    private configMiddlewares(app)
    {
        MorganMiddleware.getInstance(app).configure();
        ParsersMiddleware.getInstance(app).configure();
        StaticContentMiddleware.getInstance(app).configure();
        CORSMiddleware.getInstance(app).configure();
        GraphQLMiddleware.getInstance().configure(app);
    }
    //-----------------------------------------------------------
    private configRouter(app: express.Application)
    {
        ValidationRoutes.getInstance(app).defineRoutes();
    }
}
//---------------------------------------------------------------
// Create Server Instance
//---------------------------------------------------------------
const server = Server.bootstrap();
//---------------------------------------------------------------
// Export Module Section:
//---------------------------------------------------------------
export const ExpressApp = server.getExpressServer();

