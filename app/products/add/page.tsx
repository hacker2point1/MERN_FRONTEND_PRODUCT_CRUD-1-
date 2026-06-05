"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { createProduct } from "@/src/services/product.service";
import { useForm } from "react-hook-form";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";

interface ProductFormData {
  name: string;
  category: string;
  brand: string;
  price: number;
  description: string;
}

export default function AddProductPage() {
  const [images, setImages] = useState<File[]>([]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>();

  const handleImageChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const files = e.target.files;

  if (!files) {
    return;
  }

  const imageArray = [];

  for (let i = 0; i < files.length; i++) {
    imageArray.push(files[i]);
  }

  setImages(imageArray);
};

  const onSubmit = async (
    data: ProductFormData
  ) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("brand", data.brand);
      formData.append(
        "price",
        data.price.toString()
      );
      formData.append(
        "description",
        data.description
      );

      images.forEach((image) => {
        formData.append("images", image);
      });

      // call API
      const res = await createProduct(formData);

      if (res.status == 201) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Product added",
          showConfirmButton: false,
          timer: 2000,
        });

        router.push("/");
        return;
      }

      Swal.fire({ icon: "error", title: "Failed to add product" });
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Failed to add product" });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        p: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 1000,
          mx: "auto",
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          mb={4}
        >
          Add Product
        </Typography>

        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={3}>
            {/* Product Name */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Name"
                {...register("name", {
                  required:
                    "Product name is required",
                })}
                error={!!errors.name}
                helperText={
                  errors.name?.message
                }
              />
            </Grid>

            {/* Category */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Category"
                {...register("category", {
                  required:
                    "Category is required",
                })}
                error={!!errors.category}
                helperText={
                  errors.category?.message
                }
              />
            </Grid>

            {/* Brand */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Brand"
                {...register("brand", {
                  required:
                    "Brand is required",
                })}
                error={!!errors.brand}
                helperText={
                  errors.brand?.message
                }
              />
            </Grid>

            {/* Price */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Price"
                {...register("price", {
                  required:
                    "Price is required",
                  min: {
                    value: 1,
                    message:
                      "Price must be greater than 0",
                  },
                })}
                error={!!errors.price}
                helperText={
                  errors.price?.message
                }
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                {...register("description", {
                  required:
                    "Description is required",
                })}
                error={
                  !!errors.description
                }
                helperText={
                  errors.description
                    ?.message
                }
              />
            </Grid>

            {/* Image Upload */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
              >
                Upload Images

                <input
                  hidden
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={
                    handleImageChange
                  }
                />
              </Button>
            </Grid>

            {/* Image Preview */}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                {images.map(
                  (image, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={URL.createObjectURL(
                        image
                      )}
                      alt="preview"
                      sx={{
                        width: 120,
                        height: 120,
                        objectFit: "cover",
                        borderRadius: 2,
                        border:
                          "1px solid #ddd",
                      }}
                    />
                  )
                )}
              </Box>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={
                  isSubmitting
                }
              >
                {isSubmitting
                  ? "Adding..."
                  : "Add Product"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}