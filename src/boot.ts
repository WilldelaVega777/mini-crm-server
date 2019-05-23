//---------------------------------------------------------------
// Imports Section
//---------------------------------------------------------------
import { ExpressApp }               from './app';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

//---------------------------------------------------------------
// Config and Launch Express Server
//---------------------------------------------------------------
const env = process.env;
ExpressApp.set('port', env.NODE_PORT || 4000);

ExpressApp.listen(ExpressApp.get('port'), () => {
    console.log('Aplicación de ejemplo escuchando en el puerto 4000!');
});

