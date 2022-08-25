const express = require('express')
const cors = require('cors')


class Server {

    // En JS las propiedades se definen en el constructor
    constructor(){
        // Creo la app como una propiedad
        this.app = express(); 
        this.port = process.env.PORT; 
        this.userPath = '/api/users'; 

        // MIDDLEWARES: funciones que añaden más funcionalidades a mi web server        
        this.middlewares(); 

        // Disparar las rutas
        this.routes(); 
    }

    // usaremos muchos!
    middlewares(){
            //Forma en que decimos que usamos un middlewares (.use)

        //CORS:
        this.app.use( cors() ); 
        
        // Directorio público
        this.app.use(express.static('public'))
    }

    // Metodo para manejo/def de rutas s
    routes(){
        this.app.use('/api/usuarios', require('../routes/user-route'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Se ejecuta en: ', this.port );
        })
    }

}





module.exports = Server; 