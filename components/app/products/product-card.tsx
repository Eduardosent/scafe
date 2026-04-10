'use client';

import { ShoppingCart, Image as ImageIcon, Plus, Minus, Trash2 } from "lucide-react";
import { Product } from "@/types/api";
import { useCart } from "@/hooks"; // Asegúrate de que apunte a tu archivo de store

export const ProductCard = ({ product }: { product: Product }) => {
  const imageUrl = product.images?.[0];
  
  // Extraemos todo lo necesario del store
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  
  // Buscamos si el producto ya existe en el carrito
  const cartItem = cart.find((item) => item.id === product.id);
  const isInCart = Boolean(cartItem);

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition-all hover:border-gray-200 hover:shadow-sm">
      {/* 1. Imagen Cuadrada */}
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={product.title} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300">
            <ImageIcon size={32} />
          </div>
        )}
        
        {/* Badge de Categoría */}
        <div className="absolute left-2 top-2">
          {product.categories?.slice(0, 1).map((cat) => (
            <span key={cat.id} className="rounded-md bg-black/80 px-2 py-0.5 text-[9px] font-medium uppercase text-white backdrop-blur-sm">
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Información y Controles Dinámicos */}
      <div className="flex flex-col gap-3 p-3">
        <div className="space-y-1">
          <h3 className="line-clamp-1 text-[11px] font-semibold uppercase text-gray-900 tracking-tight">
            {product.title}
          </h3>
          <p className="text-base font-black text-gray-950 leading-none">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {isInCart ? (
          <div className="flex items-center gap-2">
            {/* Controles de Cantidad (+ / -) */}
            <div className="flex flex-1 items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-1">
              <button 
                onClick={() => updateQuantity(product.id, -1)}
                className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-gray-600 shadow-sm hover:bg-gray-100 transition-colors"
              >
                <Minus size={14} />
              </button>
              
              <span className="text-xs font-bold text-gray-900">
                {cartItem?.quantity}
              </span>

              <button 
                onClick={() => updateQuantity(product.id, 1)}
                className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-gray-600 shadow-sm hover:bg-gray-100 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Botón Eliminar (Remove) */}
            <button 
              onClick={() => removeFromCart(product.id)}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              title="Quitar del carrito"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ) : (
          /* Botón Add to Cart inicial */
          <button 
            onClick={() => addToCart(product)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-black py-2.5 text-[10px] font-bold uppercase text-white transition-colors hover:bg-gray-800 active:scale-[0.98]"
          >
            <ShoppingCart size={14} />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};