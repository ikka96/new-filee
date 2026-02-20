import { Box, Paper, Typography, Chip } from "@mui/material";

type Product = {
  name: string;
  quantity: number;
  threshold: number;
};

const Inventory = () => {
  // Mock inventory data (will come from database later)
  const products: Product[] = [
    { name: "Product A", quantity: 5, threshold: 10 },
    { name: "Product B", quantity: 20, threshold: 10 },
    { name: "Product C", quantity: 2, threshold: 5 },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Inventory Management
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Box
          component="table"
          sx={{ width: "100%", borderCollapse: "collapse" }}
        >
          <Box component="thead">
            <Box component="tr">
              <Box component="th">Product</Box>
              <Box component="th">Quantity</Box>
              <Box component="th">Threshold</Box>
              <Box component="th">Status</Box>
            </Box>
          </Box>

          <Box component="tbody">
            {products.map((product, index) => {
              const isLowStock = product.quantity < product.threshold;

              return (
                <Box component="tr" key={index}>
                  <Box component="td">{product.name}</Box>
                  <Box component="td">{product.quantity}</Box>
                  <Box component="td">{product.threshold}</Box>
                  <Box component="td">
                    {isLowStock ? (
                      <Chip label="Low Stock" color="error" />
                    ) : (
                      <Chip label="In Stock" color="success" />
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Inventory;
