const {Schema, model, SchemaType, default: mongoose} = require('mongoose'); 

const ProductSchema = Schema({
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
    price: {
        type: Number, 
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }, 
    category: {
        type: Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true
    }, 
    description: {
        type: String,
        default: 'Not description'
    }, 
    available: {
        type: Boolean, 
        default: true
    }
}); 

ProductSchema.methods.toJSON = function() {
    const {__v, _id:uid, status, ...product} = this.toObject();    
    return {
      uid, ...product
    };
  }

module.exports = model('Product', ProductSchema)
