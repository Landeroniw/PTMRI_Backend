const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse"); //para visualizar las respuestas HTTP
const User = require("../schema/user");
const getUserInfo = require ("../lib/getUserInfo"); 


router.post("/", async(req, res)=>{
    const {username, password} = req.body; 

    //aqui verifica si los campos estan "llenos"
    if (!!! username || !!! password){
        return res.status(400).json(jsonResponse(400,{
            error: "Los campos son requeridos", 
        }));
    }

    const user = await User.findOne({username});
    //evaluamos si existe el usuario que ingresa el usuario 

    if(user){ //si existe
        // hace esto: 
        //enviamos información a la funcion comparePassword de /schema/user
        // me pide el password el usuario y el password que ya tengo almacenado en la base de datos
        const correctPassword = await user.comparePassword(password, user.password); 
        
        //evaluamos si el password es correcto
        if(correctPassword){
            const accessToken = user.createAccessToken(); 
            const refreshToken = await user.createRefreshToken();
            //con getUserInfo le mando la info que quiero que reciba (definido en /lib/getUserInfo)
            res.status(200).json(jsonResponse(200, {user : getUserInfo(user), accessToken, refreshToken}));

        }
        //si el password no es correcto
        else{
            res.status(400).json(jsonResponse(400, { error: "Usuario o contraseña incorrectos."}));
        }

    }
    //si el usuario que ingresado no existe, mandamos un mensaje de error
    else {
        res.status(400).json(jsonResponse(400, { error: "Usuario no encontrado"})); 

    }

}); 

module.exports = router; 


