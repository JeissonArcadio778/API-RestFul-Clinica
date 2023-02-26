const { response, request } = require("express");
const {ObjectId} = require('mongoose').Types;

const UserModel = require('../models/user')
const EpsModel = require('../models/eps');
const Medical_history_model = require("../models/medical-history");
const RoleModel = require("../models/role");
const SpecialtyModel = require("../models/specialty")


const allowedCollection = ["users", "eps", "medical_history", "roles", "specialty"];

const searchUsers = async (param = '', res = response) =>{

      if (param) {

            const user = await UserModel.findById(param);
            
            return res.status(200).json({
              success: true, 
              data: (user)? [user] : []
            })
      
      }

      //Expresión regular
      const regexParam = new RegExp(param, 'i');

      const user = await UserModel.find({

          $or: [{name: regexParam}, {mail: regexParam}],
          $and: [{status: true}]

      });

      return res.json({
          message: true,
          data: (user)? [user] : []
      })
}


const searchEps = async (param = '', res = response) => {

      //Expresión regular
      const regexParam = new RegExp(param, 'i');

      const eps = await EpsModel.find({

        $or: [{name: regexParam}],
        $and: [{status: true}]

      }).populate('user', 'name');

      return res.json({
          message: true,
          "Response": (eps)? [eps] : []
      })
}


const searchMedicalHistories = async (param = '', res = response) => {

 
      const regexParam = new RegExp(param, 'i');

      const medical_history = await Medical_history_model.find({

        $or: [{user: regexParam},{doctor: regexParam}, {specialty: regexParam}],
        $and: [{status: true}]

      }).populate('user').populate('specialty', ['status']).populate('doctor', ['name', 'email', 'status']);

      return res.json({
          message: true,
          data: (medical_history)? [medical_history] : []
      })
}


const searchRoles = async (param = '', res = response) => {

   
      const regexParam = new RegExp(param, 'i');

      const role = await RoleModel.find({

        $or: [{role: regexParam}]

      });

      return res.json({
          message: true,
          data: (role)? [role] : []
      })
}


const searchSpecialty = async (param = '', res = response) => {

   
  const regexParam = new RegExp(param, 'i');

  const specialty = await SpecialtyModel.find({

    $or: [{name: regexParam}]

  });

  return res.json({
      message: true,
      data: (specialty)? [specialty] : []
  })
}


const search = async (req = request, res = response) => {

      const { collection, param } = req.params;

      if (!allowedCollection.includes(collection)) {

            res.status(400).json({
              success: false,
              message:
                "The collection is not allowed. The allowed are: " + allowedCollection,
            });
      }

      switch (collection) {
    
          case "users":
              console.log('users');
              await searchUsers(param, res);
              break;

          case "eps":
              await searchEps(param, res); 
              break;

          case "medical_history":
              await searchMedicalHistories(param, res); 
              break;

          case "roles": 
              await searchRoles(param, res)
              break;

          case "specialty": 
              await searchSpecialty(param, res)
              break; 
          
          default:
              res.status(500).json({
                    success: false,
                    message: 'Internal Server Error'
              });
              break;
      }
};

module.exports = {
  search,
};
