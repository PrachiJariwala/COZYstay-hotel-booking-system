/* eslint-disable no-unused-vars */
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import { useEffect } from "react";
// import Aos from "aos";
// import "aos/dist/aos.css";

const Room = ({ room, fromDate, toDate }) => {
 
 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //const history = useHistory();
  

    
  

  // const handleBookNow = () => {
  //   const user = JSON.parse(localStorage.getItem("currentUser"));
  //   if (!user) {
  //     // Show SweetAlert message
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Please login first",
  //       text: "You need to be logged in to book a room.",
  //       confirmButtonText: "OK",
  //     }).then(() => {
  //       // Redirect to login page after alert is closed
  //       history.push("/login"); // Correct way to navigate in React using history
  //     });
  //   }
  // };

  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={room.imgURLs[0]} alt="image1" className="smallimg"  />
      </div>
      <div className="col-md-7">
        <h1>{room.name}</h1>
        <b>
          <p>Max Count : {room.maxcount}</p>
          <p>Phone Number : {room.phoneNumber}</p>
          <p>Type : {room.type}</p>
        </b>
        <div style={{ float: "right" }}>
          {fromDate && toDate && (
            <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
              <button className="btn homebtn m-2" >Book Now</button>
            </Link>
          )}

          <button className="btn homebtn mb-2" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Carousel */}
          <Carousel>
            {room.imgURLs.map((url, index) => {
              return (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100 bigimg"
                    src={url}
                    alt="First Slide"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="homebtn" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Room;
