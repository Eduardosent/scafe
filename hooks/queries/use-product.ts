import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductRepository } from "@/repositories";
import { ProductFormValues } from "@/types/forms/product";
import { toast } from "sonner";
import { ProductFilters } from "@/types/api";
import { useCategories } from "./use-category";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProductFormValues) => ProductRepository.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Producto creado con éxito");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
};

export const useProducts = (filters?: ProductFilters) => {
  const { data: allCategories } = useCategories();
  return useQuery({
    queryKey: ["products", filters], 
    queryFn: () => ProductRepository.getAll(filters),
    placeholderData: (previousData) => previousData,
    select: (products) => {
      if (!products) return [];
      if (!allCategories) return products.map(p => ({ ...p, categories: [] }));
      return products.map((product) => ({
        ...product,
        categories: allCategories.filter((cat) => 
          product.category_ids?.includes(cat.id)
        ),
      }));
    },
  });
};