const { request, responses, response } = require("express");
const { default: mongoose } = require("mongoose");
const EpsModel = require("../models/eps");


const getEps = async (req = request, res = response) => {

        const { limit = 5, from = 0 } = req.query;

        const queryModify = { status: true };

        let [totalCountEps] = await Promise.all([
          EpsModel.countDocuments(queryModify)]
        );

        listEps = await EpsModel.find(queryModify).skip(Number(from)).limit(Number(limit)).populate('user', 'name')
       
        res.json({
          message: "Get EPS & total count EPS",
          "Total count EPS": totalCountEps,
          "List eps": listEps,
        });
  };

const getEpsById = async (req = request, res = response) => {
    
          const { id } = req.params;

          const eps = await EpsModel.findById(id).populate('user', 'name');

          res.json({
            message: "Get EPS by Id: ",
            "Eps": eps,
          });
};

const createEps = async (req = request, res = response) => {
    
          const name = req.body.name.toUpperCase();

          // Usar como clave el nombre
          _id = name; 
          
          const isEpsInDB = await EpsModel.findOne({ name });

          if (isEpsInDB) {

              return res.status(400).json({
                message: `The EPS ${isEpsInDB.name}, there is in the DB`,
              });
          
            }
            
          

          try {
                const data = { name, _id};

                const eps = new EpsModel(data);
                
                await eps.save();

                return res.status(201).json({
                  message: "New EPS created in the DB",
                  "New EPS": eps,
                });
          
          } catch (err) {

                console.log(err);
            
                return res.status(400).json({
                  message: "Creating EPS failed",
                  err,
                });
          }
};

const updateEps = async (req = request, res = response) => {

          const { id } = req.params;

          let {_id, name, ...forUpdatedBody} = req.body; 
          
          name = req.body.name.toUpperCase();
          _id = name; 
          
          forUpdated = {name, _id, ...forUpdatedBody}
          
          try {
                const epsUpdated = await EpsModel.findOneAndUpdate(id, forUpdated, {new : true}); 

                res.json({
                  message: "EPS updated in the DB", 
                  "EPS updated": epsUpdated
                })
          } catch (error) {

                console.log(error);
                res.json({
                  message: "Updating EPS failed", 
                  error
                })
              
            }
};

const deleteEps = async (req, res = response) => {

        const { id } = req.params;

        const epsDeleted = await EpsModel.findByIdAndUpdate(id, { status: false });
        
        res.json({
          message: "Eps Deleted in the DB",
          "Eps Deleted": epsDeleted,
        });
};

module.exports = {
   createEps,
   getEps,
   getEpsById,
   updateEps,
   deleteEps
};
