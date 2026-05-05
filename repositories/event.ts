import { api, supabase } from "@/config";
import { Event, EventFilters, PaginatedResponse } from "@/types/api";

export const EventRepository = {
async getAll(filters?: EventFilters): Promise<PaginatedResponse<Event>> {
    try {
      const limit = filters?.limit || 10;
      const page = filters?.page || 1;
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      // 1. Base query con inner join
      let query = supabase
        .from('events')
        .select(`
          *,
          event_dates!inner (
            id,
            date,
            start_time,
            end_time
          )
        `, { count: 'exact' });

      // 2. Filtros
      if (filters?.title) {
        query = query.ilike('title', `%${filters.title}%`);
      }
      if (typeof filters?.is_free === 'boolean') {
        query = query.eq('is_free', filters.is_free);
      }

      // 3. Rango de fechas
      if (filters?.startDate) {
        query = query.gte('event_dates.date', filters.startDate);
      }
      if (filters?.endDate) {
        query = query.lte('event_dates.date', filters.endDate);
      }

      // 4. Ejecución
      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      const totalItems = count || 0;

      // Mapeo exacto a tu interfaz PaginatedResponse<T>
      return {
        data: (data as Event[]) || [],
        count: totalItems,
        currentPage: page,
        pageSize: limit,
        totalPages: Math.ceil(totalItems / limit)
      };
    } catch (error: any) {
      const message = error.message || 'Error al obtener eventos';
      throw new Error(message);
    }
  },
  
  async createEvent(request: any) {
    try {
      const formData = new FormData();

      // 1. Mapeo de campos básicos
      formData.append('title', request.title);
      formData.append('description', request.description);
      formData.append('is_free', String(request.is_free));
      formData.append('price', String(request.price));
      
      // Si capacity es null/undefined, no se envía para que el backend use el DEFAULT NULL de SQL
      if (request.capacity !== null && request.capacity !== undefined) {
        formData.append('capacity', String(request.capacity));
      }

      // 2. Procesamiento de Schedules (Array del calendario)
      // Se envía como string para que el endpoint haga el JSON.parse()
      formData.append('schedules', JSON.stringify(request.schedules));

      // 3. Procesamiento de Imágenes
      // Es vital usar el nombre "images" para formData.getAll("images")
      if (request.images && request.images.length > 0) {
        request.images.forEach((file: File | string) => {
          // Solo enviamos los Files nuevos; si hay strings (urls), el endpoint debe saber manejarlos
          formData.append('images', file);
        });
      }

      // 4. Envío al endpoint específico
      const { data } = await api.post('/api/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return data;
    } catch (error: any) {
      const message = error.response?.data?.error || error.message || 'Error al crear el evento';
      throw new Error(message);
    }
  },
};