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
import { baseURL } from "@/api/axios/axios";
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

  // const handleDelete = () => {
  //   Swal.fire({
  //     title: "Delete product?",
  //     text: "This action cannot be undone.",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Delete",
  //     cancelButtonText: "Cancel",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         const res = await deleteProduct(product._id);
  //         if (res && res.status >= 200 && res.status < 300) {
  //           Swal.fire({
  //             toast: true,
  //             position: "top-end",
  //             icon: "success",
  //             title: "Product deleted",
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //           if (onDelete) onDelete();
  //           else router.refresh();
  //           return;
  //         }

  //         Swal.fire({ icon: "error", title: "Failed to delete product" });
  //       } catch (error) {
  //         console.error(error);
  //         Swal.fire({ icon: "error", title: "Failed to delete product" });
  //       }
  //     }
  //   });
  // };

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
      borderRadius: "24px",
      overflow: "hidden",
      position: "relative",

      background: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",

      border: "1px solid rgba(255,255,255,0.25)",

      boxShadow:
        "0 8px 32px rgba(31,38,135,0.15)",

      transition: "all 0.35s ease",

      "&:hover": {
        transform: "translateY(-8px)",
        boxShadow:
          "0 20px 40px rgba(31,38,135,0.25)",
      },

      "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        padding: "1px",
        borderRadius: "24px",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.05))",
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        pointerEvents: "none",
      },
    }}
  >
    <CardMedia
      component="img"
      height="240"
      image={
        (() => {
          const first = product.images?.[0];
          const url = typeof first === "string" ? first : first?.url;
          if (!url) return "https://via.placeholder.com/300";
          if (url.startsWith("http") || url.startsWith("/")) return url;
          // fallback: prefix backend base URL
          return `${baseURL.replace(/\/$/, "")}/${url.replace(/^\/+/, "")}`;
        })()
      }
      alt={product.name}
      sx={{
        objectFit: "cover",
      }}
    />

    <CardContent
      sx={{
        p: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {product.name}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 2,
          minHeight: 48,

          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {product.description}
      </Typography>

      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1.1rem",
          }}
        >
          {typeof product.price === "number"
            ? `₹ ${product.price}`
            : "—"}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Brand: {product.brand}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Category: {product.category}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        sx={{ flexWrap: "wrap" }}
      >
        <Button
          variant="contained"
          onClick={handleEdit}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 600,
            backdropFilter: "blur(10px)",
          }}
        >
          Edit
        </Button>

        {/* <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Delete
        </Button> */}

        <Button
          variant="contained"
          color="warning"
          onClick={handleSoftDelete}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Soft Delete
        </Button>
      </Stack>
    </CardContent>
  </Card>
);
  // return (
  //   <Card
  //     sx={{
  //       height: "100%",
  //       borderRadius: 2,
  //       boxShadow: 2,
  //     }}
  //   >
  //     <CardMedia
  //       component="img"
  //       height="220"
  //       image={product.images?.[0]?.url || "https://via.placeholder.com/300"}
  //       alt={product.name}
  //     />

  //     <CardContent>
  //       <Typography variant="h6" gutterBottom>
  //         {product.name}
  //       </Typography>

  //       {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
  //         {product.shortDescription}
  //       </Typography> */}
  //       <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
  //         Description : {product.description}
  //       </Typography>

  //       <Typography fontWeight={600}>Price : ₹ {product.price}</Typography>

  //       <Typography>Brand: {product.brand}</Typography>

  //       <Typography sx={{ mb: 2 }}>Category: {product.category}</Typography>

  //       <Stack direction="row" spacing={1}>
  //         <Button variant="contained" color="success" onClick={handleEdit}>
  //           Edit
  //         </Button>

  //         <Button variant="contained" color="error" onClick={handleDelete}>
  //           Delete
  //         </Button>

  //         <Button variant="contained" color="warning" onClick={handleSoftDelete}>
  //           Soft Delete
  //         </Button>
  //       </Stack>
  //     </CardContent>
  //   </Card>
  // );
}
