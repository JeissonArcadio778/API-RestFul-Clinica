// Este es un ORM: sirve para manipular comando de bases de datos facilmente
const mongoose = require('mongoose');

// Async porque hay un tipo de espera externa de por medio
const dbConnection =  async() => {
    try {
        await mongoose.connect( process.env.MONGODB_CNN ); 
        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos')
    }
}

module.exports = {
    dbConnection,
}