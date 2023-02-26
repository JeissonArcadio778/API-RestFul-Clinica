
const {Schema, model} = require('mongoose'); 

const SpecialtySchema = Schema({
    _id: String,
    name: {
        type : String, 
        required : [true, 'The specialty is required']
    },
    status: {
        type: Boolean,
        default: true
    }
}); 

SpecialtySchema.methods.toJSON = function() {
    const {__v, _id:name, ...specialty} = this.toObject();    
    return {
      name, ...specialty
    };
  }

module.exports = model('Specialty', SpecialtySchema)
