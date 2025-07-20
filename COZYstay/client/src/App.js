// import logo from './logo.svg';
import "./App.css";
// import NavBar from "./Components/Navbar/navbar";
import NavBar from "./Components/navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import BookingScreen from "./Screens/BookingScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import LoginScreen from "./Screens/LoginScreen";
// import LoginScreen from "./Screens/LoginPage/LoginScreen";
// import RegisterScreen from "./Screens/RegisterPage/RegisterScreen";

import ProfileScreen from "./Screens/ProfileScreen";
import AdminScreen from "./Screens/AdminScreens";
import LandingScreen from "./Screens/LandingScreen";
import AboutUs from "./Components/AboutUs";
import Payment from "./Components/Payment";
import Contact from "./Components/Contact";
// import Contact from "./Components/Contactus/ContactUsForm";
import EditRoom from "./Components/EditRoom";
import ErrorScreen from "./Screens/ErrorScreen";
import AdminLogin from "./Screens/AdminLogin";
function App() {
  return (
    <div className="App app-container">
      {/* <NavBar /> */}
        <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path="/home" exact Component={HomeScreen}></Route>
          <Route path="/book/:roomId/:fromDate/:toDate" exact Component={BookingScreen}></Route>
          <Route path="/register" exact Component={RegisterScreen}></Route>
          <Route path="/login" exact Component={LoginScreen}></Route>
          <Route path="/profile" exact Component={ProfileScreen}></Route>
      

          <Route path="/admin" exact Component={AdminLogin}></Route>
          <Route path="/admin/adminscreen" exact Component={AdminScreen}></Route>
          <Route path="/about" exact Component={AboutUs}></Route>
          <Route path="/payment" exact Component={Payment}></Route>
          <Route path="/contact" exact Component={Contact}></Route>
          <Route path="/admin/rooms/:id" element={<EditRoom />} />
          <Route path="*" exact Component={ErrorScreen}></Route>
          <Route path="/" exact Component={LandingScreen}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
