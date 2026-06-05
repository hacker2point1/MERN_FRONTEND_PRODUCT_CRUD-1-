import AxiosInstance from "@/api/axios/axios"
import { endpoints } from "@/api/endpoints/endpoints"
import axios from "axios";




export const getProduct = async () => {
  try {
    const response = await AxiosInstance.get(
      endpoints.product.getAllProduct
    );
    return response.data.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Failed to fetch products",);
    } else {
      console.error("Failed to fetch products", err);
    }
    
    return null;
  }
};
export const editProduct = async (
  id: string,
  data
) => {
  return AxiosInstance.patch(
    `/api/v1/update/product/${id}`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
export const createProduct = async (data: FormData) => {
  return AxiosInstance.post(`/api/v1/create/product`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const deleteProduct = async(id:string)=>{
  const url = endpoints.product.deleteProduct.replace(":id", id);
  return AxiosInstance.delete(url);
}
export const softDelete =async(id:string)=>{
  const url = endpoints.product.softDeleteProduct.replace(":id", id);
  return AxiosInstance.post(url);
}


export const getSingleProduct = async (id: string) => {
  const response = await AxiosInstance.get(`/api/v1/get/single-products/${id}`);
  return response.data.data;
};

export const searchProducts = async (keyword: string) => {
  try {
    const q = encodeURIComponent(keyword);
    const url = `${endpoints.product.searchProduct}?keyword=${q}`;
    const response = await AxiosInstance.get(url);
    return response.data.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Failed to search products");
    } else {
      console.error("Failed to search products", err);
    }
    return null;
  }
};
