
// Los controladores no son más que funciones

const { response, request } = require('express'); 
const bcrypt = require("bcryptjs");

const Usuario = require('../models/usuario');
const { generateJWT } = require('../helpers/generate-jwt');


// Estos métodos son funciones realmente
const login =  async (req = request, res = response) =>{

    const {email, password} = req.body; 

    try {

        // verificar si el email, User Status, password existe
        const userValidations = await Usuario.findOne({email}); 

        // validar Email
        if (!userValidations) {
            return res.status(400).json({
                msg: `Email / password doesnt correct - email - ${email}`
            })
        }

        // Si el user esta activo - Como es una propiedad
        if (!userValidations.state) {
            return res.status(400).json({
                msg: 'Email / password doesnt correct - state: false'
            })
        }

        // verificar password
        const validPassword = await bcrypt.compare(password, userValidations.password);
        if (!validPassword){
            return res.status(400).json({
                msg: 'Email / password doesnt correct - password'
            })
        }

        // Generar JWT. Puedo usar el await debido al retorno de la promesa en la funcion
        const token = await generateJWT( userValidations.id )

        // Este token no lo vamos a guardar en la db, lo vamos a pedir cuando se haga alguna peticion que necesite auth para validar: 1.  si sí fue firmado por la persona real 2. tiene la información que yo espero. 

        // Solo puedo tener un res.json.
        res.json({
            msg: 'login - Good!', 
            userValidations, 
            token
        })

    } catch (error) {
        console.log(error);
        // 500: server Error!
        return res.status(500).json({
            msg: 'Talk with admin',

        })
    }

    
}

module.exports ={
    login,
}