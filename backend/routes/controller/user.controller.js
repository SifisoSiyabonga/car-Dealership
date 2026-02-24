import mongoose from "mongoose";
import generateToken from "../../utils/generateToken.js";
import expressAsyncHandler from "express-async-handler";
import User from "../../model/user.model.js";
 // Correct typo here

export const authUser = expressAsyncHandler(async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Validate the password using the matchPassword method
    if (await user.matchPassword(password)) {
      // Send the response if credentials are correct
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          // You should not send the password in the response for security reasons
        },
      });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ success: false, message: "Error during login" });
  }
});

export const createUser = expressAsyncHandler(async (req, res) => {
    const { username, email, password, confirmPassword, idNumber, mobileNumber } = req.body;

   


    if (password !== confirmPassword) {
        console.error("Passwords do not match");
        return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    try {
    
        const existingUser = await User.findOne({ $or: [{ email }, { idNumber }] });
        if (existingUser) {
          return res.status(400).json({ success: false, message: "User with that email or ID already exists!" });
        }
        
        const newUser = new User({
            username,
            email,
            password,
            idNumber,
            mobileNumber,
        });

        if(newUser){
        generateToken(res,newUser._id);
        await newUser.save();
        console.log("User created successfully:", newUser);  
        res.status(201).json({ success: true, data: newUser });
        }
    } catch (error) {
        console.error("Error creating user:", error.message);

        
        if (error.code === 11000) {
            const duplicatedField = Object.keys(error.keyValue)[0];
            return res.status(400).json({ success: false, message: `${duplicatedField} already exists` });
        }

        res.status(500).json({ success: false, message: "Error creating user" });
    }
});
 

export const getUser = expressAsyncHandler(async (req, res) => {
  // const { username, password } = req.body;

  // try {
   
  //   const user = await User.findOne({ username });

  //   console.log(user);

  //   if (!user) {
    
  //     return res.status(404).json({ success: false, message: "User not found" });
  //   }

   
  //   if (user.password !== password) {
   
  //     return res.status(401).json({ success: false, message: "Invalid credentials" });
  //   }

    
  //   res.status(200).json({
  //     success: true,
  //     message: "Login successful",
  //     data: {
       
  //       username: user.username,
  //       password: user.password

  //     },
  //   });
  // } catch (error) {
  //   console.error("Error during login:", error.message);
  //   res.status(500).json({ success: false, message: "Error during login" });
  // }
});


// export {
//    authUser,
//  };