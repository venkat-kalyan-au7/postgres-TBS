import express from "express"
import passport from "passport"
const router = express.Router()

import userControl from "../controller/userControl"
import bookingControl from "../controller/BookingControl"
import uploads from "../helpers/imageupload"
//user registration
router.post('/register',userControl.register)

//user login

router.post('/login',userControl.login)

//ticket booking
router.post('/book',uploads.uploads.single("file"),passport.authenticate('jwt',{
    session:false
}),(req,res)=>{
    return bookingControl.bookTicket(req,res)
})

//get ticket by pnr number
router.get('/pnr',passport.authenticate('jwt',{
    session:false
}),bookingControl.byPnr)

//update booking
router.put('/update',passport.authenticate('jwt',{
    session:false
}),bookingControl.updateTicket)

//cancel booking
router.delete('/cancel',passport.authenticate('jwt',{
    session:false
}),bookingControl.cancelTicket)

//to get all the trains
router.get('/allTrains',passport.authenticate('jwt',{
    session:false
}),userControl.allTrains)

//to get specific train data

router.get('/byTrainNum',passport.authenticate('jwt',{
    session:false
}),userControl.byTrainNumber)

module.exports = router