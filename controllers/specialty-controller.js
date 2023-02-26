const { request, responses, response } = require("express");
const { default: mongoose } = require("mongoose");
const SpecialtyModel = require("../models/specialty");


const getSpecialty = async (req = request, res = response) => {

        const { limit = 5, from = 0 } = req.query;

        const queryModify = { status: true };

        let [totalCountSpecialty] = await Promise.all([
          SpecialtyModel.countDocuments(queryModify)]
        );

        const specialty = await SpecialtyModel.find(queryModify).skip(Number(from)).limit(Number(limit))
       
        res.json({
          message: "Get Specialty & total count Specialty",
          "Total count specialty": totalCountSpecialty,
          "List Specialty": specialty,
        });
  };

const getSpecialtyById = async (req = request, res = response) => {
    
          const { id } = req.params;

          const specialty = await SpecialtyModel.findById(id);

          res.json({
            message: " Get Specialty by Id: ",
            "Specialty": specialty,
          });
};

const createSpecialty = async (req = request, res = response) => {
    
          const name = req.body.name.toUpperCase();

          // Usar como clave el nombre
          _id = name; 
          
          const isSpecialtyInDB = await SpecialtyModel.findOne({ name });

          if (isSpecialtyInDB) {

              return res.status(400).json({
                message: `The specialty ${isSpecialtyInDB.name}, there is in the DB`,
              });
          
            }
            
          

          try {
                const data = { name, _id};

                const specialty = new SpecialtyModel(data);
                
                await specialty.save();

                return res.status(201).json({
                  message: "New specialty created in the DB",
                  "New specialty": specialty,
                });
          
          } catch (err) {

                console.log(err);
            
                return res.status(400).json({
                  message: "Creating specialty failed",
                  err,
                });
          }
};

const updateSpecialty = async (req = request, res = response) => {

          const { id } = req.params;

          let {_id, name, ...forUpdatedBody} = req.body; 
          
          name = req.body.name.toUpperCase();
          forUpdated = {name, ...forUpdatedBody}
          
          try {
                const specialtyUpdated = await SpecialtyModel.findOneAndUpdate(id, forUpdated, {new : true}); 

                res.json({
                  message: "Specialty updated in the DB", 
                  "Specialty updated": specialtyUpdated
                })
          } catch (error) {

                console.log(error);
                res.json({
                  message: "Updating Specialty failed", 
                  error
                })
              
            }
};

const deleteSpecialty = async (req, res = response) => {

        const { id } = req.params;

        const specialtyDeleted = await SpecialtyModel.findByIdAndUpdate(id, { status: false });
        
        res.json({
          message: "Specialty Deleted in the DB",
          "Specialty Deleted": specialtyDeleted,
        });
};

module.exports = {
   createSpecialty,
   getSpecialty,
   getSpecialtyById,
   updateSpecialty,
   deleteSpecialty
};
