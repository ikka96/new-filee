export const otpEmailTemplate = (
  otp: string,
  purpose: "VERIFY" | "RESET" = "VERIFY"
) => {
  const title =
    purpose === "RESET"
      ? "Reset Your Password"
      : "Verify Your Email";

  const message =
    purpose === "RESET"
      ? "Use the OTP below to reset your password."
      : "Use the OTP below to verify your email address.";

  return `
  <div style="
    background:#0b061a;
    padding:40px;
    font-family:Arial,Helvetica,sans-serif;
  ">
    <div style="
      max-width:480px;
      margin:auto;
      background:#120c2e;
      border-radius:14px;
      padding:30px;
      color:#ffffff;
      box-shadow:0 0 30px rgba(168,139,250,0.4);
    ">

      <h2 style="
        text-align:center;
        color:#a78bfa;
        margin-bottom:10px;
      ">
        Smart Inventory Automation
      </h2>

      <p style="
        text-align:center;
        font-size:14px;
        color:#cbd5f5;
      ">
        ${title}
      </p>

      <div style="
        margin:30px 0;
        text-align:center;
      ">
        <span style="
          display:inline-block;
          font-size:32px;
          letter-spacing:6px;
          padding:16px 24px;
          background:#1f174a;
          border-radius:10px;
          font-weight:bold;
        ">
          ${otp}
        </span>
      </div>

      <p style="
        text-align:center;
        font-size:13px;
        color:#9ca3af;
      ">
        ${message}
        <br />
        This OTP is valid for <b>10 minutes</b>.
      </p>

      <p style="
        margin-top:25px;
        font-size:12px;
        color:#6b7280;
        text-align:center;
      ">
        If you did not request this, please ignore this email.
      </p>

    </div>
  </div>
  `;
};