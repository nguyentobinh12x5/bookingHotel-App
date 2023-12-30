import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getAllTransaction,
  getTransaction,
  getTransactionsByHotelId,
} from "../controller/transaction.js";
const router = express.Router();

router.post("/", createTransaction);
router.get("/:email", getAllTransaction);
router.get("/", getTransaction);
router.get("/hotel/:hotelId", getTransactionsByHotelId);
router.delete("/:id", deleteTransaction);
export default router;
