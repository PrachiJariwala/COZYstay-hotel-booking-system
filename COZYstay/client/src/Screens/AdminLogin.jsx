/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./LoginScreen.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginIllustration from "./Assets/Images/Login_illustrator.gif";
import Aos from "aos";
import "aos/dist/aos.css";

const AdminLogin = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };

    try {
      setLoading(true);
      const result = await axios.post("/api/users/login", user);
      setLoading(false);
      localStorage.setItem("currentUser", JSON.stringify(result.data));
     // navigate(result.data.isAdmin ? "/admin/adminscreen" : "/*");
     window.location.href = "/admin/adminscreen";
    } catch (err) {
      setLoading(false);
      setError("Invalid Credentials"); // Provide a specific error message
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100" data-aos="fade-down">
      {loading && (
        <div className="loader">
          {" "}
          {/* Add a loader here if needed */}
          Loading...
        </div>
      )}

      <div className="row bg-white shadow-lg rounded p-4 login-container">
        {/* Illustration Section */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <img
            src={loginIllustration}
            alt="Login Illustration"
            className="img-fluid"
          />
        </div>

        {/* Form Section */}
        <div className="col-md-6">
          <h3 className="text-center mt-2 mb-0">Welcome Back!</h3>

          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-2">
              Login
            </button>

            <p className="text-center mt-3">
              Don't have an account?{" "}
              <Link to="/register" id="linkRegister">
                Register Now..
              </Link>
              
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;















// /* eslint-disable no-unused-vars */
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Loader from "../Components/Loader";
// import Error from "../Components/Error";
// import logo from "./Assets/Images/logo.jpg";
// import loginimg from "./Assets/Images/login4.PNG";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// // import './login.scss'
// const LoginScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState();
//   const navigate = useNavigate(); // Use the useNavigate hook
//   const [currentUser, setCurrentUser] = useState(null);

//   // Fetch the current user from localStorage when the component mounts
//   useEffect(() => {
//     const storedUser = localStorage.getItem("currentUser");
//     if (storedUser) {
//       setCurrentUser(JSON.parse(storedUser));
//     }
//   }, []);
//   async function login(e) {
//     e.preventDefault(); // Prevent default form submission behavior
//     const user = {
//       email,
//       password,
//     };
//     // console.log(user);
//     try {
//       setLoading(true);
//       const result = await axios.post("/api/users/login", user);
//       const data = result.data;
//       setLoading(false);
//       localStorage.setItem("currentUser", JSON.stringify(data));
//       setCurrentUser(data); // Update the currentUser state

//       // Check if the user is an admin
//       if (data.isAdmin === true) {
//         // Navigate to admin panel
//         navigate("/admin");
//         // localStorage.setItem("currentUser", JSON.stringify(data));
//       } else {
//         // Navigate to home page for regular users
//         navigate("/home");
//         // localStorage.setItem("currentUser", JSON.stringify(data));
//       }
//       // const data = result.data;
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//       setError(true);
//     }
//   }

//   return (
//     <div>
//       {loading && <Loader />}
//       <div className="login">
//         <div className="login-container">
//           <div className="left-login">
//             <div className="logo-img">
//               <img src={logo} alt="login" id="logoimg" />
//             </div>
//             <form onSubmit={login}>
//               {error && <Error message="Invalid Credentionals" />}
//               <label for="email">Email</label>
//               <input
//                 type="text"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <label for="email">Password</label>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />

//               <button type="submit" className="btn mt-3 homebtn">
//                 Login
//               </button>
//               <div className="login-footer">
//                 <h5>
//                   Don't have an Account?{" "}
//                   <Link to="/register" className="regiter-link">
//                     Register Now....
//                   </Link>
//                 </h5>
//               </div>
//             </form>
//           </div>
//           <div className="right-login">
//             <div className="login-img">
//               <h3 className="loginNotes">Welcome Back !</h3>
//               <img src={loginimg} alt="login-img" id="loginImg" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginScreen;