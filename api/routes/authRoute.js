import express from "express";
import { register, login } from "../controller/auth.js";
const router = express.Router();
//REGISTER
router.post("/register", register);
//LOGIN
router.post("/login", login);
export default router;
