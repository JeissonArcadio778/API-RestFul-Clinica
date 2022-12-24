const express = require('express'); 
// Cors: permite proteger el servidor de una manera superficial. Discrimina quien puede acceder al restAPI. Usualmente siempre se usa el cors.
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    // En JS las propiedades se definen en el constructor. Aqui haré el llamado del resto de propiedades
    constructor(){
        // Creo la app como una propiedad
        this.app = express(); 
        this.port = process.env.PORT;
        
        this.paths = {
            user: '/api/usuarios', 
            auth : '/api/auth', 
            categories : '/api/categories', 
            products: '/api/products',
            search: '/api/search',
            uploads: '/api/uploads'
        }

        // Conectar a base de datos
        this.conectarDB(); 

        // MIDDLEWARES: funciones que añaden más funcionalidades a mi web server. Aqui se llamaran y ejecutaran.     
        this.middlewares(); 

        // Disparar las rutas
        this.routes(); 
    }

    // Conectar db. Async debido a que haré una petición con grado de espera
    async conectarDB(){
        await dbConnection(); 
    }

     //Middleware: Es una función que se ejecuta antes de llamar un controlador o seguir con la ejecucuón de mis peticiones. Funciones que se realizar antes de hacer un llamado.
    middlewares(){ // usaremos muchos!

        //Forma en que decimos que usamos un middlewares (.use)

        //CORS:
        this.app.use( cors() ); 
        
        //Directorio público. Se usa para cargar los archivos que quiero mostrar por ejemplo en el LOCAL HOST
        this.app.use(express.static('public'))

        //Traer JSONs. Para reconocer la respuesta como un archivo JSON. 
        this.app.use( express.json() )
    }

    // Metodo para manejo/def de rutas 
    routes(){
        // Las rutas que queremos usar de acuerdo al path. Siempre ordenar afabéticamente
        this.app.use(this.paths.auth, require('../routes/auth.routes'))
        this.app.use(this.paths.user, require('../routes/user.routes'))
        this.app.use(this.paths.categories, require('../routes/categories.routes'))
        this.app.use(this.paths.products, require('../routes/products.routes'))
        this.app.use(this.paths.search, require('../routes/search.routes'))
        this.app.use(this.paths.uploads, require('../routes/upload.routes'))

    }

    // Hacia donde va a mirar o escuchar el RestServer
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Se ejecuta en: ', this.port );
        })
    }

}





module.exports = Server; 