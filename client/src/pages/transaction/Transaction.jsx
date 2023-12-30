import React, { useContext } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./Transaction.css";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
const Transaction = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const { data, loading } = useFetch(
    `http://localhost:8800/transaction/${user.email}`
  );
  console.log(data);
  return (
    <div>
      <Navbar />
      <Header />
      <div className="Container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date Start</th>
              <th>Date End</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.hotelId.name}</td>
                <td>{item.room.map((room) => room.number).join(", ")}</td>
                <td>{new Date(item.dateStart).toLocaleDateString("vi-VN")}</td>
                <td>{new Date(item.dateEnd).toLocaleDateString("vi-VN")}</td>
                <td>{item.price}</td>
                <td>{item.payment}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
