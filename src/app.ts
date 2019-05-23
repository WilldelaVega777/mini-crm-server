//---------------------------------------------------------------
// Imports Section (Libraries)
//---------------------------------------------------------------
import * as express             from 'express';
import { ApolloServer }         from 'apollo-server-express';
//---------------------------------------------------------------
// Middlewares:
//---------------------------------------------------------------
import { MorganMiddleware }         from './middlewares/morgan.middleware';
import { MulterMiddleware }         from './middlewares/multer.middleware';
import { ParsersMiddleware }        from './middlewares/parsers.middleware';
import { StaticContentMiddleware }  from './middlewares/static.middleware';
import { PassportMiddleware }       from './middlewares/passport.middleware';
import { GraphQLMiddleware }        from './middlewares/graphql.middleware';
//---------------------------------------------------------------
// Database:
//---------------------------------------------------------------
import { Database }             from './config/database';
//---------------------------------------------------------------
// Routes:
//---------------------------------------------------------------
import { SystemRoutes }         from './routes/system.routes';
import { AuthRoutes }           from './routes/auth.routes';


//---------------------------------------------------------------
// Class Section
//---------------------------------------------------------------
class Server
{
    //-----------------------------------------------------------
    // Private Fields Section:
    //-----------------------------------------------------------
    private router       : express.Router;
    private app          : express.Application;
    private upload       : any;


    //-----------------------------------------------------------
    // Bootstrap App Section:
    //-----------------------------------------------------------
    public static bootstrap(): Server
    {
        return new Server();
    }

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
        this.configureRouter(this.app);
    }


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
        MulterMiddleware.getInstance(app).configure();
        ParsersMiddleware.getInstance(app).configure();
        StaticContentMiddleware.getInstance(app).configure();
        PassportMiddleware.getInstance(app).configure();
        GraphQLMiddleware.getInstance().configure(app);
    }
    //-----------------------------------------------------------
    private configureRouter(app: express.Application)
    {
        app.get('/', function (req, res) {
            res.send('App Funciona');
        });

        SystemRoutes.getInstance(app).defineRoutes();
        AuthRoutes.getInstance(app).defineRoutes();
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

