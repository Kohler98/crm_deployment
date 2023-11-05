const { default: mongoose, Schema } = require("mongoose");

const pedidosSchema = new Schema({
    cliente:{
        type: Schema.ObjectId,
        ref:'Clientes'
    },
    productos:[{
        producto:{
            type: Schema.ObjectId,
            ref:'Productos'
        },
        cantidad:Number
    }],
    total:{
        type: Number,
        trim:true
    }
})

module.exports = mongoose.model('Pedidos',pedidosSchema)