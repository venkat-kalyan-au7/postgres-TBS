import Ticket from "../models/bookingModel"
import db from "../config/database"
const Op = db.Sequelize.Op
import nodemailer from "nodemailer"

import seat from "../helpers/seatNumber"
import pnr from "../helpers/pnr"

module.exports.bookTicket = function(req,res){
    let entry = {
        passengerName:req.body.passengerName,
        email:req.body.email,
        trainNumber:req.body.trainNumber,
        pnrNumber:pnr,
        dateOfJourney:req.body.dateOfJourney,
        seatNumber:seat
    }
    
    

    Ticket.create(entry)
    .then(data => {

        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'kalyan15meka@gmail.com',
                pass:'kalyansai392'   ///add your email and password here
            }
        });
        var mailOptions = {
            from:'kalyan15meka@gmail.com',
            to:'kalusai392@gmail.com',
            subject:'BOOKING CONFIRMATION',
            text:JSON.stringify(data)
        };
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error)
            }
            else{
                console.log("email sent"+info.response)
            }
        })
        

        res.json({data,message:'Booking Done'});
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while booking."
        });
      });
}


exports.byPnr = function(req,res){
    const pnrNumber = req.body.pnrNumber
    Ticket.findOne({
        where:{
            pnrNumber:pnrNumber
        }
    })
    .then((data)=>{
      res.send(data)
    })
    .catch((err)=>{
      res.send(err)
    })
  }

exports.updateTicket = function(req,res){
    const pnrNumber = req.body.pnrNumber
    Ticket.update(req.body,{
      where:{pnrNumber:pnrNumber}
    })
    .then(()=>{
      res.send("Ticket details success")
    })
    .catch(()=>{
      res.send("failed to update")
    })
  }


  exports.cancelTicket = function(req,res){
    const pnrNumber = req.body.pnrNumber
    Ticket.destroy({
      where:{pnrNumber:pnrNumber}
    })
    .then(()=>{
      res.json({
        message:"Ticket cancelled"
      })
    })
    .catch(()=>{
      res.send("failed to cancel ticket")
    })
  }