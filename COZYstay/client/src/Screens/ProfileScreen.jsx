/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Tabs } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import Swal from "sweetalert2";
import { Divider, Flex, Tag } from "antd";
import Aos from "aos";
import "aos/dist/aos.css";
// const { TabPane } = Tabs;
const ProfileScreen = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <>
      <div className="ml-3 mt-3 container">
        <Tabs>
          <Tabs.TabPane className="tabs" tab="Profile" key="item-1">
            <div className="container">
              <div className="profile-view">
              <div className="profile-container" data-aos="fade-down">
                <h1 className="profile-title">My Profile</h1>
                <br />
                <div className="profile-body">
                <h1>Name : {user.name}</h1>
                <h1>Email : {user.email}</h1>
                <h1>IsAdmin : {user.isAdmin ? "YES" : "No"}</h1>
                </div>
              </div>
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane className="tabs" tab="Bookings" key="item-2">
            <MyBookings />  
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default ProfileScreen;

export const MyBookings = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/bookings/getbookingsbyuserid", {
          userId: user._id,
        });
        const data = response.data;
        console.log(data);
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    };

    fetchRoom();
  }, [user._id]);

  async function cancelBooking(bookingId, roomId) {
    try {
      setLoading(true);
      const result = await axios.post("/api/bookings/cancelbooking", {
        bookingId,
        roomId,
      });
      const data = result.data;
      console.log(data);
      setLoading(false);
      Swal.fire("Congrats, Your Booking has been Cancelled", "sucess").then(
        (result) => window.location.reload()
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  }

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-6 mb-4">
            {loading && <Loader />}

            {!loading && (!bookings || bookings.length === 0) && (
              <h1>No Bookings are Found.</h1>
            )}
            {bookings &&
              bookings.map((booking) => {
                return (
                  <div className="m-3 p-4 room-container" data-aos="fade-up">
                    <h1>{booking.room}</h1>
                    <p>BookingId : {booking._id}</p>
                    <p>
                      <b>CheckIn Date :</b>CheckIn Date : {booking.fromDate}
                    </p>
                    <p>
                      <b>CheckOut Date : </b>CheckOut Date : {booking.toDate}
                    </p>
                    <p>
                      <b>Amount :</b> {booking.totalAmount}
                    </p>
                    <p>
                      <b>Status : </b>
                      {booking.status === "cancelled" ? (
                        <Tag color="red">CANCELLED</Tag>
                      ) : (
                        <Tag color="green">CONFIRMED</Tag>
                      )}
                    </p>
                    {booking.status !== "cancelled" && (
                      <div className="text-right">
                        <button
                          className="btn homebtn"
                          onClick={() => {
                            cancelBooking(booking._id, booking.roomId);
                          }}
                        >
                          Cancel Booking
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
