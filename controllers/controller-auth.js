const { response, json } = require('express');
const { validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const UsuarioModel = require('../models/model-usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;


    try {

        /* Validar email de usuario */
        let usuario = await UsuarioModel.findOne({ email })

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Error: El correo ya existe'
            })
        }


        usuario = new UsuarioModel(req.body);

        /* Encriptacion de contraseña con bscryptjs */
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt)


        await usuario.save();

        /* Generar JSON WEB TOKEN */
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, comunicate con el administrador'
        })
    }

}


const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario = await UsuarioModel.findOne({ email })

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Error: El correo no esta registrado'
            })
        }

        /* Validar contraseñas */
        const validPassword = bcrypt.compareSync( password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        /* Generar JSON WEB TOKEN */
        const token = await generarJWT(usuario.id, usuario.name)


        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, comunicate con el administrador'
        })
    }


}


const revalidarToken = async (req, res = response ) => {

    const { uid, name } = req;

    // Generar JWT
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        uid, 
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}