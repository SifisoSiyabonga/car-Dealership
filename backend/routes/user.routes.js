import express from "express";
import mongoose from "mongoose";
import user from "../model/user.model.js";
import { createUser, getUser , authUser } from "./controller/user.controller.js";

const router = express.Router();




router.post("/auth",authUser)

router.post("/", createUser);
router.post("/login",getUser);

export default router;
