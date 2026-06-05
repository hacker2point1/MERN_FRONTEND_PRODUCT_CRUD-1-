"use client";

import {
  Box,
  Paper,
  Typography,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";

const sizes = ["S", "M", "L", "XL"];

const colors = [
  "Black",
  "Blue",
  "Grey",
  "Light blue",
  "Red",
  "Steel",
  "White",
];

const brands = [
  "HP",
  "PETER ENGLAND",
  "SAMSUNG",
];

export default function ProductFilters() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1,
        borderRadius: 0,
        height: "100%",
        borderRight: "1px solid #e0e0e0",
        fontSize: 12,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        overflowY: "auto",
      }}
    >
      {/* Heading */}
      <div>
        <Typography
          variant="h6"
          fontWeight={600}
          mb={2}
          sx={{ fontSize: 20 }}
        >
          Product Filter
        </Typography>

      {/* Size */}
      <Typography
        variant="h5"
        fontWeight={500}
        mb={2}
        sx={{ fontSize: 15 }}
      >
        Size
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <FormGroup>
        {sizes.map((size) => (
          <FormControlLabel
            key={size}
            control={<Checkbox />}
            label={size}
            sx={{
              mb: 1,
              "& .MuiTypography-root": {
                fontSize: 16,
              },
            }}
          />
        ))}
      </FormGroup>

      {/* Color */}
      <Box mt={4}>
        <Typography
          variant="h5"
          fontWeight={500}
          mb={2}
        >
          Color
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <FormGroup>
          {colors.map((color) => (
            <FormControlLabel
              key={color}
              control={<Checkbox />}
              label={color}
              sx={{
                mb: 1,
                "& .MuiTypography-root": {
                  fontSize: 16,
                },
              }}
            />
          ))}
        </FormGroup>
      </Box>

      {/* Brand */}
      <Box mt={4}>
        <Typography
          variant="h5"
          fontWeight={500}
          mb={2}
        >
          Brand
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <FormGroup>
          {brands.map((brand) => (
            <FormControlLabel
              key={brand}
              control={<Checkbox />}
              label={brand}
              sx={{
                mb: 1,
                "& .MuiTypography-root": {
                  fontSize: 16,
                },
              }}
            />
          ))}
        </FormGroup>
      </Box>

      {/* Button */}
      </div>

      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          size="medium"
          sx={{
            width: "100%",
            py: 1,
            fontSize: "0.9rem",
            textTransform: "none",
          }}
        >
          Apply Filter
        </Button>
      </Box>
    </Paper>
  );
}