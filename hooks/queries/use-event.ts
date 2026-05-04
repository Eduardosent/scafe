import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EventRepository } from '@/repositories';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const useCreateEvent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: any) => EventRepository.createEvent(request),
    onSuccess: (response) => {
      toast.success('Evento Creado', {
        description: 'El evento ha sido publicado exitosamente.',
      });
      
      // Invalidamos la caché de eventos (aunque aún no tengas el GET, es buena práctica)
      queryClient.invalidateQueries({ queryKey: ['events'] });
      
      // Redirección a la lista de eventos
      router.push('/events');
    },
    onError: (error: any) => {
      console.error("Mutation Error:", error);
      toast.error('Error al enviar', {
        description: error.message
      });
    },
  });
};