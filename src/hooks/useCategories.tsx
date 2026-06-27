import { categoriesApi } from '@/lib/apiClient';
import { useQuery } from '@tanstack/react-query';
import type { Category, Product } from '@/types/types';

export const useGetAllCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await categoriesApi.list();
      const data = response.data as { categories?: Category[] } | Category[];

      if (data && !Array.isArray(data) && Array.isArray(data.categories)) {
        return data.categories;
      }

      if (Array.isArray(data)) {
        return data;
      }
      throw new Error('Failed to fetch categories: Invalid response format');
    },
  });
};

export const useGetProductsCategoryById = (categoryId: number, options?: { enabled?: boolean }) => {
  return useQuery<Product[], Error>({
    ...options,
    queryKey: ['products', categoryId],
    queryFn: async () => {
      const response = await categoriesApi.getById(categoryId);
      const data = response.data as { products?: Product[] };
      if (data && Array.isArray(data.products)) {
        return data.products;
      }
      throw new Error('Failed to fetch products: Invalid response format');
    },
  });
};
