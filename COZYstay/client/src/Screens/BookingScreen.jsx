/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import moment from "moment";
import Swal from "sweetalert2";

const BookingScreen = () => {
  //React Router v6 introduced the useParams hook to access route parameters. You no longer receive match as a prop.
  
  const { roomId,fromDate, toDate } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();

  const startDate = moment(fromDate, "DD-MM-YYYY");
  const endDate = moment(toDate, "DD-MM-YYYY");
  const totalDays = moment.duration(endDate.diff(startDate)).asDays() + 1;
  const [totalAmount, setTotalAmount] = useState();

  useEffect(() => {
    if(!localStorage.getItem("currentUser")){
      window.location.reload="/login"
    }
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/rooms/getroombyid", { roomId });
        const data = response.data;
        setTotalAmount(data.rentPerDay * totalDays);
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchRoom();
  }, []);

  async function bookRoom() {
    const bookingDetails = {
      room,
      userId: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromDate,
      toDate,
      totalAmount,
      totalDays,
    };

    

    try {
      const result = await axios.post('/api/bookings/bookroom', bookingDetails);
      console.log(result.data);
      // Swal.fire("SUCCESS"," Your Room Book Successfully", "sucess").then(
      //   () => (window.location.href = "/payment"));
        window.location.href = "/payment"
      // window.location.reload()
      
    
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container justify-content-center mt-4 bs">
      {loading ? (
        <Loader />
      ) : room ? (
        <div className="book-container">
          <div className="row room-container">
            <div className="col-md-6 ">
              <h1>{room.name}</h1>
              <img src={room.imgURLs[0]} alt="room" className="bigimg" />
            </div>
            <div className="col-md-6" style={{ textAlign: "right" }}>
              <h1>Booking Details</h1>
              {/* horizontal line */}
              <hr />
              <div>
                <b>
                  <p>
                    Name:{JSON.parse(localStorage.getItem("currentUser")).name}
                  </p>
                  <p>From Date:{fromDate}</p>
                  <p>To Date:{toDate}</p>
                  <p>Maxcount: {room.maxcount}</p>
                </b>
              </div>

              <div>
                <h1>Amount</h1>
                <hr />
                <b>
                  <p>Total Days:{totalDays}</p>
                  <p>Rent per Day:{room.rentPerDay}</p>
                  <p>Total Amount:{totalAmount}</p>
                </b>
              </div>

              <div>
                <button className="btn homebtn mb-2" onClick={bookRoom}>
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
};

export default BookingScreen;
