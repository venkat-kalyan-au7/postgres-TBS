import db from "../config/database"

const { Sequelize, Model } = require("sequelize");

class Trains extends Model {}

const trainSchema =({
    trainName:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    origin:{
        type:Sequelize.STRING,
        allowNull:false
    },
    destination:{
        type:Sequelize.STRING,
        allowNull:false
    },
    arrival:{
        type:Sequelize.STRING,
        allowNull:false
    },
    departure:{
        type:Sequelize.STRING,
        allowNull:false
    },
    travelDistance:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    trainNumber:{
        type:Sequelize.INTEGER,
        allowNull:false,
        unique:true
    },
    vacantSeats:{
        type:Sequelize.INTEGER,
        allowNull:false

    },
    class:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price:{
        type:Sequelize.INTEGER,
        allowNull:false
    }

})

Trains.init(trainSchema,{
    sequelize:db,
    modelName:'Trains'
})

module.exports=Trains