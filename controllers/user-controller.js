
const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const UserModel = require("../models/user");


const getUsers = async (req = request, res = response) => {

      const { limit = 5, from = 0 } = req.query;

      const queryModify = { state: true };
  
      const [totalUsers, users] = await Promise.all([
          UserModel.countDocuments(queryModify),
          UserModel.find(queryModify).skip(Number(from)).limit(Number(limit)),
      ]);

      res.json({
        msg: "Get Users",
        totalUsers,
        users,
      });
};


const createUser = async (req, res = response) => {

      const { name, password, email, role } = req.body;

      const user = new UserModel({ name, email, password, role });

      const salt = bcrypt.genSaltSync();
      
      user.password = bcrypt.hashSync(password, salt);

      await user.save();

      res.json({
        message: "New User Created in the DB",
        "New User": user,
      });
};


const updateUser = async (req = request, res = response) => {

      const { id } = req.params;

      const { _id, password, google, ...forUpdate } = req.body;

      if (password) {

        const salt = bcrypt.genSaltSync();
        forUpdate.password = bcrypt.hashSync(password, salt);
      
      }

      const userUpdated = await UserModel.findByIdAndUpdate(id, forUpdate, { new: true });

      res.json({
        message: "User Updated in the DB",
        "User Updated": userUpdated,
      });

};


const deleteUser = async (req, res = response) => {
  
        const { id } = req.params;

        // const uid = req.uid;
        // Borrado físico: 
        // const userDeleted = await Usuario.findByIdAndDelete(id);

        const userDeleted = await UserModel.findByIdAndUpdate(id, { state: false });
        
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
