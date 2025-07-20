/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import React from "react";
// import logo from "../Images/cozystay.png";
import React, { useState,useEffect } from "react";
const NavBar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  // const user = JSON.parse(localStorage.getItem("currentUser"));

   // useEffect to check localStorage for currentUser
   useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
    }
  }, []); // Empty dependency array means this runs once when the component mounts

   // Function to handle logout
  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null); 
    window.location.href = "/login";
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light " >
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          {/* <img src={logo} alt="logo" className="nav-logo" height={90} width={150}/> */}
         <h2 className="logo-style">COZY<span>stay</span></h2>

         </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            {/* <i className="fa fa-bars" ></i> */}
            <i className="fa fa-bars" style={{color:"white"}}></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            { currentUser  ? (
              <>
              <li className="nav-item">
                <div className="dropdown">
                  <button
                    className="mt-2 dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-user"></i>&nbsp;{currentUser.name}
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className="dropdown-item " href="/profile">
                      Profile
                    </a>
                    <a className="dropdown-item" href="#" onClick={logout}>
                      Logout
                    </a>
                    
                  </div>
                </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/home">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contact">
                    Contact Us
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/home">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contact">
                    Contact Us
                  </a>
                </li>
                
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;














// // /* eslint-disable no-unused-vars */
// // /* eslint-disable jsx-a11y/anchor-is-valid */
// // import React, { useState } from "react";
// // // import logo from "../Navbar/company_logo2.png";

// // const NavBar = () => {
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const user = JSON.parse(localStorage.getItem("currentUser"));

// //   const logout = () => {
// //     localStorage.removeItem("currentUser");
// //     setCurrentUser(null); 
// //     window.location.href = "/login";
// //   };

// //   return (
// //     <nav className="navbar navbar-expand-lg navbar-custom">
// //       <div className="container-fluid">
// //         <a className="navbar-brand" href="/home">
// //           {/* <img src={logo} alt="logo" className="nav-logo" height={40} width={100} /> */}
// //           COZY<span>stay</span>
// //         </a>
// //         <button
// //           className="navbar-toggler"
// //           type="button"
// //           data-bs-toggle="collapse"
// //           data-bs-target="#navbarNav"
// //           aria-controls="navbarNav"
// //           aria-expanded="false"
// //           aria-label="Toggle navigation"
// //         >
// //           <span className="navbar-toggler-icon"></span>
// //         </button>

// //         <div className="collapse navbar-collapse" id="navbarNav">
// //           <ul className="navbar-nav ms-auto flex-column flex-lg-row text-center">
// //             {user ? (
// //               <>
// //                 <li className="nav-item dropdown">
// //                   <a
// //                     className="nav-link dropdown-toggle"
// //                     href="#"
// //                     id="userDropdown"
// //                     role="button"
// //                     data-bs-toggle="dropdown"
// //                     aria-expanded="false"
// //                   >
// //                     <i className="fa fa-user"></i>&nbsp;{user.name}
// //                   </a>
// //                   <ul className="dropdown-menu" aria-labelledby="userDropdown">
// //                     <li>
// //                       <a className="dropdown-item" href="/profile">
// //                         Profile
// //                       </a>
// //                     </li>
// //                     <li>
// //                       <a className="dropdown-item" href="#" onClick={logout}>
// //                         Logout
// //                       </a>
// //                     </li>
// //                   </ul>
// //                 </li>
// //                 <li className="nav-item">
// //                   <a className="nav-link" href="/about">
// //                     About Us
// //                   </a>
// //                 </li>
// //                 <li className="nav-item">
// //                   <a className="nav-link" href="/contact">
// //                     Contact Us
// //                   </a>
// //                 </li>
// //               </>
// //             ) : (
// //               <>
// //                 <li className="nav-item">
// //                   <a className="nav-link" href="/register">
// //                     Register
// //                   </a>
// //                 </li>
// //                 <li className="nav-item">
// //                   <a className="nav-link" href="/login">
// //                     Login
// //                   </a>
// //                 </li>
// //                 <li className="nav-item">
// //                   <a className="nav-link" href="/about">
// //                     About Us
// //                   </a>
// //                 </li>
// //                 <li className="nav-item">
// //                   <a className="nav-link" href="/contact">
// //                     Contact Us
// //                   </a>
// //                 </li>
// //               </>
// //             )}
// //           </ul>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// export default NavBar;

