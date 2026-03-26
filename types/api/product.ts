export interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  category_ids: string[]; // Array de UUIDs
  images: string[];       // Array de URLs de R2
  created_at: string;     // ISO Timestamp
}