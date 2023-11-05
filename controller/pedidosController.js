const Pedidos = require("../models/Pedidos")

 
const nuevoPedido = async(req,res, next)=>{
 
    const pedidos = new Pedidos(req.body)
    
    try {
        await pedidos.save()
        
        res.json({mensaje:'Se agrego un nuevo Pedido'})
    } catch (error) {
        console.log(error)
        next()
    }
}
const mostrarPedidos = async(req,res, next)=>{
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path:'productos.producto',
            model:'Productos'
        })
 
        res.json(pedidos)
    } catch (error) {
        console.log(error)
    }
}
const mostrarPedido = async(req,res, next)=>{
    try {
        const pedido = await Pedidos.findById(req.params.id)
        res.json(pedido)
    } catch (error) {
        console.log(error)
    }
}

const actualizarPedido = async(req,res, next)=>{
    try {
        
        const pedido = await Pedidos.findOneAndUpdate({_id:req.params.id},req.body,{
            new:true //devuelve el documento actualizado
        })
        .populate('cliente')
        .populate({
            path:'pedido.producto',
            model:'Productos'
        })
        res.json(pedido)
    } catch (error) {
        console.log(error)
        next()
    }
}
const eliminarPedido = async(req,res, next)=>{
    try {
        await Pedidos.findOneAndDelete({_id:req.params.id},req.body,{
            new:true //devuelve el documento actualizado
        })
        
        res.json({mensaje:'El pedido se ha eliminado'})
    } catch (error) {
        console.log(error)
        next()
        
    }
}
module.exports = {
    nuevoPedido,
    mostrarPedidos,
    actualizarPedido,
    mostrarPedido,
    eliminarPedido
}