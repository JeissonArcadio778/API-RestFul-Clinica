const EpsModel = require("../models/eps");
const Role = require("../models/role");
const UserModel = require('../models/user')

const isRoleValid = async (role = "") => {

      const isRoleInDB = await Role.findOne({ role }); 

      if (!isRoleInDB) {

            if (role == null || role == '') {
                  throw new Error(`The role is null, please give an option`);
            }
          
            throw new Error(`The role ${role} there is not in the DB`);
        
        }

};


const isEmailValid = async (email) => {

      const isEmailInDB = await UserModel.findOne({ email });
  
      if (isEmailInDB) {
        
            throw new Error(`The email ${email} there is in the DB`);
      
      }
      
};

const isCedulaParmValid = async (cedula) => {

      const isCedulaInDB = await UserModel.findOne({cedula});

      if (!isCedulaInDB) {
        
            throw new Error(`The cedula ${cedula} there not is in the DB`);
      
      }
      
};


const isUserValid = async (cedula) => {

    const isUserInDB = await UserModel.findOne({cedula});
    
    if (isUserInDB) {

        throw new Error(`The user with cedula ${cedula} there is in the DB`);
    
     }

};

const isCedulaValid = async (cedula) => {

      const isUserInDB = await UserModel.findOne({cedula});
      
      if (isUserInDB) {
  
          throw new Error(`The user with cedula ${cedula} there is in the DB`);
      
       }
  
};


const isEpsValid = async ( eps ) => {

      const isEpsInDB = await EpsModel.findById(eps); 
  
      if (!isEpsInDB) {
                        
            throw new Error(`The EPS with ${eps} there is not in the DB. Please contact the clinic`);
                  
      }
}

const isSpecialtyValid = async (specialty)=>{

      const isSpecialtyInDB = await EpsModel.findById(specialty); 
  
      if (!isSpecialtyInDB) {
            
          throw new Error(`The specialty ${specialty} there is not in the DB. Please contact the clinic`);
      
      }

}

module.exports = {
   isRoleValid,
   isEmailValid, 
   isUserValid, 
   isEpsValid,
   isCedulaParmValid,
   isSpecialtyValid, 
   isCedulaValid
};
