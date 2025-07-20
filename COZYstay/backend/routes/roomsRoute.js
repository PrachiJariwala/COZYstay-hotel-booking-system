const express = require("express");
const router = express.Router();

const Room = require("../models/room");
const multer = require("multer");
const path = require("path");
router.get("/getallrooms", async (req, resp) => {
  try {
    const rooms = await Room.find({});
    return resp.json(rooms);
  } catch (error) {
    return resp.status(400).json({ message: error });
  }
});

//get room by id
router.get("/:id", async (req, res) => {
  const roomId = req.params.id;

  try {
    // Fetch the room by ID from the database
    const room = await Room.findById(roomId);

    // If no room found, send a 404 response
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Send the room data as the response
    res.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/getroombyid", async (req, resp) => {
  const roomId = req.body.roomId;
  try {
    const room = await Room.findOne({ _id: roomId });
    return resp.json(room);
  } catch (error) {
    return resp.status(400).json({ message: error });
  }
});

//add room
// router.post("/addroom", async (req, resp) => {
//   try {
//     const newRoom = new Room(req.body);
//     await newRoom.save();

//     resp.send("New Room Added Succeessfully");
//   } catch (error) {
//     return resp.status(400).json({ message: error });
//   }
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../Images/")); // Directory to store images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Name file with timestamp to avoid duplication
  },
});

const upload = multer({ storage });
router.post("/addroom", upload.array("imgURLs", 3), async (req, res) => {
  try {
    const { name, rentPerDay, maxcount, description, phoneNumber, type } =
      req.body;

    // Map over uploaded files to get their paths
    const imgURLs = req.files.map((file) => `/Images/${file.filename}`); // Corrected line
    
    const newRoom = new Room({
      name,
      rentPerDay,
      maxcount,
      description,
      phoneNumber,
      type,
      imgURLs,
    });

    await newRoom.save();
    res.send("Room added successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/deleteroom/:id", async (req, resp) => {
  // Fix the parameter name in the backend to match the route. Instead of roomId, it should be id.
  const roomId = req.params.id;
  try {
    const deleteRoom = await Room.findByIdAndDelete(roomId);
    if (!deleteRoom) {
      return resp.status(404).json({ error: "Room not found" });
    }

    resp.send({ message: "Room Deleted Successfully", room: deleteRoom });
  } catch (error) {
    return resp.status(400).json({ message: error });
  }
});

const uploadFields = upload.fields([
  { name: 'imgURLs', maxCount: 3 },
]);

router.put("/updateroom/:id", uploadFields, async (req, res) => {
  const roomId = req.params.id;
  const updatedData = { ...req.body };

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    if (req.files && req.files.imgURLs) {
      updatedData.imgURLs = req.files.imgURLs.map((file) => `/Images/${file.filename}`);
    }

    const updatedRoom = await Room.findByIdAndUpdate(roomId, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ message: "Room updated successfully", room: updatedRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;


































// module.exports.addroom = async (req, resp) => {
//   console.log(req.body, req.file);
//   try {
//     const { name, rentPerDay, maxcount, description, phoneNumber, type } =
//       req.body;
//     const imgURLs = req.file.path;
//     const newRoom = new Room({
//       name,
//       rentPerDay,
//       maxcount,
//       description,
//       phoneNumber,
//       type,
//       imgURLs,
//     });

//     const sucess = await newRoom.save();

//     if (sucess) {
//       return resp.send("Room added successfully");
//     } else {
//       return resp.send({ code: 500, message: "service error" });
//     }
//   } catch (error) {
//     return resp.status(400).json({ message: error.message });
//   }
// };
