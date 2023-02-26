const { response, request } = require('express'); 
const bcrypt = require("bcryptjs");

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');


const login =  async (req = request, res = response) =>{

    const {email, password} = req.body; 

    try {

            const userValidations = await User.findOne({email}); 

            if (!userValidations) {

                return res.status(400).json({
                    msg: `Email / password is not correct - email - ${email}`
                })
            
            }

            if (!userValidations.state) {
                
                return res.status(400).json({
                    msg: "Email / password is not correct - state: false"
                })
            
            }

            const validPassword = await bcrypt.compare(password, userValidations.password);
            
            if (!validPassword){
                
                return res.status(400).json({
                    msg: "Email / password is not correct"
                })
            
            }

            const token = await generateJWT( userValidations.id )

            res.json({
                msg: 'login - Good!', 
                userValidations, 
                token
            })

    } catch (error) {
        
            console.log(error);
            return res.status(500).json({
                msg: 'Contact with admin',

            })
    }

    
}

module.exports ={
    login,
}