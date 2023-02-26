const { Schema, model, default: mongoose } = require("mongoose");

const UserSchema = Schema({
  cedula: {
    type: Number,
    required: [true, "La cédula es obligatoria"]
  },
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
  role: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    default: true,
  }
});


UserSchema.methods.toJSON = function() {
  // Destructuración del objeto- Cambio nombre variable.

  const {__v, password, _id:uid,...user} = this.toObject();
  
  return {
    uid, ...user
  };
}

module.exports = model("User", UserSchema);
