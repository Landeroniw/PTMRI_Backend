//se necesita ingresar la "misma información" y crear una nueva ruta
//centralizamos la forma de crear el token

const jwt = require("jsonwebtoken");

require("dotenv").config();
//va a pedir un payload (lo que queremos que se guarde)
function sign(payload, isAccessToken){
    return jwt.sign(
        payload, 
        isAccessToken
        ? process.env.ACCESS_TOKEN_SECRET
        : process.env.REFRESH_TOKEN_SECRET, 
        {
            algorithm: "HS256",
            expiresIn: 3600, //en segundos
        }
        );
}


//las mandamos a llamar al esquema de usuario

//me va a pedir un user
function generateAccessToken(user){
    return sign({ user }, true); 
}

function generateRefreshToken(user){
    return sign({ user }, false); 
}

module.exports = { generateAccessToken, generateRefreshToken};