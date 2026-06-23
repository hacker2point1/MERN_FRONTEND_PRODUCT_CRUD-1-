import AxiosInstance from "@/api/axios/axios";
import { endpoints } from "@/api/endpoints/endpoints";
import axios from "axios";

//create the product
export const createProduct = async (data: FormData) => {
  // Let the browser set the Content-Type (including boundary) for FormData
  return AxiosInstance.post(`/api/v1/create/product`, data);
};

//get the all product
export const getProduct = async () => {
  
  try {
    const response = await AxiosInstance.get(endpoints.product.getAllProduct);
    return response.data.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Failed to fetch products");
    } else {
      console.error("Failed to fetch products", err);
    }

    return null;
  }
};

//get the single product
export const getSingleProduct = async (id: string) => {
  const response = await AxiosInstance.get(`/api/v1/get/single-products/${id}`);
  return response.data.data;
};

//edit / update the product
export const editProduct = async (id: string, data) => {
  // Let the browser set Content-Type for FormData
  return AxiosInstance.patch(`/api/v1/update/product/${id}`, data);
};

//perform soft - delete for the product
export const softDelete = async (id: string) => {
  const url = endpoints.product.softDeleteProduct.replace(":id", id);
  return AxiosInstance.post(url);
};
//delete the product
export const deleteProduct = async (id: string) => {
  const url = endpoints.product.deleteProduct.replace(":id", id);
  return AxiosInstance.delete(url);
};

// get soft-deleted products (backend may expose different path)
export const getDeletedProducts = async () => {
  try {
    // common candidate endpoint; backend may use a different route
    const url = "/api/v1/get/deleted-products";
    const response = await AxiosInstance.get(url);
    const payload = response.data;
    
    if (Array.isArray(payload.data)) return payload.data;
   

    console.warn("getDeletedProducts: unexpected response shape", payload);
    return null;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Failed to fetch deleted products", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
    } else {
      console.error("Failed to fetch deleted products", err);
    }
    return null;
  }
};

// restore a soft-deleted product
export const restoreProduct = async (id: string) => {
  const url = `/api/v1/restore/${id}`;
  console.log("restoreProduct: POST", url);
  try {
    const res = await AxiosInstance.post(url);
    console.debug("restoreProduct: response", { status: res.status, data: res.data });
    return res;
  } catch (err) {
    console.error("restoreProduct: request failed", err);
    throw err;
  }
};

//search and filter operation in to the product
export const searchProducts = async (
  keyword: string,
  filters?: { color?: string; size?: string },
) => {
  try {
    const params = new URLSearchParams();
    if (keyword && keyword.trim()) params.append("keyword", keyword);
    const appendMulti = (key: string, value?: string) => {
      if (!value) return;
      const parts = value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      parts.forEach((p) => params.append(key, p));
    };

    appendMulti("color", filters?.color);
    appendMulti("size", filters?.size);
    appendMulti("brand", (filters as any)?.brand);

    const query = params.toString();
    const url = query
      ? `${endpoints.product.searchProduct}?${query}`
      : endpoints.product.searchProduct;

    console.debug("searchProducts: requesting URL", url);
    const response = await AxiosInstance.get(url);
    console.debug("searchProducts: response", {
      status: response.status,
      data: response.data,
    });
    return response.data.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Failed to search products", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
    } else {
      console.error("Failed to search products", err);
    }
    return null;
  }
};
