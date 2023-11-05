const express = require('express')
const routes = require('./routes/routes')
const { dbConnection } = require('./config/db')
const { default: mongoose } = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config({path:'variables.env'})
const app = express()
//cors permite que un cliente se conecta a otro servidor para el intercambio de recursos

const cors = require('cors')

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Conectado...'))
    .catch((err) => console.log(err))
// habilitar bodyparser

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// definir un dominio para recibir las peticion

const whitelist = [process.env.FRONTEND_URL]

const corsOptions = {
    origin:(origin,callback) =>{
        console.log(origin)
        // revisiar si la peticion viene de un servidor que esta en whitelist
        const existe  = whitelist.some(dominio => dominio == origin)

        if(existe){
            callback(null,true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}


// habilitar cors
app.use(cors(corsOptions))

// rutas de la app

app.use('/',routes())

//carpeta publica

app.use(express.static('uploads'))

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || '0.0.0.0'
app.listen(port,host,()=>{
    console.log("El servidor esta funcionando")
})