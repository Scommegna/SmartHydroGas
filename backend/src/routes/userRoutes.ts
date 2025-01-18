import express from "express";
import {
  createUser,
  deleteUser,
  editData,
  login,
  logout,
  getProfile,
} from "../controllers/userControllers";

import { isAdmin, isAuthenticated } from "../middlewares/authMiddlewares";

const router = express.Router();

router.post("/createAccount", createUser);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.patch("/editData", isAuthenticated, editData);
router.delete("/deleteUser", isAuthenticated, isAdmin, deleteUser);
router.get("/profile", isAuthenticated, getProfile); 

export { router };
