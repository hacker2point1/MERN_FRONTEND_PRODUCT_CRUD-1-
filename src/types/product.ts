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
  color:string;
  size:string;
  images?: {
    url: string;
  }[];
}