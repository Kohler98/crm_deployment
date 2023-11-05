const express = require('express')
const { nuevoCliente, mostrarClientes, mostrarCliente, actualizarCliente ,eliminarCliente} = require('../controller/clienteController')
const { nuevoProducto,buscarProducto, mostrarProductos, mostrarProducto, actualizarProducto, eliminarProducto, subirArchivo } = require('../controller/productosControllers')
const { nuevoPedido, mostrarPedidos, mostrarPedido, actualizarPedido, eliminarPedido } = require('../controller/pedidosController')
const { registrarUsuario, autenticarUsuario } = require('../controller/usuariosController')
// midleware para proteger las rutas

const auth = require('../middleware/auth')

const router = express.Router()

module.exports = function(){
    //crear cliente
    router.post('/clientes',nuevoCliente)

    // obtener todos los clientes
    router.get('/clientes',
    auth,
    mostrarClientes)
    
    // muestrar un cliente en especifico
    router.get('/clientes/:id',
    auth,
    mostrarCliente)
    // actualizar un cliente en especifico
    router.put('/clientes/:id',
    auth,
    actualizarCliente)
    //borrar cliente
    router.delete('/clientes/:id',
    auth,
    eliminarCliente)

    //crear producto
    router.post('/productos',
    auth,
    subirArchivo,
    nuevoProducto)
    //busqueda de productos
    router.post('/productos/busqueda/:query',
    auth,
    buscarProducto)
    // obtener todos los productos
    router.get('/productos',
        auth,
    mostrarProductos)
    
    // muestrar un producto en especifico
    router.get('/productos/:id',
        auth,
    mostrarProducto)
    // actualizar un Producto en especifico
    router.put('/productos/:id',
    auth,

    subirArchivo,
    actualizarProducto)
    //borrar Producto
    router.delete('/productos/:id',
        auth,
    eliminarProducto)

    //crear pedido
    router.post('/pedidos/nuevo/:id',
    auth,
    nuevoPedido)

    // obtener todos los pedidos
    router.get('/pedidos',
        auth,
    mostrarPedidos)
    
    // muestrar un pedido en especifico
    router.get('/pedidos/:id',
        auth,
    mostrarPedido)
    // actualizar un pedido en especifico
    router.put('/pedidos/:id',
    auth,

    subirArchivo,
    actualizarPedido)
    //borrar pedido
    router.delete('/pedidos/:id',
        auth,
    eliminarPedido)

    // usuarios
    router.post('/crear-cuenta',
    auth,
    registrarUsuario
    )
    router.post('/iniciar-sesion',
    autenticarUsuario
    )

    return router
}