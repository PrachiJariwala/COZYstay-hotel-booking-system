const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const moment = require("moment");
router.post("/bookroom", async (req, resp) => {
  // console.log("Request Body:", req.body);
  const {
    room: roomData,
    userId,
    fromDate,
    toDate,
    totalAmount,
    totalDays,
  } = req.body;

  try {
    const newBooking = new Booking({
      room: roomData.name,
      roomId: roomData._id,
      userId,
      fromDate,
      toDate,
      totalAmount,
      totalDays,
      transactionId: "1234",
    });
    const booking = await newBooking.save();
    // const roomtemp = await Room.findOne({ _id: roomData._id });
    // if (!roomtemp) {
    //   throw new Error('Room not found');
    // }
    // roomtemp.currentBooking.push({
    //   bookingId: booking._id,
    //   fromDate,
    //   toDate,
    //   userId,
    //   status: booking.status
    // });
    // await roomtemp.save();
    const roomtemp = await Room.findOne({ _id: roomData._id });
    // if (!Array.isArray(roomtemp.currentBooking)) {
    //   roomtemp.currentBookings = [];
    // }
    roomtemp.currentBookings.push({
      bookingId: booking._id,
      fromDate,
      toDate,
      userId,
      status: booking.status,
    });
    await roomtemp.save();
    // // const booktemp=await roomtemp.save();
    resp.send("Room Booked successfully");
  } catch (error) {
    return resp.status(400).json({ message: error || "Booking Failed" });
  }
});

router.post("/getbookingsbyuserid", async (req, resp) => {
  const userId = req.body.userId;
  try {
    const bookings = await Booking.find({ userId: userId });
    resp.send(bookings);
  } catch (error) {
    return resp.status(400).json({ message: error });
  }
});

router.post("/cancelbooking", async (req, resp) => {
  const {bookingId, roomId} = req.body;
  try {
    const bookingItem = await Booking.findOne({ _id: bookingId });
    bookingItem.status = "cancelled";
    await bookingItem.save();
    const room = await Room.findOne({ _id: roomId });
    //store current booking array in bookings variable
    const bookings = room.currentBookings;
    // remove the booking which is cancelled
    const tempBookings = bookings.filter(
      (booking) => booking.bookingId.toString() !== bookingId
    );
    //update tempBookings
    room.currentBookings = tempBookings;
    await room.save();

    resp.send("Booking cancelled Successfully");
  } catch (error) {
    return resp.status(400).json({ message: error });
  }
});

router.get("/getallbookings",async(req,resp)=>{

  try{
    const bookings=await Booking.find();
    resp.send(bookings);
  }catch(error){
    return resp.status(400).json({message:error})
  }
})
module.exports = router;
