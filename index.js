const app = require('./src/app');
const { conn } = require('./src/models');
require("dotenv").config()

const port_number = process.env.PORT || 3001;
const host = '0.0.0.0';


conn.sync({
    force: true
    // force: false
}).then(() => {
    app.listen(port_number, host, () => {
        console.log(`Servidor corriendo en el puerto ${port_number}`)
    });
}).catch(console.error)

