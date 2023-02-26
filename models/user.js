const { Schema, model, default: mongoose } = require("mongoose");

const UserSchema = Schema({
  _id : {
      type: String,
      default: 0
  },
  cedula: {
    type: Number,
    required: [true, "The cedula is required"]
  },
  name: {
    type: String,
    required: [true, "The name is required"],
  },
  email: {
    type: String,
    required: [true, "The email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "The password is required"],
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  medical_history: {
    type: Schema.Types.ObjectId,
    ref: 'Medical_history',
    // required: true
},
});


UserSchema.methods.toJSON = function() {
  // Destructuración del objeto- Cambio nombre variable.

  const {__v, password, _id:cedula,...user} = this.toObject();
  
  return {
    cedula, ...user
  };
}

module.exports = model("User", UserSchema);
