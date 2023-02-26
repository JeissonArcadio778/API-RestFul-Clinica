const {Schema, model, SchemaType, default: mongoose} = require('mongoose'); 

const MedicalHistorySchema = Schema({
        user: {
            type: Schema.Types.String,
            ref: 'User',
            required: true
        },
        
        specialty: {
            type: Schema.Types.String,
            ref: 'Specialty',
            required: true
        },

        doctor: {
            type: Schema.Types.String,
            ref: 'User',
        },
        reason_for_hospitalization: {
            type: String,
        },
        
        current_disease: {
            type: String
        },
        
        history_current_disease: {
            type: String
        },

        family_history: {
            type: String
        },

        personal_history : [{
            "habits": String,
            "smoker": String,
            "drugs": String
        }],
        
        physiological_habits : [
            {
                "feeding": String,
                "sleep": String,
                "exercise" : String,
                "allergies": String
            }
        ],
        
        consultation_findings : {
            type: String,
        },
        
        medical_orders: {
            type: String,
        },

        status: {
            type: Boolean, 
            default: true
        }, 

        physical_test : [{

            "temperature": Number,
            "height" : Number,
            "weight" : Number,
            "general_impression" : String,
            "skin_system" : String,
            "head": String,
            "respiratory": String,
            "Neurological" : String
        }],
        laboratory_exams: [{
            "hto" : Number,
            "leucosites" : String
        }],
        syndromic_diagnosis : String
},{
    timestamps: true, 
    versionKey: false
}); 

MedicalHistorySchema.methods.toJSON = function() {
    const {__v, _id:uid, status, ...medical_history} = this.toObject();    
    return {
      uid, ...medical_history
    };
  }

module.exports = model('Medical_history', MedicalHistorySchema)
