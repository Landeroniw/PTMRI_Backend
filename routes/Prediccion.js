const router = require("express").Router();
//var mongoose = require('mongoose');
//var bodyParser = require('body-parser');


const { jsonResponse } = require("../lib/jsonResponse");

const Informacion = require("../schema/informacion");

router.post("/", async (req, res)=>{
    
    const {nombre, apellido, edad, sexo, curp , image, resultado, user} = req.body;

    if (!nombre || !apellido || !edad || !sexo || !curp || !image || !resultado || !user){
        return res.status(400).json(jsonResponse(400, {
            error: "Todos los campos son requeridos", 
        })  
    )};
   //console.log(image);git
    try {
        const datos = new Informacion();
        
        const curp_exists = await datos.CURPexists(curp);

        if(curp_exists){

            return res.status(400).json(jsonResponse(400, {error: "El CURP ya está registrado",})); 
        }

        const newDatos= new Informacion({nombre, apellido, edad, sexo, curp, image, resultado, user}); 
        newDatos.save(); 
        res.status(200).json(jsonResponse(200, {message: "Datos guardados exitosamente"}));

        //res.send("Registro"); 

    } catch (err) {
        console.log(err);
        res.status(500).json(jsonResponse(500, {
            error: "Error al guardar datos"
        })); 
    }
   
});

router.get("/", async (req, res)=>{
    const {userId} = req.query;
    //const datos = new Informacion();
    
    try {
        const data = await Informacion.find({ user: userId });
        res.json(data);
      } catch (error) {
        console.log("This is user:", userId);
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    

});
module.exports = router;