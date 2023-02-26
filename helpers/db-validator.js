const EpsModel = require("../models/eps");
const Role = require("../models/role");
const UserModel = require('../models/user')

const isRoleValid = async (role = "") => {

      const isRoleInDB = await Role.findOne({ role }); 

      if (!isRoleInDB) {

          throw new Error(`The role ${role} there is not in the DB`);
        
        }

};


const isEmailValid = async (email) => {

      const isEmailInDB = await UserModel.findOne({ email });
  
      if (isEmailInDB) {
        
            throw new Error(`The email ${email} there is in the DB`);
      
      }
      
};


const isUserValid = async (id) => {

    const isUserInDB = await UserModel.findById(id);
    
    if (!isUserInDB) {

        throw new Error(`The user with ID ${id} there is not in the DB`);
    
     }

};


const isEpsValid = async (id)=>{

      const isEpsInDB = await EpsModel.findById(id); 
  
      if (!isEpsInDB) {
            
          throw new Error(`The EPS with ID: ${id} there is not in the DB`);
      
      }

}

module.exports = {
   isRoleValid,
   isEmailValid, 
   isUserValid, 
   isEpsValid
};
