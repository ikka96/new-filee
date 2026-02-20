import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { getProfile } from "../controllers/auth.controller";
import { getDashboard } from "../controllers/dashboard.controller";

const router = Router();

router.get("/profile", authenticate, getProfile);
router.get("/dashboard", authenticate, getDashboard);

export default router;
