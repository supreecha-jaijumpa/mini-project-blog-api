import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";

const route = Router();

route.get("/", getUsers);
route.get("/:id", getUserById);
route.post("/", createUser);
route.put("/:id", updateUser);
route.delete("/:id", deleteUser);

export default route;
