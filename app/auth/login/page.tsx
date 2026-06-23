

"use client";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authRegistration } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import styles from "../signUp/signup.module.css"
import Link from "next/link";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required"),
  address: yup
    .string()
    .required("address is required"),

  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "password cannot exceed 20 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .min(6, "Confirm Password must be at least 6 characters")
    .max(20, "Confirm password cannot exceed 20 characters")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password is required"),
  profileImage: yup
    .mixed()
    .required("Image is required")
    .test(
      "fileExist",
      "Please select an image",
      (value) => value && value.length > 0,
    )
    .test("fileType", "Unsupported file format", (value) =>
      value && value.length > 0
        ? ["image/jpeg", "image/jpg", "image/gif"].includes(value[0].type)
        : false,
    ),
});
export default function Register() {
  const router = useRouter();
  const [img, setImg] = useState();
  console.log("img", img);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const imageChange = (e) => {
    const file = e.target.files[0];

    console.log(file, "file");

    if (file && file.type.startsWith("image/")) {
      setImg(file);

      clearErrors("profileImage", file);
    } else {
      alert("please upload your img file");
    }
  };
  const handleClick = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", img);

    const response = await dispatch(authRegistration(formData));

    if (response.payload?.status === true) {
      localStorage.setItem("email", data.email);
      localStorage.setItem("Id", response.payload.user.id);

      router.push("/auth/otp");
    }
       else{
        alert(response.payload?.message)
       }
  };

 
  return (
  <div className={styles.pageWrapper}>
  <div className={styles.formWrapper}>
    <h1 className={styles.title}>Register</h1>

    <form onSubmit={handleSubmit(handleClick)} className={styles.form}>
      <label className={styles.label}>First Name:</label>
      <input
        {...register("name")}
        className={styles.input}
        placeholder="Enter your name"
      />
      {errors.name && (
        <span className={styles.error}>{errors.name.message}</span>
      )}

      <label className={styles.label}>Address:</label>
      <input
        {...register("address")}
        className={styles.input}
        placeholder="Enter your address"
      />
      {errors.address && (
        <span className={styles.error}>{errors.address.message}</span>
      )}

      <label className={styles.label}>Email:</label>
      <input
        {...register("email")}
        className={styles.input}
        placeholder="Enter your Email"
      />
      {errors.email && (
        <span className={styles.error}>{errors.email.message}</span>
      )}

      <label className={styles.label}>Password:</label>
      <input
        {...register("password")}
        className={styles.input}
        placeholder="Enter your Password"
      />
      {errors.password && (
        <span className={styles.error}>{errors.password.message}</span>
      )}

      <label className={styles.label}>Confirm Password:</label>
      <input
        {...register("confirmPassword")}
        className={styles.input}
        placeholder="Confirm Password"
      />
      {errors.confirmPassword && (
        <span className={styles.error}>
          {errors.confirmPassword.message}
        </span>
      )}

      <label className={styles.label}>Profile Image</label>
      <input
        type="file"
        {...register("profileImage")}
        onChange={imageChange}
      />

      <div className={styles.imagePreview}>
        {img && (
          <img
            src={URL.createObjectURL(img)}
            alt="Preview"
            style={{
              width: 150,
              height: 150,
              objectFit: "cover",
              borderRadius: 10,
            }}
          />
        )}
      </div>

      {errors.profileImage && (
        <span className={styles.error}>
          {errors.profileImage.message}
        </span>
      )}

      <button type="submit" className={styles.button}>
        Register
      </button>
      <div className={styles.linkText}>
        <p>Already have an account?</p>
        <button
          type="button"
          onClick={() => router.push("/auth/signIn")}
          className={styles.button}
        >
          Log in
        </button>
      </div>
      
    </form>
  </div>
  </div>
);
}

