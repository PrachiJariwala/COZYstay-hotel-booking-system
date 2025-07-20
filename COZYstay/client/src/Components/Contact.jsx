/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { BsFillSendCheckFill } from "react-icons/bs";
import Swal from "sweetalert2"; // Import SweetAlert
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
function ContactForm() {

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const messageRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Custom Validation
  const validateForm = () => {
    const { name, email, phone, message } = formData;

    // Name validation
    if (name.trim().length < 2) {
      Swal.fire("Oops...", "Please enter your name.", "error");
      nameRef.current.focus();
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire("Oops...", "Please enter a valid email address.", "error");
      emailRef.current.focus();
      return false;
    }

    // Phone number validation (must be exactly 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      Swal.fire(
        "Oops...",
        "Please enter a valid 10-digit contact number.",
        "error"
      );
      phoneRef.current.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      Swal.fire("Success!", "Thank You for reaching out to us!", "success");

      // Form submission logic
      console.log("Form submitted:", formData);

      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    }
  };

  return (
    <div className="container container-contact" >
      <div className="form" data-aos="fade-down"> 
        <div className="contact-info">
          <h3 className="title">Let's Get in Touch</h3>
          <p className="text">
            We are here to assist you with any inquiries or support you may
            need.
          </p>
          <div className="info">
            <div className="information">
              <i className="fas fa-map-marker-alt"></i>&nbsp;&nbsp;
              <p>123 Main Street, Anytown, USA</p>
            </div>
            <div className="information">
              <i className="fas fa-envelope"></i>&nbsp;&nbsp;
              <p>support@example.com</p>
            </div>
            <div className="information">
              <i className="fas fa-phone"></i>&nbsp;&nbsp;
              <p>(123) 456-7890</p>
            </div>
          </div>
          <div className="social-media">
            <p>Connect with us:</p>
            <div className="social-icons">
              <a href="abc">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="abc">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="abc">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="abc">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <span className="circle one"></span>
          <span className="circle two"></span>

          <form onSubmit={handleSubmit} autoComplete="off">
            <h3 className="title">Contact Us</h3>

            {/* Name Input */}
            <div className="input-container">
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                ref={nameRef} // Reference for focusing
              />
            </div>

            {/* Email Input */}
            <div className="input-container">
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                ref={emailRef} // Reference for focusing
              />
            </div>

            {/* Phone Input */}
            <div className="input-container">
              <input
                type="tel"
                name="phone"
                className="input"
                placeholder="Contact Number"
                maxLength={10}
                value={formData.phone}
                onChange={handleInputChange}
                ref={phoneRef} // Reference for focusing
              />
            </div>

            {/* Message Textarea */}
            <div className="input-container textarea">
              <textarea
                name="message"
                className="input"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                ref={messageRef} // Reference for focusing
              ></textarea>
            </div>

            <button
              type="submit"
              className="  btn-lg contact-btn"
              style={{ fontSize: "18px" }}
            >
              Send &nbsp;
              <BsFillSendCheckFill />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
