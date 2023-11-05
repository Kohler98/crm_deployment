const Productos = require("../models/Productos");
const multer = require('multer')
const shortid = require('shortid')
const configuracionMulter = {
    limits : {filesize : 10000},
    storage:fileStorage = multer.diskStorage({
        destination:(req,file,next)=>{
            next(null,__dirname+'/../uploads/')
        },
        filename : (req,file,next) =>{
            const extension = file.mimetype.split('/')[1]
            next(null,`${shortid.generate()}.${extension}`)
        }
    }),
    fileFilter(req,file,next){
        if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg"){
            //formato valido
            next(null , true)
        }else{
            //formato invalido

            next(new Error('Formato no valido'), false)
        }
    }
}

const upload = multer(configuracionMulter).single('imagen')

//subir archivo

const subirArchivo = (req,res,next)=>{
    upload(req,res,function(error){
        if(error){
            res.json({mensaje:error})
        }
        return next()
    })
}
const nuevoProducto = async(req,res, next)=>{
    const productos = new Productos(req.body)
    
    
    try {
   
        if(req.file){
            productos.imagen = req.file.filename
        }
        await productos.save()
        
        res.json({mensaje:'Se agrego un nuevo producto'})
    } catch (error) {
        console.log(error)
        next()
    }
}
const mostrarProductos = async(req,res, next)=>{
    try {
        const productos = await Productos.find({})

        res.json(productos)
    } catch (error) {
        console.log(error)
    }
}
const mostrarProducto = async(req,res, next)=>{
    try {
        const producto = await Productos.findById(req.params.id)
        res.json(producto)
    } catch (error) {
        console.log(error)
    }
}

const actualizarProducto = async(req,res, next)=>{
    try {

        // contruirr nuevo producto
        let nuevoProducto = req.body
        if(req.file){
            nuevoProducto.imagen = req.file.filename
        }else{
            let productoAnterior = await Productos.findById(req.params.id)
            nuevoProducto.imagen = productoAnterior.imagen

        }
        let producto = await Productos.findOneAndUpdate({_id:req.params.id},nuevoProducto,{
            new:true //devuelve el documento actualizado
        })
        res.json(producto)
    } catch (error) {
        console.log(error)
        next()
    }
}
const eliminarProducto = async(req,res, next)=>{
    try {
        const producto = await Productos.findOneAndDelete({_id:req.params.id},req.body,{
            new:true //devuelve el documento actualizado
        })
        
        res.json({mensaje:'El producto se ha eliminado'})
    } catch (error) {
        console.log(error)
        next()
        
    }
}
const buscarProducto = async(req, res,next)=>{
    try {
        const {query} = req.params

        const producto = await Productos.find({nombre:new RegExp(query,'i')})
        res.json(producto)
    } catch (error) {
        console.log(error)
        next()
    }
}
module.exports = {
    nuevoProducto,
    mostrarProductos,
    actualizarProducto,
    mostrarProducto,
    eliminarProducto,
    subirArchivo,
    buscarProducto
}