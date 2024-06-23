const mongoose = require('mongoose');

const dbConnection = async () => {
    console.log(process.env.DB_CNN);
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('Conexion a Database completada');
    } catch (error) {
        console.log(error);
        throw new Error('Error inicializando Database')
    }
}

module.exports = {
    dbConnection
}