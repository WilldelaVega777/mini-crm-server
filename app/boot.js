"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env = process.env;
app_1.App.set('port', env.NODE_PORT || 3000);
app_1.App.listen(app_1.App.get('port'), () => {
    console.log('Aplicación de ejemplo escuchando en el puerto 3000!');
});
//# sourceMappingURL=boot.js.map