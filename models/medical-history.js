const {Schema, model, SchemaType, default: mongoose} = require('mongoose'); 

const MedicalHistorySchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eps: {
        type: Schema.Types.ObjectId, 
        ref: 'Eps', 
        required: true
    },
    antecedentes : {
        type: String, 
        required: "No hay antecedentes en consulta"
    },
    medicamentos : {
        type: String, 
        default: "No registró en consulta"
    },   
    hallazgos_consulta : {
        type: String,
        default: 'No hay hallazgos en consulta'
    },
    ordenes: {
        type: String,
        default: 'No hay ordenes en consulta'
    },
    available: {
        type: Boolean, 
        default: true
    }
}); 

MedicalHistorySchema.methods.toJSON = function() {
    const {__v, _id:uid, status, ...medical_history} = this.toObject();    
    return {
      uid, ...medical_history
    };
  }

module.exports = model('Medical_history', MedicalHistorySchema)
