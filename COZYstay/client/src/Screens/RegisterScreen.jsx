import { useState,useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import registerIllustration from "./Assets/Images/Register_illustration.gif";
import Aos from "aos";
import "aos/dist/aos.css";

const RegisterScreen = () => {

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  };

  async function register() {
    if (!name.trim()) {
      return Swal.fire("Error !!", "Name cannot be empty!", "error");
    }

    if (!validateEmail(email)) {
      return Swal.fire("Error !!", "Please enter a valid email address!", "error");
    }

    if (!validatePassword(password)) {
      return Swal.fire(
        "Error !!",
        "Password must be at least 8 characters long and contain at least 1 number!",
        "error"
      );
    }

    if (password !== cpassword) {
      return Swal.fire("Error !!", "Passwords do not match!", "error");
    }

    const user = {
      name,
      email,
      password,
      cpassword,
    };

    try {
      // eslint-disable-next-line no-unused-vars
      const result = await axios.post("/api/users/register", user);
      Swal.fire("Registration Successful", "You have registered successfully!", "success").then(() => {
        setName("");
        setEmail("");
        setPassword("");
        setCpassword("");
        window.location.href = "/login";
      });
    } catch (error) {
      Swal.fire("Error", "Registration failed. Please try again later.", "error");
    }
  }

  return (
    <div className=" register-container bg-white d-flex align-items-center justify-content-center min-vh-100" data-aos="fade-down">
      <div className="row shadow-lg p-4 rounded" style={{ maxWidth: "1200px" }}>
        {/* Left Side with Image */}
        <div className="col-md-5 d-none d-md-flex align-items-center justify-content-center">
          <img src={registerIllustration} alt="Register Illustration" className="img-fluid" />
        </div>

        {/* Right Side with Registration Form */}
        <div className="col-md-7">
          <div className="p-4">
            
            <form className="mb-2">
            <h3 className="text-center mb-3" style={{ color: "#D1913C" }}>Welcome Aboard!</h3>
              <div className="form-group mb-2 mt-2 ">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ fontSize: "1rem", padding: "10px" }}
                />
              </div>
              <div className="form-group mb-2 mt-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ fontSize: "1rem", padding: "10px" }}
                />
              </div>
              <div className="form-group mb-2 mt-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ fontSize: "1rem", padding: "10px" }}
                />
              </div>
              <div className="form-group mb-2 mt-2">
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="cpassword"
                  placeholder="Confirm your password"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  style={{ fontSize: "1rem", padding: "10px" }}
                />
              </div>
              <button
                type="button"
                className="btn btn-block mt-3 mb-0 w-100"
                style={{ backgroundColor: "#D1913C", color: "#fff", fontSize: "1rem", padding: "10px" }}
                onClick={register}
              >
                Register
              </button>
              <p className="text-center mt-2">
              Already have an account?{" "}
              <Link to="/login"  >
                Login Now
              </Link>
            </p>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;









/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
// import { useState } from "react";
// import axios from "axios";
// import Loader from "../Components/Loader";
// import Error from "../Components/Error";
// import Success from "../Components/Success";
// import Swal from "sweetalert2";
// import { Link } from "react-router-dom";
// import logo from "./Assets/Images/img1.jpg";
// import registerImg from "./Assets/Images/register.jpg";
// const RegisterScreen = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [cpassword, setCpassword] = useState("");
//   const [success, setSucceess] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState();

//   async function register() {
//     if (password === cpassword) {
//       const user = {
//         name,
//         email,
//         password,
//         cpassword,
//       };
//       // console.log(user);
//       try {
//         setLoading(true);
//         const result = await axios.post("/api/users/register", user).data;
//         setLoading(false);
//         setSucceess(true);
//         // const data = result.data;
//         setName("");
//         setEmail("");
//         setPassword("");
//         setCpassword("");

//         Swal.fire(
//           "Registration Successful!",
//           "You have registered successfully.",
//           "success"
//         ).then(() => (window.location.href = "/login"));
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//         setError(true);
//       }
//     } else {
//       alert("Password not match");
//     }
//   }

//   return (
//     <div>
//       {loading && <Loader />}
//       {error && <Error />}
//       <div className="register">
//         <div className="left-register">
//           {/* <div className="register-logo">
//             <img src={logo} alt="logo" id="register-logo" />
//           </div> */}
//           <div className="register-body">
//             <img src={registerImg} alt="logo" id="register-img" />
//           </div>
//           <p className="register-paragraph">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
//             nisi maxime voluptas necessitatibus. Repellat nisi, totam recusandae
//             laboriosam placeat necessitatibus.
//           </p>
//         </div>
//         <div className="right-register">
//           <div className="top-register">
//             <p>
//               Already have an Account?
//               <Link to="/login" id="linkLogin">
//                 Login
//               </Link>
//             </p>
//           </div>
//           <div className="register-right-body">
//             <div className="register-container">
//               {success && <Success message="Registration Success" />}
//               <h1>Create an Account</h1>
//               <div className="input-group">
//                 <h5>Name</h5>
//                 <input
//                   type="text"
//                   placeholder="Enter Name"
//                   value={name}
//                   className="input-form"
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>

//               <div className="input-group">
//                 <h5>Email</h5>
//                 <input
//                   type="text"
//                   placeholder="Enter Email"
//                    className="input-form"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <div className="input-group">
//                 <h5>Password</h5>
//                 <input
//                   type="password"
//                   placeholder="Enter a Password"
//                    className="input-form"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <div className="input-group">
//                   <h5>ConfirmPassword</h5>
//                   <input
//                     type="password"
//                     placeholder="Enter a confirm Password"
//                      className="input-form"
//                     value={cpassword}
//                     onChange={(e) => setCpassword(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                 <button className="btn mt-3  ml-3 homebtn" onClick={register} >
//                   Register
//                 </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterScreen;
{
  /* <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-3">
        {success&&(<Success message="Registration Success"/>)}
          <div className="bs">
            <h2 className="text-center">Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="confirm Password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />
            <button className="btn btn-primary mt-3" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div> */
}
