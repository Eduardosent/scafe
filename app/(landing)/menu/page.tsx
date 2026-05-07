import Image from 'next/image';
import { TextParis } from '@/components/ui';

const menuItems = [
  { name: "Espresso", image: "/galery-1.jpg" },
  { name: "Croissant", image: "/galery-2.jpg" },
  { name: "Cappuccino", image: "/galery-3.jpg" },
  { name: "Blueberry Muffin", image: "/galery-4.jpg" },
  { name: "Latte Art", image: "/galery-5.jpg" },
  { name: "Pain au Chocolat", image: "/galery-6.jpg" },
  { name: "Cold Brew", image: "/galery-7.jpg" },
  { name: "Avocado Toast", image: "/galery-8.jpg" }
];

const extraMenu = [
  {
    category: "Pinchos",
    items: ["meat pinchos on white steamed jasmine rice"]
  },
  {
    category: "Vietnamese-esque bun",
    items: ["noodles, meat, special sauce and skewers"]
  },
  {
    category: "Drinks",
    items: [
      "dalgonatte", "batido de coco", "batido de aguacate", "batido de guineo",
      "matcha", "taro smoothie", "thai tea", "thai tea smoothie", "meganade",
      "green giant", "limonada gaseosa", "pepino", "american coffee",
      "capuccino", "latte", "black milk tea", "jasmine tea", "oolong tea", "rooibos tea"
    ]
  },
  {
    category: "Postres",
    items: [
      "palomitas", "empanadas", "quesadilla", "brownie",
      "blonde", "picuda", "flan", "waffle con sorbete", "nuegados"
    ]
  },
  {
    category: "Other ideas",
    items: ["egg on paper roll", "burger taco"]
  }
];

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <header className="text-center mb-16 px-6">
        <TextParis as="h1" className="text-5xl md:text-8xl tracking-tighter leading-none font-light text-white uppercase">
          Our Menu
        </TextParis>
        <TextParis className="mt-4 text-white/40 text-lg md:text-xl tracking-widest font-light">
          Nuestros platillos varían diariamente
        </TextParis>
      </header>

      {/* Galería de Imágenes Existente */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-white/10">
        {menuItems.map((item, i) => (
          <div key={i} className="relative aspect-square border-r border-b border-white/10 group">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover brightness-[0.6] transition-all duration-500 group-hover:brightness-90"
            />
            <div className="absolute inset-0 flex items-end p-6 pointer-events-none">
              <TextParis className="text-white text-3xl md:text-5xl tracking-tighter uppercase leading-[0.75]">
                {item.name}
              </TextParis>
            </div>
          </div>
        ))}
      </div>

      {/* Nueva Sección de Menú en Cards Color Crema */}
      <section className="w-full py-20 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {extraMenu.map((section, idx) => (
            <div 
              key={idx} 
              style={{ backgroundColor: '#E6D5B8' }}
              className="w-[300px] p-8 rounded-[2rem] shadow-2xl flex flex-col items-center rounded-xl"
            >
              <TextParis className="text-[#1a1a1a] text-5xl mb-6 text-center">
                {section.category.charAt(0).toUpperCase() + section.category.slice(1).toLowerCase()}
              </TextParis>
              
              <div className="flex flex-col gap-3 w-full">
                {section.items.map((item, i) => (
                  <p key={i} className="text-[#333] text-xl text-left lowercase leading-tight border-b border-black/5 pb-1">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}