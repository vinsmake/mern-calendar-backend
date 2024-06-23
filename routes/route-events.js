/* 
Event Routes
host + /api/events
*/

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/controller-events");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/is-date");


const router = Router();

/* Obligas a que cualquier peticion debajo realice esta accion (validarJWT) */
router.use(validarJWT);

/* Obtener eventos */
router.get('/', getEventos)

/* Crear eventos */
router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento)

// Actualizar Evento
router.put(
    '/:id', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento 
);

/* Eliminar evento */
router.delete('/:id', eliminarEvento)

module.exports = router;