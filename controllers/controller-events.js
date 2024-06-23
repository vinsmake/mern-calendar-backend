const { response } = require("express");
const Evento = require("../models/model-evento");

const getEventos = async(req, res = response) => {

    const eventos = await Evento.find()
    .populate('user', 'name email');



    res.json({
        ok: 'true',
        eventos
    })
}


const crearEvento = async (req, res = response) => {

    const evento = new Evento(req.body);

    try {

        evento.user = req.uid

        const eventoGuarado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuarado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const actualizarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;


    try {
        
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "El evento con este ID no existe"
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No se cuenta con privilegios de edicion'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true})

        res.json({
            ok: true,
            evento: eventoActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con administrador'
        })
    }

}


const eliminarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;


    try {
        
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "El evento con este ID no existe"
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No se cuenta con privilegios de eliminacion'
            })
        }


        await Evento.findByIdAndDelete(eventoId)

        res.json({
            ok: true
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con administrador'
        })
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}