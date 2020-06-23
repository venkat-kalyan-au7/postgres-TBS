import db from "../config/database"
import bcrypt from "bcryptjs"

const { Sequelize, Model } = require("sequelize")

class Admins extends Model {}

const adminSchema = ({
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        primaryKey:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    jobProfile:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    }
})

Admins.init(adminSchema,{
    sequelize:db,
    modelName:'Admins'
})


Admins.beforeCreate(async user => {
    user.password = await user.generatePasswordHash()
    });
    Admins.beforeSave(async user => {
    user.password = await user.generatePasswordHash()
    });
Admins.prototype.generatePasswordHash = async function() {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds)
    };
Admins.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
    };
// create some helper functions to work on the database
const createUser = async ({ name, password,email,jobProfile }) => {
    return await Admins.create({ name, password,email,jobProfile });
  };
  
  const getAllUsers = async () => {
    return await Admins.findAll();
  };
  
  const getUser = async obj => {
    return await Admins.findOne({
      where: obj,
    });
  };


  module.exports = {Admins,createUser, getAllUsers, getUser}