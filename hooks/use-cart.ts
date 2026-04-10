import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/api';

// Definición clara de la estructura: Producto + Cantidad
interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, amount: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      cart: [],

      // Agrega el producto como un objeto único con quantity: 1
      addToCart: (product) =>
        set((state) => {
          const isProductInCart = state.cart.some((item) => item.id === product.id);
          
          if (isProductInCart) return state; // Si ya existe, no hacemos nada (la card manejará el updateQuantity)

          return { 
            cart: [...state.cart, { ...product, quantity: 1 }] 
          };
        }),

      // Elimina el objeto completo del arreglo
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      // Modifica la propiedad 'quantity' del objeto específico dentro del arreglo
      updateQuantity: (productId, amount) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.max(1, item.quantity + amount) }
              : item
          ),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    { name: 'cart-storage' }
  )
);