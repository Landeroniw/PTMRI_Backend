const Mongoose = require("mongoose");
const bcrypt = require('bcrypt');
 
const InformacionSchema = new Mongoose.Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    edad: {type: Number, required: true},
    sexo: {type: String, required: true},
    curp: {type: String, requird: true, unique: true},
    image: {type: String, required: true},
    resultado: {type: String, required: true},
    user: {type: String, required: true}
});
 
InformacionSchema.methods.CURPexists= async function(curp){
    const result = await Mongoose.model("Informacion").findOne({curp});
    return !! result;
}

InformacionSchema.methods.findUser= async function(user){
    const result = await Mongoose.model("Informacion").find({user});
    return !! result;
}
 
 
module.exports = Mongoose.model("Informacion", InformacionSchema);