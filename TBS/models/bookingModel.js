import db from "../config/database"

const { Sequelize, Model } = require("sequelize");

class Bookings extends Model {}

const bookingSchema = ({
    passengerName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    trainNumber:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    pnrNumber:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    dateOfJourney:{
        type:Sequelize.STRING,
        allowNull:false
    },
    seatNumber:{
        type:Sequelize.INTEGER,
        allowNull:false
    }

})

Bookings.init(bookingSchema,{
    sequelize:db,
    modelName:'Bookings'
})

module.exports = Bookings