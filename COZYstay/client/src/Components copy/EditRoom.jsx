/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "./Loader";
import Error from "./Error";
import { useNavigate, useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const EditRoom = ({ show, handleClose, roomId }) => {
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [maxcount, setMaxcount] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [type, setType] = useState("");
  const [imgUrl1, setImgUrl1] = useState("");
  const [imgUrl2, setImgUrl2] = useState("");
  const [imgUrl3, setImgUrl3] = useState("");
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [preview3, setPreview3] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        setLoading(true);
        const result = await axios.get(`/api/rooms/${roomId}`);
        const room = result.data;

        setName(room.name);
        setRentPerDay(room.rentPerDay);
        setMaxcount(room.maxcount);
        setDescription(room.description);
        setPhoneNumber(room.phoneNumber);
        setType(room.type);
        // setImgUrl1(room.imgURLs[0]);
        // setImgUrl2(room.imgURLs[1]);
        // setImgUrl3(room.imgURLs[2]);
        setPreview1(room.imgURLs[0]);
        setPreview2(room.imgURLs[1]);
        setPreview3(room.imgURLs[2]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        // setError("Failed to fetch room data.");
        console.error("Failed to fetch room data:", error);
      }
    };

    fetchRoomData();
  }, [roomId]);

  async function handleUpdate(e) {
    e.preventDefault();
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
      !newRoom.imgURLs[0] ||
      !newRoom.imgURLs[1] ||
      !newRoom.imgURLs[2]
    ) {
      Swal.fire("Error", "Please fill all the fields", "error");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("rentPerDay", rentPerDay);
    formData.append("maxcount", maxcount);
    formData.append("description", description);
    formData.append("phoneNumber", phoneNumber);
    formData.append("type", type);
    // if (imgUrl1) formData.append("imgURLs", imgUrl1);
    // if (imgUrl2) formData.append("imgURLs", imgUrl2);
    // if (imgUrl3) formData.append("imgURLs", imgUrl3);
    formData.append("imgURLs", imgUrl1);
    formData.append("imgURLs", imgUrl2);
    formData.append("imgURLs", imgUrl3);
  

    try {
      setLoading(true);
      const response=await axios.put(`/api/rooms/updateroom/${roomId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedRoom = response.data.room;  // Get the updated room data

      // Update state with the new image URLs from the backend
      setImgUrl1(updatedRoom.imgURLs[0]);
      setImgUrl2(updatedRoom.imgURLs[1]);
      setImgUrl3(updatedRoom.imgURLs[2]);

      Swal.fire("Success", "Room updated successfully", "success").then(() => {
        navigate("/admin");
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  }

  const handleImageChange = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    setImage(file);
    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPG, JPEG, and PNG formats are allowed.");
      return;
    }

    // Preview image
    // const previewUrl = URL.createObjectURL(file);
    // setPreview(previewUrl);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {loading && <Loader />}
      {error && <Error message={error} />}

      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="custom-modal-width" // Custom class for width
      >
        <div className="container">
          <div className="edit-view">
            <div className="edit-container">
              <Modal.Body className="custom-modal-body">
                {/* Custom class for height */}
                <Form onSubmit={handleUpdate} encType="multipart/form-data">
                  <h1>Update Room </h1>
                  <div className="row">
                    <div className="col-md-6">
                      {/* Use Bootstrap classes for better alignment */}
                      <Form.Group controlId="name" className="mb-1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=" room name"
                          value={name}
                          className="form-input"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group controlId="rentPerDay" className="mb-1">
                        <Form.Label>Rent Per Day</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter rent per day"
                          value={rentPerDay}
                          className="form-input"
                          onChange={(e) => setRentPerDay(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group controlId="maxcount" className="mb-1">
                        <Form.Label>Max Count</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter max count"
                          className="form-input"
                          value={maxcount}
                          onChange={(e) => setMaxcount(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group controlId="description" className="mb-1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Enter description"
                          value={description}
                          className="form-input"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group controlId="phoneNumber" className="mb-1">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter phone number"
                          value={phoneNumber}
                          className="form-input"
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group controlId="type" className="mb-1">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter room type"
                          className="form-input"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                        />
                      </Form.Group>

                      {/* <Form.Group controlId="imgUrl1" className="mb-1">
                        <Form.Label>Image URL 1</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter image URL 1"
                          value={imgUrl1}
                          className="form-input"
                          onChange={(e) => setImgUrl1(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group controlId="imgUrl2" className="mb-1">
                        <Form.Label>Image URL 2</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter image URL 2"
                          value={imgUrl2}
                          className="form-input"
                          onChange={(e) => setImgUrl2(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group controlId="imgUrl3" className="mb-1">
                        <Form.Label>Image URL 3</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter image URL 3"
                          className="form-input"
                          value={imgUrl3}
                          onChange={(e) => setImgUrl3(e.target.value)}
                        />
                      </Form.Group> */}

                      {/* <Form.Group>
                        <Form.Label>Image URL 1</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter image URL 1"
                          value={imgUrl1}
                          className="form-input"
                          onChange={(e) => setImgUrl1(e.target.value)}
                        />
                         {preview2 && (
                          <img src={preview2} alt="Preview 2" width="100" />
                        )}
                      </Form.Group> */}

                      <Form.Group>
                        <input
                          type="file"
                          className="form-input"
                          multiple={false}
                          onChange={(e) =>
                            handleImageChange(e, setImgUrl1, setPreview1)
                          }
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
                        />
                        {preview3 && (
                          <img src={preview3} alt="Preview 3" width="100" />
                        )}
                      </Form.Group>

                      <div className="text-rigth">
                        <Button className="btn homebtn mt-2 ml-2" type="submit">
                          Update
                        </Button>
                        {/* <button
                        className="btn homebtn mt-2 ml-2"
                        onClick={updateRoom}
                      >
                        Update Room
                      </button> */}
                        <Button
                          className="btn homebtn mt-2 ml-2"
                          onClick={handleClose}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                </Form>
              </Modal.Body>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditRoom;
