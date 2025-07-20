const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, resp) => {
  const newUser = new User(req.body);
  try {
    const user = await newUser.save();
    resp.send("User register Succeessfully");
  } catch (error) {
    return resp.status(400).json({ message: error });
  }
});

router.post("/login", async (req, resp) => {
  //variable destructure that are coming from frontend
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email, password: password });
    if (user) {
      const temp = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._id,
      };
      resp.send(temp);
    } else {
      return resp.status(400).json({ meesage: "Login failed....." });
    }
  } catch (error) {
    return resp.status(400).json({ error });
  }
});

router.get("/getallusers", async (req, resp) => {
  try {
    const users = await User.find();
    resp.send(users);
  } catch (error) {
    return resp.status(400).json({ message: error });
  }
});

// router.delete("/deleteuser/:id", async (req, resp) => {
//   // Fix the parameter name in the backend to match the route. Instead of roomId, it should be id.
//   const userId = req.params.id;
//   try {
//     const deleteUser = await User.findByIdAndDelete(userId);
//     if (!deleteUser) {
//       return resp.status(404).json({ error: "User not found" });
//     }

//     resp.send({ message: "User Deleted Successfully", user: deleteUser });

//   } catch (error) {
//     return resp.status(400).json({ message: error });
//   }
// });


router.delete("/deleteuser/:id", async (req, res) => {
  const userId = req.params.id; // Retrieve userId from request parameters

  try {
    // Find and delete the user by their ID
    const deleteUser = await User.findByIdAndDelete(userId);

    // If user is not found, return a 404 status with an error message
    if (!deleteUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // If the user is deleted, return a success message with the deleted user data
    return res.status(200).json({
      message: "User Deleted Successfully",
      user: deleteUser,
    });
  } catch (error) {
    // Catch any errors during the deletion process and return a 500 status with error details
    console.error("Error deleting user:", error); // Log the error for debugging
    return res.status(500).json({ error: "An error occurred while deleting the user" });
  }
});


module.exports = router;
