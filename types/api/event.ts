export interface EventDate {
  id: string;
  date: string;       // Formato 'YYYY-MM-DD'
  start_time: string; // Formato 'HH:mm:ss'
  end_time: string;   // Formato 'HH:mm:ss'
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  images: string[];   // Array de rutas/URLs
  is_free: boolean;
  price: number;
  capacity: number | null;
  registrations: number;
  created_at: string; // ISO Timestamp
  
  // Relación con la tabla event_dates
  event_dates: EventDate[];
}

export interface EventFilters {
  title?: string;
  is_free?: boolean;
  startDate: string | null; // Formato YYYY-MM-DD
  endDate: string | null;   // Formato YYYY-MM-DD
  page?: number;
  limit?: number;
}