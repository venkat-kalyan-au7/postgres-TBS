import train from "../models/trainModel"
import db from "../config/database"
import Sequelize from "sequelize"
import noOfSeats from "../helpers/seatCount"
import tickets from "../models/bookingModel"
const Op = db.Sequelize.Op

exports.addTrain = function(req,res){
    let entry ={
        trainName:req.body.trainName,
        origin:req.body.origin,
        destination:req.body.destination,
        arrival:req.body.arrival,
        departure:req.body.departure,
        travelDistance:req.body.travelDistance,
        trainNumber:req.body.trainNumber,
        class:req.body.class,
        price:(req.body.price)*(req.body.travelDistance),
        vacantSeats:noOfSeats

    }
    train.create(entry)
    .then(data => {
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while creating the Tutorial."
     });
   });
}


exports.allTrains=function(req,res){
  const trainNumber =req.query.trainNumber
  var condition =trainNumber

  train.findAll({where:condition})
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })


}


exports.updateTrainDetails = function(req,res){
  const id = req.body.id
  train.update(req.body,{
    where:{id:id}
  })
  .then(()=>{
    res.send("Train Details Updated ")
  })
  .catch(()=>{
    res.send("failed to Update")
  })
}

exports.cancelTrain = function(req,res){
  const trainNumber = req.body.trainNumber
  train.destroy({
    where:{trainNumber:trainNumber}
  })
  .then(()=>{
    res.json({
      message:"Train cancelled"
    })
  })
  .catch(()=>{
    res.send("failed")
  })
}



exports.cancelTicket= function(req,res){
  const trainNumber=req.body.trainNumber
  tickets.destroy({
    where:{trainNumber:trainNumber}
  })
  .then(()=>{
    res.json({
      message:"tickets cancelled"
    })
  })
  .catch(()=>{
    res.send("failed")
  })
}
