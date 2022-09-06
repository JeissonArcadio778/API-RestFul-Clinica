// Vamos a optimizar el código

const Role = require("../models/role");
const Usuario = require('../models/usuario')

// Verifiacr si el role existe en la db
const esRoleValido = async (role = "") => {
  //Debo hacer una validación de si existe o no ese tipo de role en la db:
  const roleExists = await Role.findOne({ role }); //Encuentre un rol como
  if (!roleExists) {
    throw new Error(`El role ${role} no existe`);
  }
};

//verificar si el correo existe// Encuentra uno así:
const validateEmail = async (email) => {
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`El email ${email} ya existe`);
  }
};

//Verificar si existe el usuario existe en la DB
const validateUserDBById = async (id) => {
  const userExists = await Usuario.findById(id);
  if (!userExists) {
    throw new Error(`The user with ID: ${id} not exists`);
  }
};
module.exports = {
  esRoleValido,
  validateEmail, 
  validateUserDBById
};
