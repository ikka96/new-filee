import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: `"Smart Inventory Automation" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Verification Code",
    html: `
      <div style="font-family:Arial;padding:20px">
        <h2>Smart Inventory Automation</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP expires in 10 minutes.</p>
      </div>
    `,
  });
};