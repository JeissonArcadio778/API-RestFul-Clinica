
const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const UserModel = require("../models/user");


const getUsers = async (req = request, res = response) => {

      const { limit = 5, from = 0 } = req.query;

      const queryModify = { status: true };
  
      const [total_count_users, users] = await Promise.all([
          UserModel.countDocuments(queryModify),
          UserModel.find(queryModify).skip(Number(from)).limit(Number(limit)).populate('eps', 'status'),
      ]);

      res.json({
        message: "Get users from DB", 
        "Total count Users": total_count_users, 
        "Users" : users,
      });
};

const getUserById = async (req = request, res = response) => {
        
      const { id } = req.params;

      const user = await UserModel.findById(id).populate('eps', 'status');

      res.json({
        message: "Get user by Id",
        "User": user,
      });
};

const createUser = async (req, res = response) => {

      const { first_name, last_name, password, age, email, date_of_birth, marital_status, occupation, gender, nationality, address,status, role, cedula, eps} = req.body;
      
      // Use cedula like _id: 
      _id = cedula; 

      const user = await new UserModel({ _id, first_name, last_name, password, age, email, date_of_birth, marital_status, occupation, gender, nationality, address, status, role, cedula, eps,});

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
        
            const { id } = req.params;

            const { _id, password, cedula, ...forUpdate } = req.body;

            if (password) {

              const salt = bcrypt.genSaltSync();
              forUpdate.password = bcrypt.hashSync(password, salt);
            
            }
            
            console.log({id});

            const userUpdated = await UserModel.findByIdAndUpdate(id, forUpdate, { new: true });
           
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
  getUserById,
  updateUser,
  createUser,
  deleteUser,
};
