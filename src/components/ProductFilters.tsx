"use client";

import { useState } from "react";
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

const colors = ["Black", "Blue", "Grey", "Light blue", "Red", "Steel", "White"];

const brands = ["HP", "PETER ENGLAND", "SAMSUNG"];

interface FilterProps {
  onApply?: (filters: { 
    color?: string; 
    size?: string; 
    brand?: string }) => void;
}

export default function ProductFilters({ onApply }: FilterProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) => {
    if (list.includes(value)) {
 setList(list.filter((i) => i !== value));
    }
     
    else 
    {
 setList([...list, value]);
    }
     
  };

  const handleApply = () => {
    const filters: { 
      color?: string; 
      size?: string; 
      brand?: string } = {};
    if (selectedSizes.length) {
      filters.size = selectedSizes.join(",");
    }
    if (selectedColors.length) {
      filters.color = selectedColors.join(",");
    }
    if (selectedBrands.length) {
      filters.brand = selectedBrands.join(",");
    }
    // console.debug("ProductFilters: applying filters", filters);
    onApply?.(filters);
  };

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
        <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 600, mb: 2 }}>
          Product Filter
        </Typography>

        {/* Size */}
        <Typography variant="h5" sx={{ fontSize: 15, fontWeight: 500, mb: 2 }}>
          Size
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <FormGroup>
          {sizes.map((size) => (
            <FormControlLabel
              key={size}
              control={
                <Checkbox
                  checked={selectedSizes.includes(size)}
                  onChange={() => toggle(selectedSizes, setSelectedSizes, size)}
                />
              }
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
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 500, mb: 2 }}>
            Color
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <FormGroup>
            {colors.map((color) => (
              <FormControlLabel
                key={color}
                control={
                  <Checkbox
                    checked={selectedColors.includes(color)}
                    onChange={() => toggle(selectedColors, setSelectedColors, color)}
                  />
                }
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
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 500, mb: 2 }}>
            Brand
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <FormGroup>
            {brands.map((brand) => (
              <FormControlLabel
                key={brand}
                control={
                  <Checkbox
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggle(selectedBrands, setSelectedBrands, brand)}
                  />
                }
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
          onClick={handleApply}
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
