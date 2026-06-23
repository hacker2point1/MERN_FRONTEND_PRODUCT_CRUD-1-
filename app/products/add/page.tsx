"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { createProduct } from "@/src/services/product.service";
import { useForm } from "react-hook-form";

import {
  Box,
  Paper,
  
  TextField,
  Button,
  Grid,
  Typography,
  
} from "@mui/material";

interface ProductFormData {
  name: string;
  category: string;
  brand: string;
  price: number;
  description: string;
  color:string;
  size:string;

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
      formData.append("color", data.color)
      formData.append("size",data.size)
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


  const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "18px",
    background: "rgba(255,255,255,0.65)",
    backdropFilter: "blur(10px)",

    "& fieldset": {
      borderColor: "rgba(255,255,255,0.4)",
    },

    "&:hover fieldset": {
      borderColor: "#667eea",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#667eea",
      borderWidth: "2px",
    },
  },

  "& .MuiInputLabel-root": {
    fontWeight: 500,
  },
};


  return (
  <Box
    sx={{
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #eef2ff 0%, #dbeafe 50%, #f5f3ff 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      p: { xs: 2, md: 4 },
    }}
  >
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 1100,
        p: { xs: 3, md: 5 },
        borderRadius: "32px",
        background: "rgba(255,255,255,0.25)",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow:
          "0 20px 60px rgba(15,23,42,0.12)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          mb: 5,
          textAlign: "center",
          background:
            "linear-gradient(135deg,#667eea,#764ba2)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Add Product
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Product Name */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Product Name"
              sx={inputStyle}
              {...register("name", {
                required: "Product name is required",
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          {/* Color */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Product Color"
              sx={inputStyle}
              {...register("color", {
                required: "Product color is required",
              })}
              error={!!errors.color}
              helperText={errors.color?.message}
            />
          </Grid>

          {/* Size */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Product Size"
              sx={inputStyle}
              {...register("size", {
                required: "Product size is required",
              })}
              error={!!errors.size}
              helperText={errors.size?.message}
            />
          </Grid>

          {/* Category */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Category"
              sx={inputStyle}
              {...register("category", {
                required: "Category is required",
              })}
              error={!!errors.category}
              helperText={errors.category?.message}
            />
          </Grid>

          {/* Brand */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Brand"
              sx={inputStyle}
              {...register("brand", {
                required: "Brand is required",
              })}
              error={!!errors.brand}
              helperText={errors.brand?.message}
            />
          </Grid>

          {/* Price */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="Price"
              sx={inputStyle}
              {...register("price", {
                required: "Price is required",
                min: {
                  value: 1,
                  message:
                    "Price must be greater than 0",
                },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          </Grid>

          {/* Description */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={5}
              label="Description"
              sx={inputStyle}
              {...register("description", {
                required:
                  "Description is required",
              })}
              error={!!errors.description}
              helperText={
                errors.description?.message
              }
            />
          </Grid>

          {/* Upload Button */}
          <Grid size={{ xs: 12 }}>
            <Button
              variant="contained"
              component="label"
              sx={{
                borderRadius: "16px",
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontWeight: 700,
                background:
                  "linear-gradient(135deg,#667eea,#764ba2)",
                boxShadow:
                  "0 10px 25px rgba(102,126,234,0.35)",

                "&:hover": {
                  transform: "translateY(-2px)",
                  background:
                    "linear-gradient(135deg,#5d6de8,#6a42a0)",
                },
              }}
            >
              Upload Images

              <input
                hidden
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          </Grid>

          {/* Image Preview */}
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              {images.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  sx={{
                    width: 140,
                    height: 140,
                    objectFit: "cover",
                    borderRadius: "20px",
                    border:
                      "1px solid rgba(255,255,255,0.3)",
                    boxShadow:
                      "0 10px 25px rgba(0,0,0,0.12)",
                    transition: "all .3s ease",

                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
              ))}
            </Box>
          </Grid>

          {/* Submit Button */}
          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{
                width: "100%",
                py: 2,
                borderRadius: "18px",
                fontWeight: 700,
                fontSize: "1rem",
                textTransform: "none",
                background:
                  "linear-gradient(135deg,#667eea,#764ba2)",
                boxShadow:
                  "0 15px 35px rgba(102,126,234,0.35)",

                "&:hover": {
                  transform: "translateY(-2px)",
                  background:
                    "linear-gradient(135deg,#5d6de8,#6a42a0)",
                },
              }}
            >
              {isSubmitting
                ? "Adding Product..."
                : "Add Product"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  </Box>
);

  // return (
  //   <Box
  //     sx={{
  //       minHeight: "100vh",
  //       bgcolor: "#f5f5f5",
  //       p: 4,
  //     }}
  //   >
  //     <Paper
  //       elevation={3}
  //       sx={{
  //         maxWidth: 1000,
  //         mx: "auto",
  //         p: 4,
  //         borderRadius: 3,
  //       }}
  //     >
  //       <Typography
  //         variant="h4"
  //         fontWeight={700}
  //         mb={4}
  //       >
  //         Add Product
  //       </Typography>

  //       <form
  //         onSubmit={handleSubmit(onSubmit)}
  //       >
  //         <Grid container spacing={3}>
  //           {/* Product Name */}
  //           <Grid size={{xs:12 , md:6}}>
  //             <TextField
  //               fullWidth
  //               label="Product Name"
  //               {...register("name", {
  //                 required:
  //                   "Product name is required",
  //               })}
  //               error={!!errors.name}
  //               helperText={
  //                 errors.name?.message
  //               }
  //             />
  //           </Grid>
            
  //           {/* color  */}
  //            <Grid size={{xs:12 , md:6}}>
  //             <TextField
  //               fullWidth
  //               label="Product Color"
  //               {...register("color", {
  //                 required:
  //                   "Product color is required",
  //               })}
  //               error={!!errors.name}
  //               helperText={
  //                 errors.name?.message
  //               }
  //             />
  //           </Grid>

  //           {/* product size  */}
  //            <Grid size={{xs:12 , md:6}}>
  //             <TextField
  //               fullWidth
  //               label="Product Size"
  //               {...register("size", {
  //                 required:
  //                   "Product size is required",
  //               })}
  //               error={!!errors.name}
  //               helperText={
  //                 errors.name?.message
  //               }
  //             />
  //           </Grid>

  //           {/* Category */}
  //            <Grid size={{xs:12 , md:6}}>
  //             <TextField
  //               fullWidth
  //               label="Category"
  //               {...register("category", {
  //                 required:
  //                   "Category is required",
  //               })}
  //               error={!!errors.category}
  //               helperText={
  //                 errors.category?.message
  //               }
  //             />
  //           </Grid>

  //           {/* Brand */}
  //            <Grid size={{xs:12 , md:6}}>
  //             <TextField
  //               fullWidth
  //               label="Brand"
  //               {...register("brand", {
  //                 required:
  //                   "Brand is required",
  //               })}
  //               error={!!errors.brand}
  //               helperText={
  //                 errors.brand?.message
  //               }
  //             />
  //           </Grid>

  //           {/* Price */}
  //            <Grid size={{xs:12 , md:6}}>
  //             <TextField
  //               fullWidth
  //               type="number"
  //               label="Price"
  //               {...register("price", {
  //                 required:
  //                   "Price is required",
  //                 min: {
  //                   value: 1,
  //                   message:
  //                     "Price must be greater than 0",
  //                 },
  //               })}
  //               error={!!errors.price}
  //               helperText={
  //                 errors.price?.message
  //               }
  //             />
  //           </Grid>

  //           {/* Description */}
  //            <Grid size={{xs:12}}>
  //             <TextField
  //               fullWidth
  //               multiline
  //               rows={4}
  //               label="Description"
  //               {...register("description", {
  //                 required:
  //                   "Description is required",
  //               })}
  //               error={
  //                 !!errors.description
  //               }
  //               helperText={
  //                 errors.description
  //                   ?.message
  //               }
  //             />
  //           </Grid>

  //           {/* Image Upload */}
  //            <Grid size={{xs:12 }}>
  //             <Button
  //               variant="contained"
  //               component="label"
  //             >
  //               Upload Images

  //               <input
  //                 hidden
  //                 type="file"
  //                 multiple
  //                 accept="image/*"
  //                 onChange={
  //                   handleImageChange
  //                 }
  //               />
  //             </Button>
  //           </Grid>

  //           {/* Image Preview */}
  //            <Grid size={{xs:12}}>
  //             <Box
  //               sx={{
  //                 display: "flex",
  //                 gap: 2,
  //                 flexWrap: "wrap",
  //               }}
  //             >
  //               {images.map(
  //                 (image, index) => (
  //                   <Box
  //                     key={index}
  //                     component="img"
  //                     src={URL.createObjectURL(
  //                       image
  //                     )}
  //                     alt="preview"
  //                     sx={{
  //                       width: 120,
  //                       height: 120,
  //                       objectFit: "cover",
  //                       borderRadius: 2,
  //                       border:
  //                         "1px solid #ddd",
  //                     }}
  //                   />
  //                 )
  //               )}
  //             </Box>
  //           </Grid>

  //           {/* Submit Button */}
  //            <Grid size={{xs:12 }}>
  //             <Button
  //               type="submit"
  //               variant="contained"
  //               size="large"
  //               disabled={
  //                 isSubmitting
  //               }
  //             >
  //               {isSubmitting
  //                 ? "Adding..."
  //                 : "Add Product"}
  //             </Button>
  //           </Grid>
  //         </Grid>
  //       </form>
  //     </Paper>
  //   </Box>
  // );
}