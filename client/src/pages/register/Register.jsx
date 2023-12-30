import { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [creadentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    fullname: undefined,
    email: undefined,
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8800/auth/register",
        creadentials
      );
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        ></input>
        {error && <div>{error}</div>}
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        ></input>
        <input
          type="text"
          placeholder="fullname"
          id="fullname"
          onChange={handleChange}
          className="lInput"
        ></input>
        <input
          type="text"
          placeholder="Phone Number"
          id="phoneNumber"
          onChange={handleChange}
          className="lInput"
        ></input>
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        ></input>
        <button className="lButton" onClick={handleClick}>
          Create Account
        </button>
        {error && (
          <div>
            <Link to="/login">
              <button className="lButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Register;
