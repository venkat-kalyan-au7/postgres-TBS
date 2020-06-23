const db = require('../models/userModel')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwt_strategy = require('../config/jwt-strategy');

const strategy = jwt_strategy.strategy;
const jwtOptions = jwt_strategy.jwtOptions;

passport.use(strategy);

module.exports.register = function(req,res){
    const { name, password,email,contact } = req.body;
    db.createUser({ name, password ,email,contact}).then(user =>
      res.json({ user, msg: 'account created successfully' })
    );
}

module.exports.login = async function(req,res){
    const { email, password } = req.body;
    console.log(req.body);
    if (email && password) {
      let user = await db.getUser({ email: email });
    
      if (!user) {
        res.status(401).json({ message: 'No such user found' });
      }
      if (password === password) {
        
        // from now on we'll identify the user by the id and the id is the 
        // only personalized value that goes into our token
        let payload = { id: user.id };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ msg: 'User Login Sucessful', token: token });
      } else {
        res.status(401).json({ msg: 'Password is incorrect' });
      }
    }

}