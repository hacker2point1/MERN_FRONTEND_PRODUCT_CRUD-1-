"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { editProduct, getSingleProduct } from "@/src/services/product.service";

// import {
//   getProductById,
//   updateProduct,
// } from "@/src/services/product.service";

interface ProductFormData {
  name: string;
  category: string;
  brand: string;
  price: number;
  description: string;
}

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      // getSingleProduct returns the product data directly
      const product = await getSingleProduct(params.id as string);

      reset({
        name: product.name,
        category: product.category,
        brand: product.brand,
        price: product.price,
        description: product.description,
      });

      setExistingImages(
        product.images?.map((img: { url: string }) => img.url) || []
      );
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Failed to load product",
      });

      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    setImages(Array.from(e.target.files));
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

      const res = await editProduct(params.id, formData);
      console.log("editProduct response:", res);

      if (res && res.status >= 200 && res.status < 300) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Product updated successfully",
          showConfirmButton: false,
          timer: 2000,
        });

        router.push("/");
      } else {
        console.error("Update failed, response:", res);
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Failed to update product",
      });
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
          Edit Product
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
                {...register(
                  "description",
                  {
                    required:
                      "Description is required",
                  }
                )}
                error={
                  !!errors.description
                }
                helperText={
                  errors.description
                    ?.message
                }
              />
            </Grid>

            {/* Existing Images */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                mb={2}
              >
                Existing Images
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                {existingImages.map(
                  (image, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={image}
                      alt={`product-${index}`}
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

            {/* Upload New Images */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
              >
                Upload New Images

                <input
                  hidden
                  multiple
                  type="file"
                  accept="image/*"
                  onChange={
                    handleImageChange
                  }
                />
              </Button>
            </Grid>

            {/* New Image Preview */}
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
                      alt={`preview-${index}`}
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

            {/* Submit */}
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
                  ? "Updating..."
                  : "Update Product"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}