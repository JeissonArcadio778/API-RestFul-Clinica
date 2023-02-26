const express = require('express'); 
// Cors: permite proteger el servidor de una manera superficial. Discrimina quien puede acceder al restAPI. Usualmente siempre se usa el cors.
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        // Creo la app como una propiedad
        this.app = express(); 
        this.port = process.env.PORT;
        
        this.paths = {
            user: '/api/users', 
            auth : '/api/auth', 
            eps : '/api/eps', 
            medical_history: '/api/medical_history',
            search: '/api/search',
        }

        this.conectarDB(); 

        // MIDDLEWARES: funciones que añaden más funcionalidades a mi web server.     
        this.middlewares(); 

        // Disparar las rutas
        this.routes(); 
    }

   
    async conectarDB(){
        await dbConnection(); 
    }

    middlewares(){ 

        //CORS:
        this.app.use( cors() ); 
                
        this.app.use(express.static('public'))

        this.app.use( express.json() )
    }


    routes(){
        
        this.app.use(this.paths.auth, require('../routes/auth.routes'))
        this.app.use(this.paths.user, require('../routes/user.routes'))
        this.app.use(this.paths.eps, require('../routes/eps.routes'))
        this.app.use(this.paths.medical_history, require('../routes/medical-history.routes'))
        this.app.use(this.paths.search, require('../routes/search.routes'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Se ejecuta en: ', this.port );
        })
    }

}





module.exports = Server; 