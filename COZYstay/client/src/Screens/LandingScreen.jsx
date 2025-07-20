/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";

// import video from "./Assets/Images/vid2.mp4";
import AboutUs from "../Components/AboutUs";
import Counter from "../Components/Counter";
import Footer from "../Components/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import landing1 from "./Assets/Images/landing1.jpg";
import landing2 from "./Assets/Images/landing2.jpg";
import landing3 from "./Assets/Images/landing3.jpg";

const LandingScreen = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,  // Add this if you want the slides to automatically scroll
    autoplaySpeed: 2000,  // Adjust the autoplay speed in milliseconds (3 seconds in this case)
  };

  const carouselData = [landing1, landing2, landing3];

  return (
    <>
      <section className="landPage mb-0">
        {/* <div className="overlay"></div>
        <video src={video} muted autoPlay loop type="video/mp4"></video> */}
        <div className="container-fluid p-0">
          <div className="carousel slide">
            <div className="carousel-container">
              <Slider {...settings}>
                {carouselData.map((image, index) => (
                  <div key={index} className="carousel-item">
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="w-100"
                     
                    />

                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center mb-5"  >
                      <div className="">
                        {/* <span className="smallText">
                          <a href="/home">Our Rooms</a>
                        </span> */}
                        <div className="landing" >
                          <h3>Spend Your Holiday</h3>
                          <p className="landContent">
                            Welcome to COZYstay, your ideal destination for
                            comfort and luxury. <br></br>we offer beautifully
                            designed rooms, exceptional service, and <br></br>{" "}
                            world-class amenities to make your stay
                            unforgettable.
                          </p>
                        </div>
                        <div>
                          <Link to="/home">
                            <button
                              className="btn btn-primary-py-md-3 px-md-5 me-3 animated slideInleft land-btn"
                              style={{ color: "rgb(255, 6, 114);" }}
                            >
                              Get Started
                            </button>
                          </Link>
                          &nbsp; &nbsp; &nbsp;
                          <Link to="/contact">
                            <button
                              className="btn btn-primary-py-md-3 px-md-5 me-3 animated slideInleft land-btn"
                              style={{ color: "rgb(255, 6, 114);" }}
                            >
                              Contact Us
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        {/* 
        <div className="homeContent container">
          <div className="textDiv">
            <span className="smallText">
              <a href="/home">Our Rooms</a>
            </span>
            <div className="landing">
              <h3>Spend Your Holiday</h3>
              <p className="landContent">
                Welcome to SheyRooms, your ideal destination for comfort and
                luxury. <br></br>we offer beautifully designed rooms,
                exceptional service, and <br></br> world-class amenities to make
                your stay unforgettable.
              </p>
            </div>
            <div className="flex">
              <Link to="/home">
                <button className="btn landingBtn" style={{ color: "black" }}>
                  Get Started
                </button>
              </Link>
              &nbsp; &nbsp; &nbsp;
              <Link to="/contact">
                <button className="btn btnContact" style={{ color: "black" }}>
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div> */}
      </section>
      {/* <div className="mt-0"> */}
        <AboutUs />
      {/* </div> */}
      <div>
        <Footer />
      </div>
      <div>
        <Counter />
      </div>
    </>
  );
};

export default LandingScreen;
