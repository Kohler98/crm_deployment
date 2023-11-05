const { default: mongoose, Schema } = require("mongoose");

const productosSchema = new Schema({
    nombre:{
        type: String,
        trim:true
    },
    precio:{
        type:Number,
 
    },
    imagen:{
        type: String,

    }
})

module.exports = mongoose.model('Productos',productosSchema)