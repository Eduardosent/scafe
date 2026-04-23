// app/menu/page.tsx

import { TextParis } from "@/components/ui";

type MenuItem = {
  nombre: string;
  precio: number;
  descripcion?: string;
};

const menuItems: MenuItem[] = [
  {
    nombre: "Café de Montaña",
    precio: 4.50,
    descripcion: "Tueste medio, notas a chocolate y caramelo. Origen local.",
  },
  {
    nombre: "Té de Hierbas Silvestres",
    precio: 3.80,
    descripcion: "Infusión con menta, toronjil y hierbabuena.",
  },
  {
    nombre: "Pastel de Zanahoria",
    precio: 5.20,
    descripcion: "Con nueces y glaseado de queso crema.",
  },
  {
    nombre: "Sandwich Campestre",
    precio: 8.90,
    descripcion: "Pan artesanal, pollo deshebrado, aguacate y vegetales frescos.",
  },
  {
    nombre: "Limonada con Jengibre",
    precio: 4.20,
    descripcion: "",
  },
  {
    nombre: "Espresso Doble",
    precio: 3.50,
    descripcion: "Intenso y cremoso. 100% arábica.",
  },
];

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        {/* Badge actualización diaria */}
        <div className="flex justify-center my-8">
          <div className="inline-block bg-amber-900/30 border border-amber-700/50 rounded-full px-4 py-1.5 backdrop-blur-sm">
            <TextParis className="text-xs text-amber-300 tracking-wide">
              ✨ Menú actualizado diariamente ✨
            </TextParis>
          </div>
        </div>

        {/* Cuadro del menú - estilo vidrio oscuro */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="border-b border-white/10 bg-white/5 px-6 py-5">
            <TextParis className="text-xl font-semibold text-white">
              Menú del día
            </TextParis>
            <TextParis className="text-sm text-white/60 mt-1">
              Selección fresca para tu experiencia en la montaña
            </TextParis>
          </div>

          {/* Lista de platillos */}
          <div className="divide-y divide-white/10">
            {menuItems.map((item, index) => (
              <div key={index} className="px-6 py-5 hover:bg-white/5 transition-colors">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <TextParis className="text-base font-medium text-white">
                      {item.nombre}
                    </TextParis>
                    {item.descripcion && (
                      <TextParis className="text-sm text-white/50 mt-1">
                        {item.descripcion}
                      </TextParis>
                    )}
                  </div>
                  <div className="shrink-0">
                    <TextParis className="text-base font-semibold text-amber-400">
                      ${item.precio.toFixed(2)}
                    </TextParis>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 bg-white/5 px-6 py-4">
            <TextParis className="text-xs text-white/40 text-center">
              Los precios incluyen impuestos · Consulta por opciones veganas
            </TextParis>
          </div>
        </div>
      </div>
    </div>
  );
}