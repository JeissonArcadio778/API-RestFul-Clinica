const { response, request } = require("express");
const {ObjectId} = require('mongoose').Types;

const User = require('../models/user')
const Eps = require('../models/eps');
const Medical_history = require("../models/medical-history");
const Role = require("../models/role");


const allowedCollection = ["users", "eps", "medical_histories", "roles"];

const searchUsers = async (param = '', res = response) =>{

      const isMongoId = ObjectId.isValid(param); 

      if (isMongoId) {

            const user = await User.findById(param);
            
            return res.status(200).json({
              success: true, 
              data: (user)? [user] : []
            })
      
      }

      //Expresión regular
      const regexParam = new RegExp(param, 'i');

      const user = await User.find({

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

      const eps = await Eps.find({

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

      const medical_history = await Medical_history.find({

        $or: [{name: regexParam}],
        $and: [{status: true}]

      }).populate('user', 'name').populate('eps','name');

      return res.json({
          message: true,
          data: (medical_history)? [medical_history] : []
      })
}


const searchRoles = async (param = '', res = response) => {

   
      const regexParam = new RegExp(param, 'i');

      const role = await Role.find({

        $or: [{role: regexParam}]

      });

      return res.json({
          message: true,
          data: (role)? [role] : []
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

          case "medical_histories":
              await searchMedicalHistories(param, res); 
              break;

          case 'roles': 
              await searchRoles(param, res)
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
