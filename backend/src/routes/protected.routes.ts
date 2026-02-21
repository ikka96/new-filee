import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/profile", authenticate, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: (req as any).user,
  });
});

export default router;