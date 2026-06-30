import express from "express";
import * as adminController from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", adminController.getAllUsers);
router.get("/stats", adminController.getStats);

export default router;
