// Este es el schema para manejar esta nueva colección en la db que cree.

const {Schema, model} = require('mongoose'); 

const roleSchema = Schema({
    role: {
        type : String, 
        required : [true, 'El role es obligatorio']
    }
}); 

module.exports = model('role', roleSchema)
