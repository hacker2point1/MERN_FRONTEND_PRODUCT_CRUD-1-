export interface Product {
  _id: string;
  name: string;
  description: string;
  shortDescription?: string;
  brand: string;
  category: string;
  price: number;
  discountPrice?: number;
  currency?: string;
  images?: {
    url: string;
  }[];
}