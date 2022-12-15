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

}
//Delete products
const deleteProducts = async (req = request, res = response) => {

}
//Get Products
const getProducts = async (req = request, res = response) => {
    try {
        //Paginacion
        const {limit = 5, from = 0} = req.query;
        //Only true 
        const queryModify = {status: true}
    
        const [totalProducts, products] = await Promise.all([Product.countDocuments(queryModify)], 
          Product.find(queryModify).skip(from).limit(limit).populate('user','name').populate('category','name')) ; 

        res.json({
            message: 'Get products: ', 
            totalProducts, 
            products
        })
        
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

module.exports = {
    createProducts,
    updateProducts,
    deleteProducts,
    getProducts
}