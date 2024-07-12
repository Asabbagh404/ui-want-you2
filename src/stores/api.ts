import { defineStore } from "pinia";
import { useQuery } from "@/utils/useQuery";

const API_URL = import.meta.env.VITE_API_URL as string;
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const useApi = defineStore("api", () => {
  const products = useQuery<Product[]>("products", async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await fetch(API_URL + "/products");
    return response.json();
  });

  const product = useQuery<Product>("currentProduct", async (id: number) => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
  });

  return {
    products,
    product
  };
});
