import express from "express"
import morgan from "morgan"
import chalk from "chalk"
import bodyParser from "body-parser"
import passport from "passport"
import db from "./config/database"
import adminRoutes from "./routes/admin"
import userRoutes from "./routes/user"
const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(passport.initialize())

app.use('/api/admin',adminRoutes)

app.use('/api/user',userRoutes)
// start app
app.listen(3000, function() {
    console.log(chalk.bold.bgBlueBright('Express is running on port 3000'));
  });

