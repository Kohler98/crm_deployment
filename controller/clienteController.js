const Clientes = require("../models/Clientes");

const nuevoCliente = async(req,res, next)=>{
    const clientes = new Clientes(req.body)
    
    try {
        await clientes.save()
        
        res.json({mensaje:'Se agrego un nuevo cliente'})
    } catch (error) {
        res.send(error)
        next()
    }
}
const mostrarClientes = async(req,res, next)=>{
    try {
        const clientes = await Clientes.find({})

        res.json(clientes)
    } catch (error) {
        res.send(error)
    }
}
const mostrarCliente = async(req,res, next)=>{
    try {
        const cliente = await Clientes.findById(req.params.id)
        res.json(cliente)
    } catch (error) {
        res.send(error)
    }
}

const actualizarCliente = async(req,res, next)=>{
    try {
        
        const cliente = await Clientes.findOneAndUpdate({_id:req.params.id},req.body,{
            new:true //devuelve el documento actualizado
        })
        res.json(cliente)
    } catch (error) {
        res.send(error)
        next()
    }
}
const eliminarCliente = async(req,res, next)=>{
    try {
        const cliente = await Clientes.findOneAndDelete({_id:req.params.id},req.body,{
            new:true //devuelve el documento actualizado
        })
        
        res.json({mensaje:'El cliente se ha eliminado'})
    } catch (error) {
        res.send(error)
        next()
        
    }
}
module.exports = {
    nuevoCliente,
    mostrarClientes,
    actualizarCliente,
    mostrarCliente,
    eliminarCliente
}