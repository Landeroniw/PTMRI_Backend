//funcion que permite tomar un usuario y regresar s¿certos campos

function getUserInfo(user){
    return{
        username: user.username, 
        email: user.email, 
        id: user.id, 
    }; 
}

module.exports = getUserInfo; 