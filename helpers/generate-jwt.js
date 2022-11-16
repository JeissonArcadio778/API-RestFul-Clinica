const jwt = require('jsonwebtoken'); 

// Aqui vamos a generar el JWT

// Debo devolver una promesa, crearla, pues no tiene método asincrono. 
// uid: identificador único del usuario. user identify
const generateJWT  = (uid ='') => {

    return new Promise ( (resolve, reject) => {
        // debo generar el JWT. EL body se puede ver. NO grabar nada ahí. No afecta mucho que alguien sepa el JWT de alguien. Cuidar mucho el JWT. Solo sabría el uid del user. 
        // TODO: Revisar JWT, investigar bien. 

        // Se podría poner name, tel, sol... Pero no vamos a confiar, vamos a verificar primer el uid. 
        const payload = {uid}; 
        
        // esta función recibe 4 parámetros: el payload, el scretorprivatekay (alguien puede firmar por mi un token si yo no lo cuido), unas opciones: caducidad. Y un callback que puede retornar: err o el token.  

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, { expiresIn:'120h'}, 
        (err, token) => {
            if (err) {
                console.log(err);
                reject('could not generate Token')
            } else{
                resolve ( token )
            }
        }); 

    } )

}

module.exports = {
    generateJWT
}