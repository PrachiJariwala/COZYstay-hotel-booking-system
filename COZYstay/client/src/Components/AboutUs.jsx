import AboutImg1 from "../Images/img1.jpg";
import AboutImg2 from "../Images/img2.jpg";
import AboutImg3 from "../Images/img3.jpg";
import AboutImg4 from "../Images/img5.jpg";

const AboutUs = () => {
  return (
    <>
      <div className="about container">
        <div className="flex">
          <div className="left">
            <div className="aboutHeading">
              <h3>Welcome</h3>
              <h2>CozyStay</h2>
            </div>
            <p>
              Welcome to CozyStay, your trusted partner in seamless hotel
              bookings. With a vast selection of premium hotels and
              budget-friendly options across various locations, we strive to
              make your stay as comfortable as possible.Our mission at CozyStay
              is to provide travelers with easy access to the best hotels at
              competitive prices while ensuring a smooth and enjoyable booking
              experience. We are committed to making travel planning stress-free
              and convenient for all our users.
            </p>
            <p>
              Why choose CozyStay? <br></br>- Effortless booking with just a few clicks<br></br>
              - 24/7 customer support to assist you at any time <br></br> - Secure and
              easy payments <br></br> - Best price guarantees and exclusive deals
            </p>
            <div>
              <button className="btn homebtn ">Explore More</button>
            </div>
          </div>
          {/* <div className="right">
            <img
              src={AboutImg}
              alt="AboutImg"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div> */}
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-6 text-end">
                <img  className="img-fluid rounded w-75" src={AboutImg1} alt="image1"style={{marginTop:"40%",marginLeft:"30%"}}/>
              </div>
              <div className="col-6 text-end">
                <img  className="img-fluid rounded w-100" src={AboutImg2} alt="image2" style={{marginTop:"25%"}}/>
              </div>
              <div className="col-6 text-end">
                <img  className="img-fluid rounded w-75" src={AboutImg3} alt="image3" style={{marginLeft:"30%", padding:"4px",marginTop:"10%"}}/>
              </div>
              <div className="col-6 text-end">
                <img  className="img-fluid rounded w-100" src={AboutImg4} alt="image4" style={{marginTop:"10%"}}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
