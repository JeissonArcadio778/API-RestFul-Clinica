require('dotenv').config()
//Express basado en clases. Para ser más organizado.
const Server = require('./models/server')

const server = new Server(); 

server.listen(); 




