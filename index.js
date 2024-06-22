/* Importar express */
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config()
var cors = require('cors')

/* Crear servidor express */
const app = express();

/* Conectar a base de datos */
dbConnection();

/* CORS */
app.use(cors())

/* Directorio publico */
app.use(express.static('public'))

/* Letura y parseo de body */
app.use(express.json())

/* Rutas */
app.use('/api/auth', require('./routes/authRoute'))
app.use('/api/events', require('./routes/eventsRoute'))

/* Escuchar peticiones */
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})