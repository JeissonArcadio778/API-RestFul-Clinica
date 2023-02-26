const {response, request} = require('express');
const Medical_history = require('../models/medical-history');


const createMedicalHistory = async (req = request, res = response) => {

        try {

                const {status, user, ...body} = req.body; 

                const creation_date = new Date(); 
                const modification_date = new Date(); 

                const medical_history_DB = await Medical_history.findOne({user}); 

                if (medical_history_DB) {
                    return res.status(400).json({
                        message: `The Medical History ${medical_history_DB._id}, exits in the DB`
                    }); 
                }

                const data_medical_history = {
                    doctor: req.userAuth._id,
                    creation_date, 
                    modification_date,
                    user,
                    ...body,
                } 

                const medical_history = new Medical_history(data_medical_history)
                await medical_history.save(); 

                console.log({medical_history });

                return res.status(200).json({
                    message: 'Medical History Created',
                    "New medical history": medical_history
        })

        } catch (err) {

                    console.log(err);
                    return res.status(400).json({
                        message : "Creating Medical History Failed"
                    })
        }

}

const updateMedicalHistory = async (req = request, res = response) => {

    try {

            const { id } = req.params;

            let {_id, uid, ...forUpdatedBody} = req.body; 

            const exist_medical_history = await Medical_history.findById(id); 

            if (!exist_medical_history) {
                return res.status(400).json({
                    message: "The Medical History there is not in the DB",
                });
            }
        
            const medical_history_updated = await Medical_history.findByIdAndUpdate(id, forUpdatedBody, {new:true});
        
            res.json({
                message: "Medical HistoryUpdated!", 
                "Medical History": medical_history_updated
            })
        
    } catch (error) {

            console.log(error);
            res.json({
            message: 'Error'
            })
    }



}

const deleteMedicalHistory = async (req = request, res = response) => {

        const {id} = req.params; 

        const medical_history_deleted = await Medical_history.findByIdAndUpdate(id, { status: false }).populate('user').populate('specialty', ['status']).populate('doctor', ['name', 'email', 'status']);
    
        res.json({
            msg: "Medical History Deleted: ",
            "Medical History Deleted:": medical_history_deleted,
        });

    }

const getMedicalHistories = async (req = request, res = response) => {
        
        try {

                //Paginacion
                const {limit = 5, from = 0} = req.query;
                
                //Only true 
                const queryModify = {status: true}; 

                const [total_medical_histories] = await Promise.all([Medical_history.countDocuments(queryModify)]);

                const medical_histories = await Medical_history.find(queryModify).skip(Number(from)).limit(Number(limit)).populate('user').populate('specialty', ['status']).populate('doctor', ['name', 'email', 'status']);
                
                res.json({
                    message: "Get Medical Histories", 
                    "Total count Medical Histories": total_medical_histories, 
                    "Medical Histories" : medical_histories,
                })
            
        } catch (error) {

                console.log(error);
                res.json(error)
        
            }
}

const getMedicalHistoryById = async (req = request, res = response) => {

        const { id } = req.params;
    
        console.log(id);
        const medical_history = await Medical_history.findById(id).populate('user').populate('specialty', ['status']).populate('doctor', ['name', 'email', 'status']);;
    
        res.json({
        message: "Medical History by Id",
        "Medical History": medical_history,
        });
};


module.exports = {
    createMedicalHistory,
    updateMedicalHistory,
    deleteMedicalHistory,
    getMedicalHistories,
    getMedicalHistoryById
}