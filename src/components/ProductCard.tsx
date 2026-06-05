"use client";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import { useRouter } from "next/navigation";
import { Product } from "../types/product";
import Swal from "sweetalert2";
import { deleteProduct, softDelete } from "@/src/services/product.service";

interface Props {
  product: Product;
  onDelete?: () => void;
}

export default function ProductCard({ product, onDelete }: Props) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/products/edit/${product._id}`);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Delete product?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteProduct(product._id);
          if (res && res.status >= 200 && res.status < 300) {
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: "Product deleted",
              showConfirmButton: false,
              timer: 1500,
            });
            if (onDelete) onDelete();
            else router.refresh();
            return;
          }

          Swal.fire({ icon: "error", title: "Failed to delete product" });
        } catch (error) {
          console.error(error);
          Swal.fire({ icon: "error", title: "Failed to delete product" });
        }
      }
    });
  };

  const handleSoftDelete = () => {
    Swal.fire({
      title: "Soft delete product?",
      text: "This will mark the product as deleted (recoverable).",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, soft delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await softDelete(product._id);
          if (res && res.status >= 200 && res.status < 300) {
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: "Product soft-deleted",
              showConfirmButton: false,
              timer: 1500,
            });
            if (onDelete) onDelete();
            else router.refresh();
            return;
          }
          Swal.fire({ icon: "error", title: "Failed to soft-delete product" });
        } catch (error) {
          console.error(error);
          Swal.fire({ icon: "error", title: "Failed to soft-delete product" });
        }
      }
    });
  };

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <CardMedia
        component="img"
        height="220"
        image={product.images?.[0]?.url || "https://via.placeholder.com/300"}
        alt={product.name}
      />

      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>

        {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.shortDescription}
        </Typography> */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Description : {product.description}
        </Typography>

        <Typography fontWeight={600}>Price : ₹ {product.price}</Typography>

        <Typography>Brand: {product.brand}</Typography>

        <Typography sx={{ mb: 2 }}>Category: {product.category}</Typography>

        <Stack direction="row" spacing={1}>
          <Button variant="contained" color="success" onClick={handleEdit}>
            Edit
          </Button>

          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>

          <Button variant="contained" color="warning" onClick={handleSoftDelete}>
            Soft Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
