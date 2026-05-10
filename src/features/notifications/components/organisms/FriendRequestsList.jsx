import React, { useEffect, useRef } from "react";
import { useMockFriendRequests } from "../../hooks/useMockFriendRequests";
import { useMutateFriendRequests } from "../../hooks/useMutateFriendRequests";
import FriendRequestCard from "../molecules/FriendRequestCard";
import { Loader2 } from "lucide-react";

/**
 * @component FriendRequestsList
 * @description Organismo que renderiza la lista de solicitudes de amistad con scroll infinito.
 * Sigue el Protocolo Vyne de mutaciones y estado del servidor.
 */
export default function FriendRequestsList() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMockFriendRequests();
  
  const { mutate: respondRequest } = useMutateFriendRequests();
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  /**
   * Maneja las acciones de aceptar/rechazar delegando al hook de mutación (Protocolo Vyne).
   */
  const handleAction = (requestUuid, action) => {
    respondRequest({ requestUuid, action });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-forest-muted" size={32} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-forest-danger mt-10">
        <p>Error al cargar las solicitudes.</p>
      </div>
    );
  }

  const requests = data?.pages.flatMap((page) => page.requests) || [];

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-forest-muted">
        <div className="w-16 h-16 rounded-full bg-forest-stat/50 flex items-center justify-center mb-4">
          <Loader2 className="text-forest-muted/50" size={32} />
        </div>
        <p className="text-sm font-medium">No tienes notificaciones pendientes.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {requests.map((request) => (
        <FriendRequestCard 
          key={request.uuid} 
          request={request} 
          onAction={handleAction} 
        />
      ))}
      
      {/* Elemento observador para IntersectionObserver */}
      <div ref={observerRef} className="h-10 flex items-center justify-center mt-4">
        {isFetchingNextPage && (
          <Loader2 className="animate-spin text-forest-muted" size={24} />
        )}
      </div>
    </div>
  );
}
