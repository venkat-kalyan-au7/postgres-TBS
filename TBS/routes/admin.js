import express from "express"
import passport from "passport"
const router = express.Router()

import adminControl from "../controller/adminControl"
import trainControl from "../controller/trainControl"
//register for admin
router.post('/register',adminControl.register)


//login for admin
router.post('/login',adminControl.login)


//add train

router.post('/addtrain',passport.authenticate('jwt', 
{ session: false }),
 trainControl.addTrain)

//to see all trains scheduled

router.get('/trains',passport.authenticate('jwt',{
  session:false
}),trainControl.allTrains)

//update train details

router.put('/update',passport.authenticate('jwt',{
  session:false
}),trainControl.updateTrainDetails)

//delete train schedule

router.delete('/cancel',passport.authenticate('jwt',{
  session:false
}),trainControl.cancelTrain)




module.exports = router