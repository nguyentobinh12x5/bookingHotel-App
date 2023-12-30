import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controller/user.js";
const router = express.Router();

router.get("/:id", getUser);
router.get("/", getAllUser);
router.delete("/:id", deleteUser);
router.patch("/update/:id", updateUser);
export default router;
