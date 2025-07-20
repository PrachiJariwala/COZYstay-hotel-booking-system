import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

const Room = ({ room,fromDate,toDate }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const getImagePath = (imageName) => {
  //   try {
  //     return require(`../src/Images/${imageName}`);
  //   } catch (err) {
  //     console.error(`Image ${imageName} not found`);
  //     return null;
  //   }
  // };
  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={room.imgURLs[0]} alt="image1" className="smallimg" />
        {/* <img src={`http://localhost:5000/uploads/${room.imgURLs[0]}`} alt="Room " /> */}

        {/* <img src={getImagePath(room.imgURLs[0])} alt="image1" className="smallimg" /> */}
        {/* <img src={img1} alt="image1" className="smallimg" /> */}
      </div>
      <div className="col-md-7">
        <h1>{room.name}</h1>
        <b>
          <p>Max Count : {room.maxcount}</p>
          <p>Phone Number : {room.phoneNumber}</p>
          <p>Type : {room.type}</p>
        </b>
        <div style={{ float: "right" }}>
          {(fromDate&&toDate)&&(
            <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
            <button className="btn homebtn m-2">Book Now</button>
          </Link>
          )}
          
          <button className="btn homebtn mb-2" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header >
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Carousel */}
          <Carousel >
            {room.imgURLs.map((url,index) => {
              return (
                <Carousel.Item key={index}>
                  <img className="d-block w-100 bigimg" src={url} alt="First Slide" />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>
            {room.description}
          </p>
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
