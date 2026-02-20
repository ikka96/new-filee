import { Box, Button, Paper, Typography } from "@mui/material";
import { useState } from "react";

type InvoiceItem = {
  name: string;
  quantity: number;
  price: number;
};

const InvoiceUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  // Mock OCR extracted data (will come from backend later)
  const [items] = useState<InvoiceItem[]>([
    { name: "Product A", quantity: 2, price: 500 },
    { name: "Product B", quantity: 1, price: 1200 },
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Invoice Upload
      </Typography>

      {/* Upload Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Upload Invoice (PDF / Image)
        </Typography>

        <Button variant="contained" component="label">
          Select File
          <input
            type="file"
            hidden
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileChange}
          />
        </Button>

        {file && (
          <Typography sx={{ mt: 2 }}>
            Selected File: <strong>{file.name}</strong>
          </Typography>
        )}
      </Paper>

      {/* Extracted Data Table */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Extracted Invoice Data
        </Typography>

        {items.length === 0 ? (
          <Typography>No data extracted yet</Typography>
        ) : (
          <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
            <Box component="thead">
              <Box component="tr">
                <Box component="th">Item</Box>
                <Box component="th">Quantity</Box>
                <Box component="th">Price</Box>
                <Box component="th">Total</Box>
              </Box>
            </Box>

            <Box component="tbody">
              {items.map((item, index) => (
                <Box component="tr" key={index}>
                  <Box component="td">{item.name}</Box>
                  <Box component="td">{item.quantity}</Box>
                  <Box component="td">₹{item.price}</Box>
                  <Box component="td">₹{item.quantity * item.price}</Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Paper>

      {/* Save Button */}
      <Button variant="contained" disabled>
        Save to Inventory
      </Button>
    </Box>
  );
};

export default InvoiceUpload;
