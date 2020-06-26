import express from "express"
import morgan from "morgan"
import chalk from "chalk"
import bodyParser from "body-parser"
import passport from "passport"
import db from "./config/database"
import adminRoutes from "./routes/admin"
import userRoutes from "./routes/user"
import path from "path"
import multiparty from "connect-multiparty"
//import uploads from "../helpers/imageupload"
const app = express()
const PORT=process.env.PORT || 5000


app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use(passport.initialize())



//image upload

app.use(express.static(path.join(__dirname, "uploads")));

//admin routes

app.use('/api/admin',adminRoutes)

//user routes
app.use('/api/user',userRoutes)
// start app
app.listen(PORT, function() {
    console.log(chalk.bold.bgBlueBright(`sever is running on port ${PORT}`));
  });

