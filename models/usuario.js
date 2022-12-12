const { Schema, model, default: mongoose } = require("mongoose");

// Obj: para crear una tabla* pero aqui es un modelo
const UsuarioSchema = Schema({
  
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    // enum : ['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE'] //Esto lo traemos desde la db
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  }
});

//Puedo crear metodos personalizados: 

//Voy a sacar el password de la res. Debo ocultarla. No es seguro si la muestro
UsuarioSchema.methods.toJSON = function() {
  // Destructuración del objeto- Cambio nombre variable
  const {__v, password, _id:uid,...user} = this.toObject();

  // cambio nombre de variable  
  // user.uid = _id 
  // return user
  
  return {
    uid, ...user
  };
}

// Exportar la funcion del modelo. Ayuda a ponerle nombre a la misma colección. (Por defecto le pone 's' de más 'Usuarios') y luego pide el schema
module.exports = model("Usuario", UsuarioSchema);
