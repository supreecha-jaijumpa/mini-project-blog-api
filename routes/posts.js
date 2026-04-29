import { Router } from "express";

import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postsController.js";

const route = Router();

route.get("/", getPosts);
route.get("/:id", getPostById);
route.post("/", createPost);
route.put("/:id", updatePost);
route.delete("/:id", deletePost);

export default route;
