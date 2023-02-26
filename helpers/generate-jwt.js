const jwt = require('jsonwebtoken'); 

const generateJWT  = (cedula ='') => {

    return new Promise ( (resolve, reject) => {
       
        const payload = {cedula}; 
        
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