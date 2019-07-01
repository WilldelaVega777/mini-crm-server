"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const app_1 = require("./app");
dotenv.config({ path: 'variables.env' });
const env = process.env;
app_1.ExpressApp.set('port', 4000);
app_1.ExpressApp.listen(app_1.ExpressApp.get('port'), () => {
    console.log(';) Not so Angry CRM Server escuchando en el puerto 4000!');
});
//# sourceMappingURL=boot.js.map