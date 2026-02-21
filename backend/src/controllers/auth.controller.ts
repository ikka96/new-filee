import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env";
import { generateOTP, getOtpExpiry } from "../utils/otp";
import { sendOtpEmail } from "../utils/mailer";

/* ===================== SIGNUP ===================== */
export const signup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, dob } = req.body;

    if (!firstName || !lastName || !email || !password || !dob) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const otp = generateOTP();
    const otpExpiresAt = getOtpExpiry();

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash,
        dob: new Date(dob),
        otpCode: otp,
        otpExpiresAt,
        isVerified: false,
      },
    });

    await sendOtpEmail(email, otp);

    return res.status(201).json({
      message: "OTP sent to email",
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Signup failed" });
  }
};

/* ===================== VERIFY OTP ===================== */
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.otpCode || !user.otpExpiresAt) {
      return res.status(400).json({ message: "Invalid OTP request" });
    }

    if (user.otpCode !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        otpCode: null,
        otpExpiresAt: null,
      },
    });

    return res.status(200).json({ message: "Account verified successfully" });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return res.status(500).json({ message: "OTP verification failed" });
  }
};

/* ===================== LOGIN ===================== */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.isVerified) {
      return res.status(401).json({ message: "Invalid credentials or not verified" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Login failed" });
  }
};