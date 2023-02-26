
const {Schema, model} = require('mongoose'); 

const roleSchema = Schema({
    role: {
        type : String, 
        required : [true, 'The role is obligatory']
    }
}); 

module.exports = model('role', roleSchema)
