import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Store } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navItems = [
    { name: 'Productos', href: '/products', icon: <Store size={22} /> },
    { name: 'Carrito', href: '/cart', icon: <ShoppingCart size={22} /> },
  ];

  return (
    <div className="flex h-screen bg-white text-black antialiased">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-black/10">
        {/* Contenedor del Logo: Alineado a la izquierda y pequeño */}
        <div className="p-6 pb-2 flex items-center justify-start">
          <Link href="/" className="block">
            <Image 
              src="/logo.jpg" 
              alt="Sendero Café" 
              width={100} 
              height={100} 
              priority
              className="object-contain h-auto w-24" // Forzado a 96px de ancho
            />
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 pt-4">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center gap-4 p-3 hover:bg-black hover:text-white transition-colors duration-200 group"
            >
              {item.icon}
              <span className="text-sm font-medium uppercase tracking-widest">{item.name}</span>
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
              className="object-contain h-auto w-16" // Forzado a 64px de ancho
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
              className="flex flex-col items-center justify-center text-black/60 hover:text-black"
            >
              {item.icon}
              <span className="text-[10px] uppercase mt-1 tracking-tighter font-bold">{item.name}</span>
            </Link>
          ))}
        </nav>
      </main>
    </div>
  );
};

export default Layout;