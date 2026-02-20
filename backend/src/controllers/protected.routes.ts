import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { getProfile } from "../controllers/auth.controller";
import { getDashboard } from "../controllers/dashboard.controller";

const router = Router();

/**
 * ===============================
 * Protected Routes
 * All routes here REQUIRE JWT
 * ===============================
 */

// User profile (example protected route)
router.get("/profile", authenticate, getProfile);

// Dashboard (THIS FIXES YOUR ISSUE)
router.get("/dashboard", authenticate, getDashboard);

export default router;
