const { response } = require("express")
const Usuario = require("../models/Usuarios");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const registrarUsuario = async(req, res=response) =>{
    const usuario = new Usuario(req.body)

    usuario.password = await bcrypt.hash(req.body.password,12)

    try {
        await usuario.save()
        res.json({mensaje:'Usuario creado correctamente'})
    } catch (error) {
 
        res.json({mensaje:'Hubo un error'})  
    }
}
const autenticarUsuario = async (req, res=response, next) =>{
    // buscar el usuario
    const {email, password} = req.body
    const usuario = await Usuario.findOne({email:email})
 
    if(!usuario){
        res.status(400).json({
            mensaje:'Ese usuario no existe'
        })
        next()
    }
 
    if(!bcrypt.compareSync(password,usuario.password)){
        // si el password es incorrecto
        res.status(400).json({
            mensaje:'Contraseña incorrecta'
        })
        next()
    }

    const token = jwt.sign({
        email:usuario.email,
        nombre:usuario.nombre,
        id:usuario._id
    }, 
        'LLAVESECRETA',{
            expiresIn:"1h"
    }
    )
    res.json({token})
}

module.exports = {
    registrarUsuario,
    autenticarUsuario
}