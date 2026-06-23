"use client";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { baseURL } from "@/api/axios/axios";
import { Product } from "@/src/types/product";
import { deleteProduct, restoreProduct } from "@/src/services/product.service";

interface Props {
  product: Product;
  onAction?: () => void;
}

export default function DeletedProductCard({ product, onAction }: Props) {
  const router = useRouter();

  const handlePermanentDelete = () => {
    Swal.fire({
      title: "Permanently delete product?",
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
              title: "Product permanently deleted",
              showConfirmButton: false,
              timer: 1500,
            });
            if (onAction) onAction();
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

  const handleRestore = () => {
    Swal.fire({
      title: "Restore product?",
      text: "This will restore the product back to active list.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Restore",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await restoreProduct(product._id);
          if (res && res.status >= 200 && res.status < 300) {
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: "Product restored",
              showConfirmButton: false,
              timer: 1500,
            });
            // navigate to main products list after successful restore
            router.push("/");
            return;
          }
          Swal.fire({ icon: "error", title: "Failed to restore product" });
        } catch (error) {
          console.error(error);
          Swal.fire({ icon: "error", title: "Failed to restore product" });
        }
      }
    });
  };

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "24px",
        overflow: "hidden",
        position: "relative",
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={(() => {
          const first = product.images?.[0];
          const url = typeof first === "string" ? first : first?.url;
          if (!url) return "https://via.placeholder.com/300";
          if (url.startsWith("http") || url.startsWith("/")) return url;
          return `${baseURL.replace(/\/$/, "")}/${url.replace(/^\/+/, "")}`;
        })()}
        alt={product.name}
        sx={{ objectFit: "cover" }}
      />

      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1, minHeight: 36, overflow: "hidden" }}
        >
          {product.description}
        </Typography>

        <Typography sx={{ fontWeight: 700, mb: 1 }}>
          {typeof product.price === "number" ? `₹ ${product.price}` : "—"}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="success"
            onClick={handleRestore}
            sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 600 }}
          >
            Restore
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handlePermanentDelete}
            sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 600 }}
          >
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
