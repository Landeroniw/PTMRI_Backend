
const { jsonResponse } = require("../lib/jsonResponse");
const getTokenFromHeader = require ("../auth/getTokenFromHeader"); 
const { verifyAccessToken } = require("./verifyToken");


function authenticate(req, res, next){
    const token = getTokenFromHeader(req.headers); 

    if (token) {
        //si si existe lo decodificamos
        const decoded =verifyAccessToken(token); 
        if (decoded) {
            req.user = {...decoded.user}; 
            next(); 
            
        } else {
            return res.status(401).json(jsonResponse(401, {message: "No token provided",}));
        }
        
    } else {
        return res.status(401).json(jsonResponse(401, {message: "No token provided",}));
    }
}

module.exports = authenticate; 