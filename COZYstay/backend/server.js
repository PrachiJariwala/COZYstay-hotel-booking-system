const express = require("express");
const cors = require('cors')
const app = express();
// Enable CORS for all routes
app.use(cors());
const dbConfig = require("./db");
const roomsRoute = require("./routes/roomsRoute");
const usersRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingRoute");
// const multer=require('multer');
// const upload = multer({ dest: 'uploads/' })
//for static Images
app.use('/Images', express.static('Images'));
// app.use('/Images', express.static('path_to_image_folder'));

//this is use to recive parameter
app.use(express.json());
//access the roomsRoute
app.use("/api/rooms", roomsRoute);
//add the room
// app.post("/api/rooms", upload.array("imgURLs",3),roomsRoute.addroom);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingRoute);
// app.use('api/bookings/',bookingRoute)

app.post('/contact', (req, res) => {
  // Handle the contact form data here
  //res.send('Contact form submitted');
  res.redirect('/home');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on Port ${port} using Node.js`);
});
