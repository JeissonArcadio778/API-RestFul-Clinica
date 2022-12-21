const { response, request } = require("express");
const {ObjectId} = require('mongoose').Types;

const Usuario = require('../models/usuario')
const Category = require('../models/category');
const Product = require("../models/product");
const Role = require("../models/role");


//Collections allowed

const allowedCollection = ["users", "categories", "products", "roles"];

//Methods for Search

const searchUsers = async (param = '', res = response) =>{
  //Validate Mongo Id
  const isMongoId = ObjectId.isValid(param); 

  if (isMongoId) {
    const user = await Usuario.findById(param);
    return res.status(200).json({
      success: true, 
      data: (user)? [user] : []
    })
  }

  //Expresión regular. Bastante útil. 
  const regexParam = new RegExp(param, 'i');

  const user = await Usuario.find({

    $or: [{name: regexParam}, {mail: regexParam}],
    $and: [{state: true}]

  });

    return res.json({
      message: true,
      data: (user)? [user] : []
    })
}

const searchCategories = async (param = '', res = response) => {

  //Expresión regular. Bastante útil. 
  const regexParam = new RegExp(param, 'i');

  const category = await Category.find({

    $or: [{name: regexParam}],
    $and: [{status: true}]

  }).populate('user', 'name');

    return res.json({
      message: true,
      data: (category)? [category] : []
    })
}

const searchProducts = async (param = '', res = response) => {

  //Expresión regular. Bastante útil. 
  const regexParam = new RegExp(param, 'i');

  const product = await Product.find({

    $or: [{name: regexParam}],
    $and: [{status: true}]

  }).populate('user', 'name').populate('category','name');

    return res.json({
      message: true,
      data: (product)? [product] : []
    })
}

const searchRoles = async (param = '', res = response) => {

  //Expresión regular. Bastante útil. 
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

  //Validación de las colecciones que puedo buscar
  
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
    case "categories":
      await searchCategories(param, res); 
      break;
    case "products":
      await searchProducts(param, res); 
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
