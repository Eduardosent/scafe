interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category_ids: string[];
  images: string[];
  created_at: string;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: '01',
    title: 'Café de Especialidad - Bourbon',
    description: 'Notas de chocolate y caramelo de San Juan Talpa.',
    price: 18.50,
    category_ids: ['Café', 'Grano'],
    images: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=400&auto=format&fit=crop'],
    created_at: '2026-03-20T10:00:00Z'
  },
  {
    id: '02',
    title: 'Prensa Francesa',
    description: 'Acero inoxidable, capacidad 800ml.',
    price: 35.00,
    category_ids: ['Accesorios'],
    images: ['https://images.unsplash.com/photo-1544190153-060cb6bb3a0a?q=80&w=400&auto=format&fit=crop'],
    created_at: '2026-03-22T14:30:00Z'
  }
];

export const ProductTable = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10">
      <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-sm">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50/50">
              <th className="text-left py-4 px-6 font-bold text-neutral-400 tracking-widest uppercase text-[10px]">
                Producto
              </th>
              <th className="text-left py-4 px-6 font-bold text-neutral-400 tracking-widest uppercase text-[10px]">
                Categoría
              </th>
              <th className="text-right py-4 px-6 font-bold text-neutral-400 tracking-widest uppercase text-[10px]">
                Precio
              </th>
              <th className="text-right py-4 px-6 font-bold text-neutral-400 tracking-widest uppercase text-[10px]">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {MOCK_PRODUCTS.map((product) => (
              <tr key={product.id} className="hover:bg-neutral-50/40 transition-colors">
                <td className="py-5 px-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-12 h-12 rounded-lg object-cover border border-neutral-100 shadow-sm flex-shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-neutral-900 leading-tight truncate">
                        {product.title}
                      </span>
                      <span className="text-neutral-400 text-xs mt-1 max-w-[320px] truncate">
                        {product.description}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-5 px-6">
                  <div className="flex gap-2 flex-wrap">
                    {product.category_ids.map((cat) => (
                      <span
                        key={cat}
                        className="inline-block text-[11px] px-2.5 py-0.5 rounded-full bg-orange-100/40 text-orange-800 font-medium border border-orange-200/20"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-5 px-6 text-right font-bold text-neutral-900 tabular-nums">
                  ${product.price.toFixed(2)}
                </td>
                <td className="py-5 px-6 text-right text-neutral-400 text-xs font-medium">
                  {new Date(product.created_at).toLocaleDateString('es', { 
                    day: '2-digit', month: 'short', year: 'numeric' 
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};