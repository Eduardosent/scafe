import { api } from "@/config";

export const EventRepository = {
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