const {response, request} = require('express')

const isAdminRole = (req = request, res = response, next) => {

    if (!req.userAuth) {
        return res.status(500).json({   
            message: 'check the Role without checking the Token first'
        }) 
    }

    const {role, cedula} = req.userAuth; 
    
    if(role !== 'ADMIN' && role !== 'DOCTOR' && role !=='NURSE'){
        return res.status(401).json({
            msg: `The user with cedula ${cedula} is not admin/doctor/nurse`
        })
    }

    next();
}

const isRole = (...roles) =>{


    return ( req = request, res = response, next ) => {
            
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