'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Store } from 'lucide-react';
import { useCart } from '@/hooks';

// Componente para el círculo con el número
const CartBadge = () => {
  const cart = useCart((state) => state.cart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const totalUniqueProducts = cart.length;

  if (!mounted || totalUniqueProducts === 0) return null;

  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white group-hover:bg-white group-hover:text-black transition-colors">
      {totalUniqueProducts}
    </span>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navItems = [
    { name: 'Productos', href: '/products', icon: <Store size={22} /> },
    { name: 'Carrito', href: '/cart', icon: <ShoppingCart size={22} />, isCart: true },
  ];

  return (
    <div className="flex h-screen bg-white text-black antialiased">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-black/10">
        <div className="p-6 pb-2 flex items-center justify-start">
          <Link href="/" className="block">
            <Image 
              src="/logo.jpg" 
              alt="Sendero Café" 
              width={100} 
              height={100} 
              priority
              className="object-contain h-auto w-24"
            />
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 pt-4">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center p-3 hover:bg-black hover:text-white transition-colors duration-200 group"
            >
              <div className="flex items-center gap-4 mr-2">
                {item.icon}
                <span className="text-sm font-medium uppercase tracking-widest">{item.name}</span>
              </div>
              {item.isCart && <CartBadge />}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Header - Mobile */}
        <header className="md:hidden px-6 py-3 border-b border-black/5 flex items-center justify-start bg-white">
          <Link href="/" className="block">
            <Image 
              src="/logo.jpg" 
              alt="Sendero Café" 
              width={80} 
              height={80} 
              priority
              className="object-contain h-auto w-16"
            />
          </Link>
        </header>

        <section className="flex-1 overflow-y-auto p-6 md:p-12 pb-24 md:pb-12 text-black">
          {children}
        </section>

        {/* Bottom Nav - Mobile */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/10 h-16 flex items-center justify-around px-6 z-50 text-black">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="relative flex flex-col items-center justify-center text-black/60 hover:text-black"
            >
              <div className="relative">
                {item.icon}
                {item.isCart && (
                  <div className="absolute -top-2 -right-2 scale-75">
                    <CartBadge />
                  </div>
                )}
              </div>
              <span className="text-[10px] uppercase mt-1 tracking-tighter font-bold">{item.name}</span>
            </Link>
          ))}
        </nav>
      </main>
    </div>
  );
};

export default Layout;