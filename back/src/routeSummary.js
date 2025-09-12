import express from "express";
import { getSummaryMonth, getSummary, getSummaryAlert } from "./controller/summaryController.js";

const router = express.Router();

router.get("/monthly", getSummaryMonth);
router.get("/", getSummary);
router.get("/alert", getSummaryAlert);

export default router;