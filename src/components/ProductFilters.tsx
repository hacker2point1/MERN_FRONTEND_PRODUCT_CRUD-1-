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




return(
  <Paper
  elevation={0}
  sx={{
    p: 3,
    height: "100%",
    borderRadius: "24px",

    background: "rgba(255,255,255,0.18)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",

    border: "1px solid rgba(255,255,255,0.25)",

    boxShadow:
      "0 8px 32px rgba(31,38,135,0.12)",

    display: "flex",
    flexDirection: "column",
    overflowY: "auto",

    transition: "all 0.3s ease",

    "&:hover": {
      boxShadow:
        "0 12px 40px rgba(31,38,135,0.18)",
    },
  }}
>
  <div>
    {/* Heading */}
    <Typography
      variant="h6"
      sx={{
        fontSize: 22,
        fontWeight: 700,
        mb: 3,
        textAlign: "center",
      }}
    >
      Product Filters
    </Typography>

    {/* Size */}
    <Typography
      sx={{
        fontWeight: 600,
        fontSize: 16,
        mb: 2,
      }}
    >
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
              onChange={() =>
                toggle(
                  selectedSizes,
                  setSelectedSizes,
                  size
                )
              }
              sx={{
                "&.Mui-checked": {
                  color: "#1976d2",
                },
              }}
            />
          }
          label={size}
          sx={{
            mb: 1,

            borderRadius: "12px",
            px: 1,

            transition: "all 0.2s ease",

            "&:hover": {
              background:
                "rgba(255,255,255,0.35)",
            },

            "& .MuiTypography-root": {
              fontSize: 15,
              fontWeight: 500,
            },
          }}
        />
      ))}
    </FormGroup>

    {/* Color */}
    <Box sx={{ mt: 4 }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 16,
          mb: 2,
        }}
      >
        Color
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <FormGroup>
        {colors.map((color) => (
          <FormControlLabel
            key={color}
            control={
              <Checkbox
                checked={selectedColors.includes(
                  color
                )}
                onChange={() =>
                  toggle(
                    selectedColors,
                    setSelectedColors,
                    color
                  )
                }
                sx={{
                  "&.Mui-checked": {
                    color: "#1976d2",
                  },
                }}
              />
            }
            label={color}
            sx={{
              mb: 1,
              borderRadius: "12px",
              px: 1,

              "&:hover": {
                background:
                  "rgba(255,255,255,0.35)",
              },

              "& .MuiTypography-root": {
                fontSize: 15,
                fontWeight: 500,
              },
            }}
          />
        ))}
      </FormGroup>
    </Box>

    {/* Brand */}
    <Box sx={{ mt: 4 }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 16,
          mb: 2,
        }}
      >
        Brand
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <FormGroup>
        {brands.map((brand) => (
          <FormControlLabel
            key={brand}
            control={
              <Checkbox
                checked={selectedBrands.includes(
                  brand
                )}
                onChange={() =>
                  toggle(
                    selectedBrands,
                    setSelectedBrands,
                    brand
                  )
                }
                sx={{
                  "&.Mui-checked": {
                    color: "#1976d2",
                  },
                }}
              />
            }
            label={brand}
            sx={{
              mb: 1,
              borderRadius: "12px",
              px: 1,

              "&:hover": {
                background:
                  "rgba(255,255,255,0.35)",
              },

              "& .MuiTypography-root": {
                fontSize: 15,
                fontWeight: 500,
              },
            }}
          />
        ))}
      </FormGroup>
    </Box>
  </div>

  {/* Apply Button */}
  <Box sx={{ mt: 4 }}>
    <Button
      fullWidth
      variant="contained"
      onClick={handleApply}
      sx={{
        py: 1.4,

        borderRadius: "14px",

        fontSize: "0.95rem",
        fontWeight: 600,

        textTransform: "none",

        background:
          "linear-gradient(135deg,#667eea,#764ba2)",

        boxShadow:
          "0 8px 20px rgba(102,126,234,0.35)",

        "&:hover": {
          background:
            "linear-gradient(135deg,#5a6ee0,#6c42a0)",

          transform: "translateY(-2px)",
        },

        transition: "all 0.25s ease",
      }}
    >
      Apply Filters
    </Button>
  </Box>
