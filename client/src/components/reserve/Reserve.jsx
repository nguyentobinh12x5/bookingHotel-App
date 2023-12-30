import React, { useContext, useState } from "react";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Reserve = ({ hotelId, inforUser, days }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [roomId, setRoomIt] = useState([]);
  const navigate = useNavigate();
  const { data, loading } = useFetch(
    `http://localhost:8800/hotel/room/${hotelId}`
  );
  console.log(data);
  const { dates } = useContext(SearchContext);
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  const isAvalable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };
  const handleRoomClick = (roomId) => {
    setRoomIt((pre) => [...pre, roomId]);
  };
  console.log(roomId);
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const price = Number(e.target.getAttribute("data-price"));
    const numberRoom = Number(e.target.getAttribute("data-number"));
    setTotalPrice(
      checked ? totalPrice + price * days : totalPrice - price * days
    );
    if (checked) {
      setSelectedRooms((pre) => [...pre, { id: value, number: numberRoom }]);
    } else {
      setSelectedRooms((pre) => pre.filter((room) => room.id !== value));
    }
  };
  //selected room là room number ví dụ như 101, 102
  const handleClick = async () => {
    try {
      const newTransaction = {
        ...inforUser,
        hotelId,
        room: selectedRooms,
        dateStart: dates[0].startDate,
        dateEnd: dates[0].endDate,
        status: "Booked",
        payment: paymentMethod,
        price: totalPrice,
      };
      console.log(newTransaction);
      await axios.post("http://localhost:8800/transaction", newTransaction);
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `http://localhost:8800/room/availability/${roomId.id}`,
            {
              dates: allDates,
            }
          );
        })
      );
      navigate("/transaction");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="rContainer">
        {loading
          ? "loading"
          : data.map((item) => (
              <div className="rItem" key={item._id}>
                <div className="rItemInfo">
                  <div className="rTitle">{item.title}</div>
                  {/* <div className="rDesc">{item.desc}</div> */}
                  <div className="rDesc">
                    Max People: <b>{item.maxPeople}</b>
                  </div>
                  <div className="rPrice">${item.price}</div>
                </div>
                {item.roomNumbers.map((roomNumber) => (
                  <div className="room" key={roomNumber._id}>
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      data-number={roomNumber.number}
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvalable(roomNumber)}
                      data-price={item.price}
                    ></input>
                  </div>
                ))}
              </div>
            ))}
      </div>
      <div>
        <div>
          <h2>Total Bill: ${totalPrice}</h2>
          <div>
            <select
              className="rSelect"
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="" hidden>
                Select Payment Method
              </option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
            </select>
            <button className="rButton" onClick={handleClick}>
              Reserve Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reserve;
