
const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const UserModel = require("../models/user");


const getUsers = async (req = request, res = response) => {

      // const { limit = 5, from = 0 } = req.query;

      // const queryModify = { status: true };
  
      // const [totalUsers, users] = await Promise.all([
      //     UserModel.countDocuments(queryModify),
      //     UserModel.find(queryModify).skip(Number(from)).limit(Number(limit)),
      // ]);

      //Paginacion
      const {limit = 5, from = 0} = req.query;
                
      //Only true 
      const queryModify = {status: true}; 

      const [total_count_users] = await Promise.all([UserModel.countDocuments(queryModify)]);

      const users = await UserModel.find(queryModify).skip(Number(from)).limit(Number(limit)).populate('medical_history'); 
      

      res.json({
        message: "Get users from DB", 
        "Total count Users": total_count_users, 
        "Users" : users,
      });
};


const createUser = async (req, res = response) => {

      const { name, password, email, role, cedula } = req.body;
      _id = cedula; 
      const user = new UserModel({ name, email, password, role, _id, cedula});

      const salt = bcrypt.genSaltSync();
      
      user.password = bcrypt.hashSync(password, salt);

      await user.save();

      res.json({
        message: "New User Created in the DB",
        "New User": user,
      });
};


const updateUser = async (req = request, res = response) => {

      try {
        
            const { cedula_param } = req.params;

            const { _id, password, cedula, ...forUpdate } = req.body;

            if (password) {

              const salt = bcrypt.genSaltSync();
              forUpdate.password = bcrypt.hashSync(password, salt);
            
            }

            const userUpdated = await UserModel.findOneAndUpdate({cedula_param}, forUpdate, { new: true });
           
            if (!userUpdated) {
              throw new Error('User Updating in the DB failed')
            }

            res.json({
              message: "User Updated in the DB",
              "User Updated": userUpdated,
            });
        
      } catch (error) {
        console.log(error);
            res.json({
              message: 'User Updating in the DB failed'
            });
      }
     

};


const deleteUser = async (req, res = response) => {
  
        const { cedula } = req.params;

        // const uid = req.uid;
        // Borrado físico: 
        // const userDeleted = await Usuario.findByIdAndDelete(id);

        const userDeleted = await UserModel.findByIdAndUpdate(cedula, { status: false });
        
        res.json({
          message: "User deleted from the DB",
          "User Deleted" : userDeleted,
          // uid
          // userAuthe,
        });

};

module.exports = {
  getUsers,
  updateUser,
  createUser,
  deleteUser,
};