</Paper>
)



  
  // return (
  //   <Paper
  //     elevation={0}
  //     sx={{
  //       p: 1,
  //       borderRadius: 0,
  //       height: "100%",
  //       borderRight: "1px solid #e0e0e0",
  //       fontSize: 12,
  //       display: "flex",
  //       flexDirection: "column",
  //       justifyContent: "flex-start",
  //       alignItems: "stretch",
  //       overflowY: "auto",
  //     }}
  //   >
  //     {/* Heading */}
  //     <div>
  //       <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 600, mb: 2 }}>
  //         Product Filter
  //       </Typography>

  //       {/* Size */}
  //       <Typography variant="h5" sx={{ fontSize: 15, fontWeight: 500, mb: 2 }}>
  //         Size
  //       </Typography>

  //       <Divider sx={{ mb: 2 }} />

  //       <FormGroup>
  //         {sizes.map((size) => (
  //           <FormControlLabel
  //             key={size}
  //             control={
  //               <Checkbox
  //                 checked={selectedSizes.includes(size)}
  //                 onChange={() => toggle(selectedSizes, setSelectedSizes, size)}
  //               />
  //             }
  //             label={size}
  //             sx={{
  //               mb: 1,
  //               "& .MuiTypography-root": {
  //                 fontSize: 16,
  //               },
  //             }}
  //           />
  //         ))}
  //       </FormGroup>

  //       {/* Color */}
  //       <Box sx={{ mt: 4 }}>
  //         <Typography variant="h5" sx={{ fontWeight: 500, mb: 2 }}>
  //           Color
  //         </Typography>

  //         <Divider sx={{ mb: 3 }} />

  //         <FormGroup>
  //           {colors.map((color) => (
  //             <FormControlLabel
  //               key={color}
  //               control={
  //                 <Checkbox
  //                   checked={selectedColors.includes(color)}
  //                   onChange={() => toggle(selectedColors, setSelectedColors, color)}
  //                 />
  //               }
  //               label={color}
  //               sx={{
  //                 mb: 1,
  //                 "& .MuiTypography-root": {
  //                   fontSize: 16,
  //                 },
  //               }}
  //             />
  //           ))}
  //         </FormGroup>
  //       </Box>

  //       {/* Brand */}
  //       <Box sx={{ mt: 4 }}>
  //         <Typography variant="h5" sx={{ fontWeight: 500, mb: 2 }}>
  //           Brand
  //         </Typography>

  //         <Divider sx={{ mb: 3 }} />

  //         <FormGroup>
  //           {brands.map((brand) => (
  //             <FormControlLabel
  //               key={brand}
  //               control={
  //                 <Checkbox
  //                   checked={selectedBrands.includes(brand)}
  //                   onChange={() => toggle(selectedBrands, setSelectedBrands, brand)}
  //                 />
  //               }
  //               label={brand}
  //               sx={{
  //                 mb: 1,
  //                 "& .MuiTypography-root": {
  //                   fontSize: 16,
  //                 },
  //               }}
  //             />
  //           ))}
  //         </FormGroup>
  //       </Box>

  //       {/* Button */}
  //     </div>

  //     <Box sx={{ mt: 2 }}>
  //       <Button
  //         variant="outlined"
  //         size="medium"
  //         onClick={handleApply}
  //         sx={{
  //           width: "100%",
  //           py: 1,
  //           fontSize: "0.9rem",
  //           textTransform: "none",
  //         }}
  //       >
  //         Apply Filter
  //       </Button>
  //     </Box>
  //   </Paper>
  // );
}
