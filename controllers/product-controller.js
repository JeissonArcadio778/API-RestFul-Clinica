const {response, request} = require('express');
const Product = require('../models/product');


//Create products
const createProducts = async (req = request, res = response) => {

    try {

    const {status, user, ...body} = req.body; 

    const productDB = await Product.findOne({name: body.name}); 

    if (productDB) {
        return res.status(400).json({
            message: `The category ${productDB.name}, exits in the DB`
        }); 
    }

    const dataProduct = {
        user: req.userAuth._id, 
        ...body,
        name : body.name.toUpperCase()
    } 

    const product = new Product(dataProduct)
    await product.save(); 

    return res.status(200).json({
        message: 'Product Created!',
        date: product
    })

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            message : err
        })
    }

}

//Update products
const updateProducts = async (req = request, res = response) => {

    const {status, uid, _id, name, ...forUpdate} = req.body; 

    //Validacion de que exista ese product
    const {id} = req.params; 
    const existProduct = await Product.findById(id); 
    if (!existProduct) {
        return res.status(400).json({
            message: "The product not exits",
          });
    }

    const productUpdated = await Product.findByIdAndUpdate({id,})





}
//Delete products
const deleteProducts = async (req = request, res = response) => {
    const {id} = req.params; 

    const productDeleted = await Product.findByIdAndUpdate(id, { status: false });
  
    res.json({
        msg: "Product Deleted: ",
        productDeleted,
    });
}
//Get Products
const getProducts = async (req = request, res = response) => {
    try {
        //Paginacion
        const {limit = 5, from = 0} = req.query;
        //Only true 
        const queryModify = {status: true}; 

        const [totalProducts] = await Promise.all([
            Product.countDocuments(queryModify)]
          );

          const products = await Product.find(queryModify).skip(Number(from))
          .limit(Number(limit))
          .populate('user', 'name'); 
        
        res.json({
            message: 'Get products: ', 
            totalProducts, 
            "products" : products,
        })
        
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

const getProductById = async (req = request, res = response) => {
    const { id } = req.params;
  
    console.log(id);
    const product = await Product.findById(id).populate('user', 'name').populate('category','name');
  
    res.json({
      message: "Product by Id: ",
      product: product,
    });
  };


module.exports = {
    createProducts,
    updateProducts,
    deleteProducts,
    getProducts,
    getProductById
}