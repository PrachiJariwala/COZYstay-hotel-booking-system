/* eslint-disable no-unused-vars */
/* eslint-disable no-cond-assign */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Room from "../Components/room";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import { DatePicker } from "antd";
import "antd/dist/antd";
import moment from "moment";
import { parse, isValid, format, isBefore, isAfter, isEqual } from "date-fns";
import { isWithinInterval } from "date-fns";
import Aos from "aos";
import "aos/dist/aos.css";

const HomeScreen = () => {

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);
  const [duplicateRooms, setDuplicateRooms] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState([]);
  const [searchkey, setSearchkey] = useState([]);
  const [type, setType] = useState("all");
  // The useEffect hook cannot directly be an async function. Instead, you should create an async function inside useEffect and call it.
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
          
        const response = await axios.get("/api/rooms/getallrooms");
        const data = response.data; // Ensure you access the data property
        if (Array.isArray(data)) {
          setRooms(data);
          setDuplicateRooms(data);
          //setLoading(false);
        } else {
          setError(true);
        }
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const { RangePicker } = DatePicker;

  //date vise search
  //date-fns
  function filterByDate(dates) {
    const startDate = parse(
      dates[0].format("DD-MM-YYYY"),
      "dd-MM-yyyy",
      new Date()
    );
    const endDate = parse(
      dates[1].format("DD-MM-YYYY"),
      "dd-MM-yyyy",
      new Date()
    );

    setFromDate(format(startDate, "dd-MM-yyyy"));
    setToDate(format(endDate, "dd-MM-yyyy"));

    let tempRooms = [];
    for (const room of duplicateRooms) {
      let isAvailable = true;

      if (room.currentBookings.length > 0) {
        for (const booking of room.currentBookings) {
          const bookingStart = parse(
            booking.fromDate,
            "dd-MM-yyyy",
            new Date()
          );
          const bookingEnd = parse(booking.toDate, "dd-MM-yyyy", new Date());

          const isOverlap =
            isWithinInterval(startDate, {
              start: bookingStart,
              end: bookingEnd,
            }) ||
            isWithinInterval(endDate, {
              start: bookingStart,
              end: bookingEnd,
            }) ||
            isWithinInterval(bookingStart, {
              start: startDate,
              end: endDate,
            }) ||
            isWithinInterval(bookingEnd, { start: startDate, end: endDate });

          if (
            isOverlap ||
            isEqual(startDate, bookingStart) ||
            isEqual(endDate, bookingEnd)
          ) {
            isAvailable = false;
            break;
          }
        }
      }

      if (isAvailable) {
        tempRooms.push(room);
      }
    }

    setRooms(tempRooms);
  }

  //name vise search
  function filterBySearch() {
    const tempRooms = duplicateRooms.filter((room) =>
      room.name.toLowerCase().includes(searchkey.trim().toLowerCase())
    );

    console.log("Filtered rooms: ", tempRooms); // Debugging

    setRooms(tempRooms);
  }

  // type vise search
  function filterByType(e) {
    setType(e);
    if (e !== "all") {
      const tempRooms = duplicateRooms.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      );
      setRooms(tempRooms);
    } else {
      setRooms(duplicateRooms);
    }
  }

  return (
    <div className="home-container">
      <div className="container ">
        <div className="row mt-12 bs search-container"  data-aos="fade-down">
          <div className="col-md-4">
            <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control search-control"
              placeholder="Search Rooms"
              value={searchkey}
              onChange={(e) => setSearchkey(e.target.value)}
              onKeyUp={filterBySearch}
             
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-control"
              value={type}
              onChange={(e) => {
                filterByType(e.target.value);
              }}
            >
              <option value="all">All</option>
              <option value="delux">Delux</option>
              <option value="executive">Executive</option>
              <option value="suite">Suite</option>
            </select>
          </div>
        </div>
        <div className="justify-content-center mt-3 ">
          {loading ? (
            <Loader />
          ) : (
            rooms.map((room, index) => {
              return (
                <div className="room grid" >
                  <div
                    className="col-md-12 mt-3 text-left room-container room-card"
                    data-aos="fade-up"
                    key={room._id}
                  >
                    <Room
                      room={room}
                      fromDate={fromDate}
                      toDate={toDate}
                    ></Room>
                    {/* <h1 key={room._id}>{room.name}</h1>;  */}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* <div className="row justify-content-center mt-3">
          {loading ? (
            <Loader />
          ) : (
            <div className="room-grid ">
              {rooms.map((room) => (
                <div className="room-card col-md-12" key={room._id}>
                  <Room room={room} fromDate={fromDate} toDate={toDate} />
                </div>
              ))}
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default HomeScreen;

// import React from "react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Room from "../Components/room";
// import Loader from "../Components/Loader";
// import Error from "../Components/Error";
// import { DatePicker } from "antd";
// import "antd/dist/antd";
// import moment from "moment";
// import { parse, isValid, format, isBefore, isAfter, isEqual } from "date-fns";
// import { isWithinInterval } from "date-fns";

// const HomeScreen = () => {
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [duplicateRooms, setDuplicateRooms] = useState();
//   const [fromDate, setFromDate] = useState();
//   const [toDate, setToDate] = useState([]);
//   const [searchkey, setSearchkey] = useState([]);
//   const [type, setType] = useState("all");

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("/api/rooms/getallrooms");
//         const data = response.data;
//         if (Array.isArray(data)) {
//           setRooms(data);
//           setDuplicateRooms(data);
//         } else {
//           setError(true);
//         }
//         setLoading(false);
//       } catch (error) {
//         setError(true);
//         console.log(error);
//         setLoading(false);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRooms();
//   }, []);

//   const { RangePicker } = DatePicker;

//   function filterByDate(dates) {
//     const startDate = parse(
//       dates[0].format("DD-MM-YYYY"),
//       "dd-MM-yyyy",
//       new Date()
//     );
//     const endDate = parse(
//       dates[1].format("DD-MM-YYYY"),
//       "dd-MM-yyyy",
//       new Date()
//     );

//     setFromDate(format(startDate, "dd-MM-yyyy"));
//     setToDate(format(endDate, "dd-MM-yyyy"));

//     let tempRooms = [];
//     for (const room of duplicateRooms) {
//       let isAvailable = true;

//       if (room.currentBookings.length > 0) {
//         for (const booking of room.currentBookings) {
//           const bookingStart = parse(
//             booking.fromDate,
//             "dd-MM-yyyy",
//             new Date()
//           );
//           const bookingEnd = parse(booking.toDate, "dd-MM-yyyy", new Date());

//           const isOverlap =
//             isWithinInterval(startDate, {
//               start: bookingStart,
//               end: bookingEnd,
//             }) ||
//             isWithinInterval(endDate, {
//               start: bookingStart,
//               end: bookingEnd,
//             }) ||
//             isWithinInterval(bookingStart, {
//               start: startDate,
//               end: endDate,
//             }) ||
//             isWithinInterval(bookingEnd, { start: startDate, end: endDate });

//           if (
//             isOverlap ||
//             isEqual(startDate, bookingStart) ||
//             isEqual(endDate, bookingEnd)
//           ) {
//             isAvailable = false;
//             break;
//           }
//         }
//       }

//       if (isAvailable) {
//         tempRooms.push(room);
//       }
//     }

//     setRooms(tempRooms);
//   }

//   function filterBySearch() {
//     const tempRooms = duplicateRooms.filter((room) =>
//       room.name.toLowerCase().includes(searchkey.toLowerCase())
//     );
//     setRooms(tempRooms);
//   }

//   function filterByType(e) {
//     setType(e);
//     if (e !== "all") {
//       const tempRooms = duplicateRooms.filter(
//         (room) => room.type.toLowerCase() === e.toLowerCase()
//       );
//       setRooms(tempRooms);
//     } else {
//       setRooms(duplicateRooms);
//     }
//   }

//   return (
//     <div className="home-container">
//       <div className="container search-bar">
//         <div className="row mt-4 bs col-md-12 search-container">
//           <div className="col-md-4">
//             <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
//           </div>

//           <div className="col-md-4">
//             <input
//               type="text"
//               className="form-control search-control"
//               placeholder="Search Rooms"
//               value={searchkey}
//               onChange={(e) => setSearchkey(e.target.value)}
//               onKeyUp={filterBySearch}
//             />
//           </div>
//           <div className="col-md-4">
//             <select
//               className="form-control"
//               value={type}
//               onChange={(e) => {
//                 filterByType(e.target.value);
//               }}
//             >
//               <option value="all">All</option>
//               <option value="delux">Delux</option>
//               <option value="executive">Executive</option>
//               <option value="suite">Suite</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="container room-list">
//         <div className="row justify-content-center mt-3">
//           {loading ? (
//             <Loader />
//           ) : (
//             <div className="room-grid">
//               {rooms.map((room) => (
//                 <div className="room-card col-md-12" key={room._id}>
//                   <Room room={room} fromDate={fromDate} toDate={toDate} />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeScreen;
//http://localhost:3000/home

// function filterByDate(dates) {
//   // console.log((dates[0]).format('DD-MM-YYYY'));
//   // console.log((dates[1]).format('DD-MM-YYYY'));
//   // const startDate = moment(dates[0]);
//   // const endDate = moment(dates[1]);

//   // setFromDate(startDate);
//   // setToDate(endDate);
//   setFromDate(dates[0].format("DD-MM-YYYY"));
//   setToDate(dates[1].format("DD-MM-YYYY"));

//   let tempRooms = [];
//   // var availability = false;
//   for (const room of duplicateRooms) {
//     let isAvailable = true;
//     // const startDate = moment(dates[0], "DD-MM-YYYY",true);
//     // const endDate = moment(dates[1], "DD-MM-YYYY",true);
//     if (room.currentBookings.length > 0) {
//       for (const booking of room.currentBookings) {

//         //   if (
//         //     !startDate.isBetween(
//         //       moment(booking.fromDate, "DD-MM-YYYY"),
//         //       moment(booking.toDate, "DD-MM-YYYY")
//         //     ) &&
//         //     !endDate.isBetween(
//         //       moment(booking.fromDate, "DD-MM-YYYY"),
//         //       moment(booking.toDate, "DD-MM-YYYY")
//         //     )
//         //   ) {
//         //     if (
//         //       startDate.format("DD-MM-YYYY") !== booking.fromDate &&
//         //       startDate.format("DD-MM-YYYY") !== booking.toDate &&
//         //       endDate.format("DD-MM-YYYY") !== booking.fromDate &&
//         //       endDate.format("DD-MM-YYYY") !== booking.toDate
//         //     ) {
//         //       availability = true;
//         //     }
//         //   }

//         //yt code
//         //     if (
//         //       !moment(moment(dates[0].format("DD-MM-YYYY"))).isBetween(
//         //         booking.fromDate,
//         //         booking.toDate
//         //       ) &&
//         //       !moment(moment(dates[1].format("DD-MM-YYYY"))).isBetween(
//         //         booking.fromDate,
//         //         booking.toDate
//         //       )
//         //     ) {
//         //       if (
//         //         moment(dates[0]).format("DD-MM-YYYY") !== booking.fromDate &&
//         //         moment(dates[0]).format("DD-MM-YYYY") !== booking.toDate &&
//         //         moment(dates[1]).format("DD-MM-YYYY") !== booking.fromDate &&
//         //         moment(dates[1]).format("DD-MM-YYYY") !== booking.toDate
//         //       ) {
//         //         availability = true;
//         //       }
//         //     }
//         //   }
//         // }
//         // if (availability === true || room.currentBookings.length === 0) {
//         //   tempRooms.push(room);
//         // }

//         const startDate = moment(dates[0],'DD-MM-YYYY');
//         const endDate = moment(dates[1],'DD-MM-YYYY')

//         const bookingStart = moment(booking.fromDate, "DD-MM-YYYY");
//         const bookingEnd = moment(booking.toDate, "DD-MM-YYYY");

//         console.log("Checking room:", room.name);
//         console.log("Booking from:", bookingStart.format("DD-MM-YYYY"));
//         console.log("Booking to:", bookingEnd.format("DD-MM-YYYY"));
//         console.log("Requested start date:", startDate.format("DD-MM-YYYY"));
//         console.log("Requested end date:", endDate.format("DD-MM-YYYY"));
//         // console.log(dates[0].format('DD-MM-YYYY'),dates[1].format('DD-MM-YYYY'))

//         // Check if the booking dates overlap with the requested dates
//         const isOverlap =
//           startDate.isBetween(bookingStart, bookingEnd, null, "[]") ||
//           endDate.isBetween(bookingStart, bookingEnd, null, "[]") ||
//           bookingStart.isBetween(startDate, endDate, null, "[]") ||
//           bookingEnd.isBetween(startDate, endDate, null, "[]");
//         if (
//           isOverlap ||
//           startDate.isSame(bookingStart) ||
//           //startDate matches bookingStart
//           endDate.isSame(bookingEnd)
//         ) {
//           console.log(`Room ${room.name} is booked for these dates.`);
//           isAvailable = false;
//           break;
//         }
//       }
//     }
//     if (isAvailable) {
//       tempRooms.push(room);
//     }
//   }
//   setRooms(tempRooms);
