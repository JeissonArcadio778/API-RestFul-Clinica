const express = require('express')

class Server {

    // En JS las propiedades se definen en el constructor
    constructor(){
        // Creo la app como una propiedad
        this.app = express(); 
        this.port = process.env.PORT; 

        // MIDDLEWARES: funciones que añaden más funcionalidades a mi web server        
        this.middlewares(); 

        // Disparar las rutas
        this.routes(); 
    }

    // usaremos muchos!
    middlewares(){
            //Forma en que decimos que usamos un middlewares (.use)
        // Directorio público
        this.app.use(express.static('public'))
    }

    // Metodo para manejo/def de rutas 
    routes(){
       this.app.get('/api', function (req, res) {
            res.status(200).json({
                'ok' : true, 
                'msg' : 'get API'
            })
          })
          this.app.post('/api', function (req, res) {
            res.status(200).json({
                'ok' : true, 
                'msg' : 'post API'
            })
          })
          this.app.put('/api', function (req, res) {
            res.status(200).json({
                'ok' : true, 
                'msg' : 'put API'
            })
          })
          this.app.delete('/api', function (req, res) {
            res.status(200).json({
                'ok' : true, 
                'msg' : 'delete API'
            })
          })
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('El servidor corre en el puerto', this.port );
        })
    }

}





module.exports = Server; 