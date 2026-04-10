'use client';

import React from 'react';
import { useCart } from '@/hooks';
import { ProductCard } from '@/components/app/products';

export default function CartPage() {
  const { cart } = useCart();

  return (
    <div className="flex flex-col gap-8 mx-auto">
      
      {/* Título simple sin filtros */}
      <div className="border-b border-gray-50 pb-6">
        <h1 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900">
          Productos en Carrito ({cart.length})
        </h1>
      </div>

      {/* Lista puramente basada en el arreglo del carrito */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {cart.length > 0 ? (
          cart.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))
        ) : (
          <div className="col-span-full py-32 flex flex-col items-center opacity-20">
            <p className="text-[10px] font-black uppercase tracking-widest">
              Carrito vacío
            </p>
          </div>
        )}
      </div>

      {/* Resumen de Pago */}
      {cart.length > 0 && (
        <div className="flex justify-end border-t border-gray-50 pt-8">
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-black uppercase text-gray-400">Total</span>
            <span className="text-2xl font-black text-black">
              ${cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}