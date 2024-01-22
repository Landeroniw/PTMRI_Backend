const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user"); 


router.post("/", async (req, res)=>{
    const {email, username, password} = req.body;

    if (!!! username || !!! email || !!! password){
        return res.status(400).json(jsonResponse(400, {
            error: "Fields are required", 
        })
        
    ); 
    
    }
    //crear el usuario en la base de datos

    //const user = new User({email, password, username}); 
    try {
        const user = new User(); 
        const exists = await user.usernameExists(username); 

        if(exists){
            return res.status(400).json(
                jsonResponse(400, {
                    error: "Username ya existe.", 
                })
            ); 
        }

        const newUser = new User({email, password, username}); 
        newUser.save(); 
        res.status(200).json(jsonResponse(200, {message: "Usuario creado exitosamente. "}));

        //res.send("Registro"); 

    } catch (err) {
        res.status(500).json(jsonResponse(500, {
            error: "Error al crear usuario", 
        })); 
    }
   
});

module.exports = router;