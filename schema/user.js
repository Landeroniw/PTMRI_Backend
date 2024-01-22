const Mongoose = require("mongoose");
const bcrypt = require('bcrypt'); 
const { generateAccessToken, generateRefreshToken } = require("../auth/generateTokens");
const Token = require("../schema/token"); 
const getUserInfo = require ("../lib/getUserInfo"); 


//definimos el esquema de User (atributos que se darán de alta en la base de datos)
const UserSchema = new Mongoose.Schema({
    id: {type: Object},
    email: {type: String, required: true}, 
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}, 
    
}); 

//encriptamos nuestro password
//.pre ---> método de MongoDB para ejecutar antes de una transacción
UserSchema.pre('save', function(next){
    if(this.isModified('password') || this.isNew){
        const document =this; 
        bcrypt.hash(document.password, 10, (err, hash) =>{
            if(err){
                next(err); 
            }else{
                document.password= hash; 
                next(); 
            }
        });

    }else{
        next(); 
    }
}); 

//creamos un método (función) en el schema para verificar si existe un nombre de usuario igual
// registrado en la base de datos
UserSchema.methods.usernameExists = async function (username){
    const result = await Mongoose.model("User").findOne({username}); 
    return !! result; 
}

//función para comparar cuando hagamos login (se usa en Inicio_sesion.js)
UserSchema.methods.comparePassword = async function(password, hash){
    const same = await bcrypt.compare(password, hash); 
    return same;
}

//Definimos los metodos para crear los accessToken y refreshToken

UserSchema.methods.createAccessToken = function(){
    return generateAccessToken(getUserInfo(this)); 
}; 

UserSchema.methods.createRefreshToken = async function(){
    const refreshToken = generateRefreshToken(getUserInfo(this)); 
    try {
        await new Token({ token: refreshToken}).save(); //creamos el objeto y guardar en la base de datos
        return refreshToken; 
    } catch (error) {
        console.log(error)
    }
    
}; 


//exportamos el esquema con nombre de "User"
module.exports= Mongoose.model("User", UserSchema);