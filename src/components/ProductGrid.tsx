"use client";

import Box from "@mui/material/Box";
import ProductCard from "./ProductCard";


export default function ProductGrid({ products, onDelete }: any) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          sm: "repeat(3, 1fr)",
        },
      }}
    >
      {products.map((product: any) => (
        <Box key={product._id}>
          <ProductCard product={product} onDelete={onDelete} />
        </Box>
      ))}
    </Box>
  );
}