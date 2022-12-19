const { request, responses, response } = require("express");
const { default: mongoose } = require("mongoose");
const Category = require("../models/category");
const Usuario = require("../models/usuario");

// Get category - paginado - total - populate:

const getCategory = async (req = request, res = response) => {

  const { limit = 5, from = 0 } = req.query;

  const queryModify = { status: true };

  const [totalCategories, categories] = await Promise.all([
    Category.countDocuments(queryModify)],
    Category.find(queryModify)
      .skip(Number(from))
      .limit(Number(limit))
      .populate('user', 'name'),
  );

  res.json({
    message: "API get - total users",
    totalCategories,
    categories,
    // creator
  });
};

const getCategoryById = async (req = request, res = response) => {
  const { id } = req.params;

  console.log(id);
  const category = await Category.findById(id).populate('user', 'name');

  res.json({
    message: "Category by Id: ",
    category: category,
  });
};

const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  //Validate If exist category
  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      message: `The category ${categoryDB.name}, exits in the DB`,
    });
  }

  try {
    const data = {
      name,
      user: req.userAuth._id,
    };

    const category = new Category(data);
    await category.save();

    return res.status(201).json({
      message: "Created!",
      data: category,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Create user failed",
      err,
    });
  }
};

const updateCategory = async (req = request, res = response) => {

  const { id } = req.params;

  let {_id, name, ...forUpdatedBody} = req.body; 
  name = req.body.name.toUpperCase();
  forUpdated = {name, ...forUpdatedBody}

  // console.log({name});
  // console.log({forUpdated});

  try {
    const categoryUpdated = await Category.findOneAndUpdate(id, forUpdated, {new : true}); 

    res.json({
      message: 'Updated!', 
      category: categoryUpdated
    })

  } catch (error) {
    console.log(error);
    res.json({
      message: 'Error'
    })
  }

  
};

const deleteCategory = async (req, res = response) => {

  const { id } = req.params;

  const categoryDeleted = await Category.findByIdAndUpdate(id, { status: false });

  
  res.json({
    msg: "Category Deleted: ",
    categoryDeleted,
  });
};

module.exports = {
  createCategory,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
};
