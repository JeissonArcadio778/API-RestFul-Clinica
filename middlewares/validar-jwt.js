const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  // I have to recive que token by headers.
  const token = req.header("xtoken");
  // console.log(token);

  // if not token sent
  if (!token) {
    return res.status(401).json({
      msg: "Not has token in response",
    });
  }

  try {
    // verify token with secret key in the header. Extrac uid user in the token
    const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    console.log({uid});
    // console.log(payload);

    // leer el user que corresponde al uid
    // req.user =

    // I get the uid for use it in the program.Basicamente saco el uid del token y lo envio a la req y como esta se usa en varias peticiones, se amlia su scope
    // req.uid = uid;

    const userAuth = await Usuario.findById(uid); 

    console.log({userAuth});

    if (!userAuth) {
      return res.status(401).json({
        msg: 'Token no valido. El usuario no existe en la DB'
      })
    } 

    if (!userAuth.state) {
      return res.status(401).json({
        msg: 'Token no valido. El usuario con estado: false'
      })
    }

    req.userAuth = userAuth; 

} catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token not validate",
    });
  }

  next();
  
};

module.exports = {
  validarJWT,
};
