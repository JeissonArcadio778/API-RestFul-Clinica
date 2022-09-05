// Aqui vamos a validar los errores entrantes como un middleware
const { validationResult} = require('express-validator'); 

const validarCampos = ( req, res, next ) => {

    const errors = validationResult(req); 

    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }

    //Next() lo que tengo que llamar si la función pasa. Si llega aqui, sigue con el siguiente middleware, sigue con el siguiente controlador.
    next(); 
}

module.exports = {
    validarCampos, 
}