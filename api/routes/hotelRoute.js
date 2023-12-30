import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotel,
  getCountByCity,
  getCountByType,
  getHotel,
  getHotelRoom,
  updateHotel,
} from "../controller/hotel.js";
const router = express.Router();
//using async beacuse need to connect with mongoose
//GET
// Nếu muốn tìm về đếm countbycity cần sử dụng /find/:id
router.get("/find/:id", getHotel);
//GETALL
router.get("/", getAllHotel);
router.get("/countByCity", getCountByCity);
router.get("/countByType", getCountByType);
router.get("/room/:id", getHotelRoom);
//CREATE
router.post("/", createHotel);
// UPDATE
router.patch("/update/:id", updateHotel);
// DELETE
router.delete("/:id", deleteHotel);
export default router;
