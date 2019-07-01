//---------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------
import * as dotenv                  from 'dotenv';
import { ExpressApp }               from './app';

//---------------------------------------------------------------
// Config Global Modules
//---------------------------------------------------------------
const env = process.env;

if (env.NODE_ENV === 'development')
{
    dotenv.config({path: './src/config/variables.env'});
}
else if (env.NODE_ENV === 'production')
{
    dotenv.config({ path: './app/config/variables.env' });
}

//---------------------------------------------------------------
// Config and Launch Express Server
//---------------------------------------------------------------
ExpressApp.set('port', env.NODE_PORT || 4000);

ExpressApp.listen(ExpressApp.get('port'), () => {
    console.log(`;) Happy CRM Server escuchando en el puerto ${ExpressApp.get('port')}!`);
});

