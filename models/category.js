const {Schema, model, SchemaType, default: mongoose} = require('mongoose'); 

const categorySchema = Schema({
    name: {
        type: String, 
        required: [true, 'The name is required'], 
        unique: true
    },
    status: {
        type: Boolean, 
        default: true, 
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
}); 

categorySchema.methods.toJSON = function() {
    const {__v, _id:uid, status, ...category} = this.toObject();    
    return {
      uid, ...category
    };
  }

module.exports = model('Category', categorySchema)
