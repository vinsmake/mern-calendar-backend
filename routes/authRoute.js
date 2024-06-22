/* 
User Routes
host + /api/auth
*/

const { Router } = require("express");
const router = Router();

/* controllers */
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/authController');
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validarJWT");


router.post('/new',
    /* middlewares */
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener como minimo 6 caracteres').isLength({min: 6}),
        validarCampos

    ],
    crearUsuario);

router.post('/',
        [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario);

    

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;