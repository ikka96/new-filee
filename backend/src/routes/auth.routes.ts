import { Router } from "express";
import {
  signup,
  login,
  verifyOtp,

  resetPassword,
    forgotPassword,
    verifyResetOtp,
    
} from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);


export default router;