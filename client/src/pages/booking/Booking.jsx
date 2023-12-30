import "./book.css";
import { useContext } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { DateRange } from "react-date-range";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Booking = () => {
  const { user } = useContext(AuthContext);
  const [infor, setInfor] = useState({
    fullname: user.fullname,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });
  const location = useLocation();
  const data = location.state.data;
  console.log(data);
  const { dates, options } = useContext(SearchContext);
  const MILLISENCONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date1.getTime() - date2.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISENCONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(dates[0].endDate, dates[0].startDate) + 1;
  const handleChange = (event) => {
    setInfor({ ...infor, [event.target.id]: event.target.value });
  };
  const { dispatch } = useContext(SearchContext);
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        <div className="hotelWrapper">
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">{data.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h2>
                <b>
                  {days
                    ? `$ ${days * data.cheapestPrice * options.room}`
                    : `$ ${data.cheapestPrice}`}
                </b>
                ({days ? `${days} nights` : "1 nights"})
              </h2>
              <button>Reserve or Book Now!</button>
            </div>
          </div>
          <div className="dates">
            <div>
              <h1>Dates</h1>
              <DateRange
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                minDate={new Date()}
                onChange={(item) => {
                  dispatch({ type: "SET_DATES", payload: [item.selection] });
                }}
              />
            </div>
            <div className="reserveinfor">
              <h1>Reserve Info</h1>
              <div className="form-input">
                <label id="fullname">Your Full Name:</label>
                <input
                  type="text"
                  placeholder="Fullname"
                  id="fullname"
                  className="reserveinput"
                  value={infor.fullname}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-input">
                <label id="email">Your Email:</label>
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  className="reserveinput"
                  value={infor.email}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-input">
                <label id="phoneNumber">Your Phone Number:</label>
                <input
                  type="number"
                  placeholder="Phone Number"
                  id="phoneNumber"
                  className="reserveinput"
                  onChange={handleChange}
                  value={infor.phoneNumber}
                ></input>
              </div>
              <div className="form-input">
                <label id="card">Your Identity Card Number:</label>
                <input
                  type="text"
                  placeholder="Card Number"
                  id="card"
                  className="reserveinput"
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>
          <div>
            <h2>Select Rooms</h2>
            <Reserve hotelId={data._id} inforUser={infor} days={days} />
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Booking;
