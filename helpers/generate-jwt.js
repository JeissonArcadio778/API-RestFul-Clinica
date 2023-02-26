const jwt = require('jsonwebtoken'); 

const generateJWT  = (uid ='') => {

    return new Promise ( (resolve, reject) => {
       
        const payload = {uid}; 
        
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