//para generar los tokens que permiten al usuario estar en sesión 
const Mongoose = require("mongoose");

const TokenSchema = new Mongoose.Schema({
    id: { type: Object},  //objetos de libreria de Mongoose no de ts
    token: { type: String, required: true },
});

module.exports = Mongoose.model("Token", TokenSchema); 