import { Box, Paper, Typography, Chip } from "@mui/material";

type Payment = {
  invoiceId: string;
  amount: number;
  method: string;
  status: "Paid" | "Pending" | "Overdue";
};

const Payments = () => {
  // Mock payment data (will come from backend later)
  const payments: Payment[] = [
    {
      invoiceId: "INV-001",
      amount: 2500,
      method: "UPI",
      status: "Paid",
    },
    {
      invoiceId: "INV-002",
      amount: 1800,
      method: "Card",
      status: "Pending",
    },
    {
      invoiceId: "INV-003",
      amount: 3200,
      method: "Net Banking",
      status: "Overdue",
    },
  ];

  const getStatusChip = (status: Payment["status"]) => {
    switch (status) {
      case "Paid":
        return <Chip label="Paid" color="success" />;
      case "Pending":
        return <Chip label="Pending" color="warning" />;
      case "Overdue":
        return <Chip label="Overdue" color="error" />;
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Payment Tracking
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
          <Box component="thead">
            <Box component="tr">
              <Box component="th">Invoice ID</Box>
              <Box component="th">Amount</Box>
              <Box component="th">Payment Method</Box>
              <Box component="th">Status</Box>
            </Box>
          </Box>

          <Box component="tbody">
            {payments.map((payment, index) => (
              <Box component="tr" key={index}>
                <Box component="td">{payment.invoiceId}</Box>
                <Box component="td">₹{payment.amount}</Box>
                <Box component="td">{payment.method}</Box>
                <Box component="td">
                  {getStatusChip(payment.status)}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Payments;
