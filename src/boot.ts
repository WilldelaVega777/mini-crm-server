//---------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------
import { ExpressApp }               from './app';

//---------------------------------------------------------------
// Config and Launch Express Server
//---------------------------------------------------------------
const env = process.env;
ExpressApp.set('port', env.NODE_PORT || 4000);

ExpressApp.listen(ExpressApp.get('port'), () => {
    console.log('Aplicación de ejemplo escuchando en el puerto 4000!');
});

