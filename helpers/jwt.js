const jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => {

    /* Se regesa una nueva promesa */
    return new Promise((resolve, reject) => {

        /* se recibe el uid y nombre como payload */
        const payload = { uid, name };

        /* se crea la firma del token con palabra secreta */
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '48h'
        }, (error, token) => {
            /* en caso de error, se muestra */
            if (error) {
                console.log(error);
                reject('No se pudo generar el token')
            }
            /* en caso de todo bien, se devuelve el token */
            resolve(token);

        })
    })
}

module.exports = {
    generarJWT
}