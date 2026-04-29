import { Router } from "express";

import {
  getComments,
  createComment,
} from "../controllers/commentsController.js";

const route = Router();

route.get("/", getComments);
route.post("/", createComment);

export default route;
