import express from "express"
import { EnglishTechFeeds } from "../controllers/EnglishTech.js";

const router =  express.Router();


router.get('/EnglishTechFeeds',EnglishTechFeeds)

export default router