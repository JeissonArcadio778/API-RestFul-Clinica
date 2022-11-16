const {response, request} = require('express')

const isAdminRole = (req = request, res = response, next) => {

    if (!req.userAuth) {
        return res.status(500).json({   
            msg: 'Se quiere verificar el Role sin verificar el Token primero'
        }) 
    }

    const {role, name} = req.userAuth; 
    
    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} no es admin`
        })
    }

    next();
}

//ENviar n argumentos (rest: ... )
const isRole = (...roles) =>{

    //Debo devolver una función:

    return ( req = request, res = response, next )=>{
            
            // console.log(roles);

            // if (!req.userAuth) {
            //     return res.status(401).json({
            //         msg: 'Token no valido. El usuario no existe en la DB'
            //       })
            // }
            if (!roles.includes(req.userAuth.role)) {
                return res.status(401).json({
                    msg: 'The role is invalid. Is necessary one of them: ' + roles
                })
            }
            
            next(); 
    }

}

module.exports = {
    isAdminRole, 
    isRole
}