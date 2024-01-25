const express = require('express');
const cors = require('cors');
const app = express(); 
const mongoose = require('mongoose');
const authenticate = require("./auth/authenticate"); 


//importamos las variables de entorno
require('dotenv').config(); 

app.use(cors());

// Enable CORS for all routes (for development only)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

const port = process.env.PORT; 


app.use(express.json());


// creamos la conexión con la base de datos lml 

async function main(){
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to MongoDB"); 

}

main().catch(console.error)

//declaramos rutas, haciendo referencia a los archivos

app.use('/api/Registro', require('./routes/Registro')); 
app.use('/api/login', require('./routes/Inicio_sesion')); 
app.use('/api/refreshToken', require('./routes/refreshToken')); 
app.use('/api/signout', require('./routes/signout')); 
app.use('/api/Prediccion', require('./routes/Prediccion.js'));

app.get("/", (req,res)=> {
    res.send("Hello World"); 
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}); 
