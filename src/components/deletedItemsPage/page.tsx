"use client";

import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Alert } from "@mui/material";
import DeletedProductCard from "@/src/components/deletedItemsPage/DeletedProductCard";
import { getDeletedProducts } from "@/src/services/product.service";

export default function DeletedItems() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDeleted();
  }, []);

  const fetchDeleted = async () => {
    setLoading(true);
    setError(null);
    const data = await getDeletedProducts();
    setLoading(false);

    if (data === null) {
      setError("Failed to fetch deleted items. Check backend endpoint or console logs.");
      setProducts([]);
      return;
    }

    setProducts(data);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Deleted Items
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
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
              <DeletedProductCard product={product} onAction={fetchDeleted} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
