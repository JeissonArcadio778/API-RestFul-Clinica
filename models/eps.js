const {Schema, model, SchemaType, default: mongoose} = require('mongoose'); 

const EpsSchema = Schema({
    _id: {
        type: String,
        default: "Without EPS/SISBEN"
    },
    name: {
        type: String, 
        required: [true, 'The name of EPS is required'], 
        unique: true
    },
    status: {
        type: Boolean, 
        default: true
    },
    user: {
        type: Schema.Types.String,
        ref: 'User',
    }
}); 

EpsSchema.methods.toJSON = function() {
    const {__v, _id:name,...eps} = this.toObject();    
    return {
      name, ...eps
    };
  }

module.exports = model('Eps', EpsSchema)
