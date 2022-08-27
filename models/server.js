const express = require('express')
// Cors: permite proteger el servidor de una manera superficial. Discrimina quien puede acceder al restAPI. Usualmente siempre se usa el cors.

const cors = require('cors')


class Server {

    // En JS las propiedades se definen en el constructor
    constructor(){
        // Creo la app como una propiedad
        this.app = express(); 
        this.port = process.env.PORT; 
        this.userPath = '/api/usuarios'; 

        // MIDDLEWARES: funciones que añaden más funcionalidades a mi web server. Aqui se llamaran y ejecutaran       
        this.middlewares(); 

        // Disparar las rutas
        this.routes(); 
    }

                    
    middlewares(){ // usaremos muchos!

        //Forma en que decimos que usamos un middlewares (.use)

        //CORS
        this.app.use( cors() ); 
        
        //Directorio público. Se usa para cargar los archos que quiero mostrar por ejemplo en el LOCAL HOST
        this.app.use(express.static('public'))

        //Traer JSONs. Para reconocer la respuesta como un archivo JSON
        this.app.use( express.json() )
    }

    // Metodo para manejo/def de rutas s
    routes(){
        this.app.use(this.userPath, require('../routes/user-route'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Se ejecuta en: ', this.port );
        })
    }

}





module.exports = Server; 