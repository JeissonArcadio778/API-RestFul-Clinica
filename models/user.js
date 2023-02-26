const { Schema, model, default: mongoose } = require("mongoose");

const UserSchema = Schema({

        _id : {
            type: String,
        },

        cedula: {
          type: Number,
          required: [true, "The cedula is required"]
        },
        
        first_name: {
          type: String,
          required: [true, "The first name is required"],
        },
        
        last_name : {
          type: String,
          required: [true, "The last name is required"],
        },
        
        age : {
          type: Number,
          required: [true, "The age is required"],
        },
        
        date_of_birth: {
          type: String,
          required: [true, "The date of birth is required"]
        },
        
        marital_status: {
          type: String,
          required: [true, "The marital status is required"],
          //TODO: options
        },
        
        occupation : {
          type: String,
          required: [true, "The occupation is required"],
        },
        
        gender : {
          type: String,
          required: [true, "The gender is required"],
        },
        
        nationality: {
          type: String,
          required: [true, "The nationality is required"],
        },
        
        address: {
          type: String,
          required: [true, "The address is required"],
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
          default: "PATIENT"
        },
        
        status: {
          type: Boolean,
          default: true,
        }, 
        
        eps: {
          type: Schema.Types.String,
          ref: "Eps",
      }
}, {
  
  versionKey: false
}

);


UserSchema.methods.toJSON = function() {

    const {__v, password, _id:cedula,...user} = this.toObject();
    
    return {
      cedula, ...user
    };
}

module.exports = model("User", UserSchema);
