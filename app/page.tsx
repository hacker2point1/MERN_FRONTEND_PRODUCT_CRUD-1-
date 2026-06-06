"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Typography,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";

import ProductGrid from "@/src/components/ProductGrid";
import ProductFilters from "@/src/components/ProductFilters";

import {
  getProduct,
  searchProducts,
} from "@/src/services/product.service";

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    const data = await getProduct();
    setLoading(false);

    if (data === null) {
      setError("Failed to fetch products (backend may be down)");
      setProducts([]);
      return;
    }

    setProducts(data);
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      fetchProducts();
      return;
    }

    try {
      setLoading(true);
      const data = await searchProducts(search);
      setProducts(data ?? []);
    } catch (e) {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = async (filters: { color?: string; size?: string; brand?: string }) => {
    try {
      setLoading(true);
      setError(null);
      console.debug("Applying filters from page", { search, filters });
      const data = await searchProducts(search, filters);
      setProducts(data ?? []);
    } catch (e) {
      setError("Filter failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: 260,
          minWidth: 260,
          bgcolor: "#fff",
          borderRight: "1px solid #ddd",
          p: 2,
          height: "100vh",
          position: "sticky",
          top: 0,
        }}
      >
        <ProductFilters onApply={handleApplyFilters} />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          p: 3,
        }}
      >
        {/* Top Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#fff",
            px: 3,
            py: 2,
            borderRadius: 1,
            mb: 3,
          }}
        >
          <Typography variant="h5">
            Home
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <TextField
              size="small"
              placeholder="Enter product name"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              sx={{
                width: 280,
                bgcolor: "#fff",
              }}
            />

            <Button
              variant="outlined"
              color="success"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
        </Box>

        {/* Product Heading */}
        <Typography
          variant="h3"
          fontWeight={600}
          mb={3}
        >
          All Products
        </Typography>

        {/* Add Product Button */}
        <Button
          variant="contained"
          sx={{
            mb: 4,
            textTransform: "none",
            fontSize: "16px",
          }}
          onClick={() => router.push('/products/add')}
        >
          Add Product
        </Button>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Product Grid */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <ProductGrid products={products} onDelete={fetchProducts} />
        )}
      </Box>
    </Box>
  );
}