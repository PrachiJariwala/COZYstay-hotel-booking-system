/* eslint-disable no-unused-vars */
import { Tabs } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FaUsersCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EditRoom from "../Components/EditRoom";
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
const AdminScreen = () => {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <>
      <div className="mt-3 ml-3 mr-3 bs">
        <h2
          className="text-center text-admin"
          style={{ fontSize: "37px", fontFamily: "Century Gothic" }}
        >
          Admin Panel
        </h2>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Bookings" key="1">
            <Bookings />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Rooms" key="2">
            <Rooms />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Add Room" key="3">
            <AddRoom />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Users" key="4">
            <Users />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default AdminScreen;

//Booking List Components
export const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/bookings/getallbookings");
        const data = response.data;
        setBookings(data);
        // console.log(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          {/* <h1>Bookings</h1> */}
          <table className="table  table-striped table-hovered table-light table-bordered table-striped-columns table-brown">
            <thead className="bs">
              <tr>
                <th>Booking Id</th>
                <th>User Id</th>
                <th>Rooms</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading && <Loader />}
              {bookings.length &&
                bookings.map((booking) => {
                  return (
                    <tr>
                      <td>{booking._id}</td>
                      <td>{booking.userId}</td>
                      <td>{booking.room}</td>
                      <td>{booking.fromDate}</td>
                      <td>{booking.toDate}</td>
                      <td>{booking.status}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

//Room List Component
export const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const handleClose = () => setShow(false);

  const handleShow = (roomId) => {
    setSelectedRoomId(roomId);
    setShow(true);
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get("/api/rooms/getallrooms");
      const data = response.data;
      setRooms(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  async function deleteRoom(id) {
    const { value: confirmDelete } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirmDelete) {
      try {
        const response = await axios.delete(`/api/rooms/deleteroom/${id}`);
        const data = response.data;
        console.log("Room Deleted Successfully");
        if (data.message === "Room Deleted Successfully") {
          fetchRooms(); // Fetch the updated room list
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    } else {
      // User canceled the deletion
      console.log("Room deletion canceled.");
    }
  }

  // const updateRoom = (id) => {
  //   navigate(`/admin/rooms/${id}`);
  // };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-hovered table-light table-bordered table-brown">
            <thead className="bs">
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Rent per Day</th>
                <th>Max Count</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Loader />
              ) : rooms.length ? (
                rooms.map((room) => (
                  <tr key={room._id}>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentPerDay}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phoneNumber}</td>
                    <td>
                      {/* <Button
                        variant="success"
                        style={{ width: "50px", marginRight: "10px" }}
                        onClick={() => handleShow(room._id)}
                      >
                        
                        {/* Update */}
                      {/* </Button> */} 
                      <button
                        type="button"
                        className="btn btn-outline-success "
                        style={{ width: "50px" }}
                        onClick={() => handleShow(room._id)}
                      >
                      <FaUserEdit />
                        {/* edit */}
                      </button>&nbsp;&nbsp;&nbsp;
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        style={{ width: "50px" }}
                        onClick={() => deleteRoom(room._id)}
                      >
                        <MdDelete />
                        {/* Delete */}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <p>No rooms found</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {show && (
        <EditRoom
          show={show}
          handleClose={handleClose}
          roomId={selectedRoomId}
        />
      )}
    </>
  );
};

//UserList Compnonents
export const Users = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users/getallusers");
      const data = response.data;
      setUsers(data);
      // console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  async function deleteUser(id) {
    const { value: confirmDelete } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirmDelete) {
      try {
        const response = await axios.delete(`/api/users/deleteuser/${id}`);
        const data = response.data;
        console.log("Room Deleted Successfully");
        if (data.message === "User Deleted Successfully") {
          fetchUsers(); // Fetch the updated room list
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    } else {
      // User canceled the deletion
      console.log("Room deletion canceled.");
    }
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          {loading && <Loader />}
          {/* <h1>Users</h1> */}
          <table className="table  table-striped table-hovered table-light table-bordered table-brown">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Is Admin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => {
                  return (
                    <tr>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin ? "YES" : "No"} </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          style={{ width: "100px" }}
                          onClick={() => deleteUser(user._id)}
                        >
                          <MdDelete />Delete
                  
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export const AddRoom = () => {
  // const [room, setRoom] = useState();
  const [name, setName] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [maxcount, setMaxcount] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [type, setType] = useState("");
  const [imgUrl1, setImgUrl1] = useState(null);
  const [imgUrl2, setImgUrl2] = useState(null);
  const [imgUrl3, setImgUrl3] = useState(null);
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [preview3, setPreview3] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    setImage(file);
    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPG, JPEG, and PNG formats are allowed.");
      return;
    }

    // Validate file size (2MB limit)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File size must be less than 2MB.");
      return;
    }

    // Set image and preview URL
    setImage(file);
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  };

  const validatePhone = (phoneNumber) => {
    const re = /^[0-9]{10}$/; // Regular expression for 10 digit phone number
    return re.test(phoneNumber);
  };

  async function addRoom() {
    if (!validatePhone(phoneNumber)) {
      return Swal.fire(
        "Error !!",
        "Please enter a valid 10 digit Phone number!",
        "error"
      );
    }

    const newRoom = {
      name,
      rentPerDay,
      maxcount,
      description,
      phoneNumber,
      type,
      imgURLs: [imgUrl1, imgUrl2, imgUrl3],
    };

    if (
      !newRoom.name ||
      !newRoom.rentPerDay ||
      !newRoom.maxcount ||
      !newRoom.description ||
      !newRoom.phoneNumber ||
      !newRoom.type ||
      !newRoom.imgURLs ||
      newRoom.imgURLs.length < 3
    ) {
      alert("Please fill all the fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("rentPerDay", rentPerDay);
    formData.append("maxcount", maxcount);
    formData.append("description", description);
    formData.append("phoneNumber", phoneNumber);
    formData.append("type", type);
    formData.append("imgURLs", newRoom.imgURLs[0]);
    formData.append("imgURLs", newRoom.imgURLs[1]);
    formData.append("imgURLs", newRoom.imgURLs[2]);

    try {
      setLoading(true);
      const result = await axios.post("/api/rooms/addroom", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);

      Swal.fire("Congrats", "Your New Room Added Successfully", "success").then(
        () => (window.location.href = "/home")
      );
    } catch (error) {
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      setLoading(false);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  }

  return (
    <>
      <div className="container">
        <div className="add-view">
          <div className="add-container">
            <h1>Add Room</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addRoom();
              }}
              encType="multipart/form-data"
            >
              <div className="row">
                <div className="col-md-6">
                  {loading && <Loader />}
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Room Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Rent Per Day"
                    value={rentPerDay}
                    onChange={(e) => setRentPerDay(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Max Count"
                    value={maxcount}
                    onChange={(e) => setMaxcount(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  />
                  <input
                    type="file"
                    className="form-input"
                    multiple={false}
                    onChange={(e) =>
                      handleImageChange(e, setImgUrl1, setPreview1)
                    }
                    required
                  />
                  {preview1 && (
                    <img src={preview1} alt="Preview 1" width="100" />
                  )}

                  <input
                    type="file"
                    className="form-input"
                    multiple={false}
                    onChange={(e) =>
                      handleImageChange(e, setImgUrl2, setPreview2)
                    }
                    required
                  />
                  {preview2 && (
                    <img src={preview2} alt="Preview 2" width="100" />
                  )}

                  <input
                    type="file"
                    className="form-input"
                    multiple={false}
                    onChange={(e) =>
                      handleImageChange(e, setImgUrl3, setPreview3)
                    }
                    required
                  />
                  {preview3 && (
                    <img src={preview3} alt="Preview 3" width="100" />
                  )}

                  <div>
                    <button className="btn homebtn mt-2 ml-3" type="submit">
                      Add Room
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
