import express from "express";
import {
  createdRoom,
  deleteRoom,
  getAllRoom,
  getRoom,
  updateRoom,
  updateRoomAvailability,
} from "../controller/room.js";
const router = express.Router();
router.get("/:id", getRoom);
router.get("/", getAllRoom);
router.patch("/update/:id", updateRoom);
router.put("/availability/:id", updateRoomAvailability);
router.delete("/:id", deleteRoom);
router.post("/:hotelId", createdRoom);
export default router;
