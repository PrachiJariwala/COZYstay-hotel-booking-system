const mongoose = require("mongoose");
const roomsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    maxcount: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    rentPerDay: {
      type: Number,
      required: true,
    },
    imgURLs: [String],
    currentBookings: [],
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//1st parameter:collection Name;2nd :schema Name
const roomModel=mongoose.model('rooms',roomsSchema)

module.exports=roomModel;