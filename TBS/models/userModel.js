import db from "../config/database"
import bcrypt from "bcryptjs"

const { Sequelize, Model } = require("sequelize")

class Users extends Model {}

const userSchema = ({
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
    contact:{
        type:Sequelize.BIGINT,
        allowNull:false,
        unique:true
    }
})

Users.init(userSchema,{
    sequelize:db,
    modelName:'Users'
})


Users.beforeCreate(async user => {
    user.password = await user.generatePasswordHash()
    });
    Users.beforeSave(async user => {
    user.password = await user.generatePasswordHash()
    });
Users.prototype.generatePasswordHash = async function() {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds)
    };

// create some helper functions to work on the database
const createUser = async ({ name, password,email,contact }) => {
    return await Users.create({ name, password,email,contact });
  };
  
const getAllUsers = async () => {
    return await Users.findAll();
  };
  
const getUser = async obj => {
    return await Users.findOne({
      where: obj,
    });
  };


  module.exports = {Users,createUser, getAllUsers, getUser}