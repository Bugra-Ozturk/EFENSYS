import User from "../models/User.js";
import { checkValidationErrors } from "../utils/index.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// const allowedTokens = ["4KHa0X3K2kK/O(,0d8|T#y)!$", "Dm!F!a}hQccA-'qTCO@#8;+sC4SojHD.4T", "TOKEN3"]; 

const register = async (req, res) => {
  try {
    const {email} = req.body;

       //Check Token
      // if (!allowedTokens.includes(token)) {
      //   return res.status(400).json({ error: "Invalid registration token!" });
      // }

      //Check Email
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ error: "The email already exists!" });
    }
    
    const newUser = await User.create(req.body);
    console.log(req.body);
    newUser.password = undefined;

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  
    } catch (error) {
    if (error.name === 'ValidationError') {
      if (checkValidationErrors(error, res)) return;
    } else {
      console.log("Error at register", error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

const login = async (req,res) => {
  try {
    const {email,password} = req.body;

    //Check user if exist
    const user = await User.findOne({email});
    
    if (!user) {
      return res.status(404).json({error :'User not found'});
    }

    //Check if password correct
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({error :'Your password is not true'})
    }

    user.password = undefined;

    //Generate Token
     const token = jwt.sign({userId : user._id},process.env.JWT_SECRET_KEY, {expiresIn : process.env.JWT_EXPIRE_TIME,
     })
    
    return res.status(200).json({message : 'User logged in succesfully', user,token})
  
  } catch (error) {
    console.log('Error at login', error);
    return res.status(500).json({error :'Internal Server Error'});
    
  }
}

export { register, login };
