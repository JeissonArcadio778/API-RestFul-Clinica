const {Schema, model, SchemaType, default: mongoose} = require('mongoose'); 

const EpsSchema = Schema({
    name: {
        type: String, 
        required: [true, 'The name of Eps is required'], 
        unique: true
    },
    status: {
        type: Boolean, 
        default: true, 
        required: true
    },
    medical_history: {
        type: Schema.Types.ObjectId,
        ref: 'Medical_history',
        required: true
    }
}); 

EpsSchema.methods.toJSON = function() {
    const {__v, _id:uid, status, ...eps} = this.toObject();    
    return {
      uid, ...eps
    };
  }

module.exports = model('Eps', EpsSchema)
