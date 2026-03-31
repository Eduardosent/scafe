import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types/api";

export const ProductTable = ({ products }: { products: Product[] }) => {
  console.log(products)
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="rounded-lg border border-neutral-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-neutral-50/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-10 px-4 font-bold text-neutral-400 tracking-wider uppercase text-[9px]">
                Producto
              </TableHead>
              <TableHead className="h-10 px-4 font-bold text-neutral-400 tracking-wider uppercase text-[9px]">
                Categoría
              </TableHead>
              <TableHead className="h-10 px-4 text-right font-bold text-neutral-400 tracking-wider uppercase text-[9px]">
                Precio
              </TableHead>
              <TableHead className="h-10 px-4 text-right font-bold text-neutral-400 tracking-wider uppercase text-[9px]">
                Fecha
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="hover:bg-neutral-50/40 transition-colors">
                <TableCell className="py-2 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-10 h-10 rounded-md object-cover border border-neutral-100 flex-shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-neutral-900 text-sm leading-none truncate">
                        {product.title}
                      </span>
                      <span className="text-neutral-400 text-[11px] mt-1 truncate max-w-[200px]">
                        {product.description}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-2 px-4">
                  <div className="flex gap-1.5 flex-wrap">
                    {product.categories?.map((cat) => (
                      <span
                        key={cat.id}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 font-medium border border-neutral-200/50"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="py-2 px-4 text-right font-semibold text-neutral-900 text-sm tabular-nums">
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell className="py-2 px-4 text-right text-neutral-400 text-[11px]">
                  {new Date(product.created_at).toLocaleDateString('es', { 
                    day: '2-digit', month: '2-digit', year: '2-digit' 
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};