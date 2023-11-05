const { default: mongoose, Schema } = require("mongoose");

const usuariosSchema = new Schema({
    nombre:{
        type: String,
        require:'Agrega tu nombre'
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('Usuario',usuariosSchema)