import { Box, Button, TextField, Typography } from "@mui/material";

const OtpVerify = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: 360,
          p: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          OTP Verification
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Enter the 6-digit OTP sent to your registered email
        </Typography>

        <TextField
          fullWidth
          label="Enter OTP"
          inputProps={{ maxLength: 6 }}
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
        >
          Verify OTP
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Didn’t receive OTP? Resend
        </Typography>
      </Box>
    </Box>
  );
};

export default OtpVerify;
