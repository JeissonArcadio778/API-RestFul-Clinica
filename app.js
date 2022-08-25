// RESTSERVER. Conecta servicios basados en HTTP para obtener en forma de retorno datos en JSON Y XML. También puede regresar información por JSON. Puede tambien manejar sitios dinámicos con la posibilidad de usar los métodos de servicios GET, PUT, DELETE...
//Dotenv: se crean varibales de forma global
require('dotenv').config()
//Express basado en clases. Para ser más organizado.
const Server = require('./models/server')

// Cors: permite proteger el servidor de una manera superficial. Discrimina quien puede acceder al restAPI. Usualmente siempre se usa el cors 


//Instancia para usar el Server. Debo usar los métodos que defino
const server = new Server(); 

server.listen(); 




