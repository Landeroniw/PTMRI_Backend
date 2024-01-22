const router = require("express").Router();
const { json } = require("express");
const getTokenFromHeader = require ("../auth/getTokenFromHeader");
const Token = require("../schema/token"); 
const { verifyRefreshToken } = require("../auth/verifyToken");
const { generateAccessToken } = require("../auth/generateTokens");

//necesitamos obtener el token que generamos en el header de la autenticación 
//buscar le token en la base de datos 
//validar que el token sea válido 

router.post("/", async (req, res)=>{
    const refreshToken = getTokenFromHeader(req.headers); 
    if (refreshToken) {
        try {
            const found = await Token.findOne({token: refreshToken});
            if (!found){
                res.status(401).send(jsonResponse(401, { error: "Unauthorized"}));
            }
            //si sí encontramos el token
            //validamos el token 
            const payload = verifyRefreshToken(found.token); 
            if(payload){
                const accessToken = generateAccessToken(payload.user); 
                return res.status(200).json(jsonResponse(200, { accessToken}));
            } else {
                return res.status(401).json(jsonResponse(401, {error: "Unathorized"})); 
            }
        } catch (error) {
            return res.status(401).json(jsonResponse(401, {error: "Unathorized"}));
        }   
    } 
    else {
        res.status(401).send(jsonResponse(401, { error: "Unauthorized"})); 
    }
    res.send("refreshToken"); 
});

module.exports = router;