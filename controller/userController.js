const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');


const register = async(req, res) => {
   try {
      const { username, password, email, role } = req.body;

      const schema = Joi.object({
         username: Joi.string().required(),
         email: Joi.string().email().required(),
         password: Joi.string().required(),
         role: Joi.string().required()
      });

      const { error, value } = schema.validate(req.body);

      if(error){
         return res.status(400).json({ message : error.details[0].message});
      }
  
      const user = await User.findOne({ email });
     
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const data = await User.create({
         username: username,
         email: email,
         password: hashedPassword,
         role: role
      });


      const generateToken = await jwt.sign({ id : data?._id},process.env.JWT_SECRET,{ expiresIn:'7d' });

      res.status(201).json({ message: 'User registered successfully', user:data, access_token : generateToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  
}

const login = async (req, res) => {
   try {
      const { email, password } = req.body;

      const schema = Joi.object({
         email: Joi.string().email().required(),
         password: Joi.string().required()
      });

      const { error, value } = schema.validate(req.body);

      if(error){
         return res.status(400).json({ message : error.details[0].message});
      }
  
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ message: 'User does not exist' });

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(400).json("Wrong Password");

      const generateToken = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      return res.status(200).json({
         message: "User logged in successfully",
         user:user,
         access_token : generateToken
      });

   } catch (error) {
      console.log('error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
   }
}


module.exports = { register, login };