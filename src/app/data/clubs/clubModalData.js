/**
 * @file clubModalData.js
 * @description View Model (DTO) para el componente ClubPreviewModal.
 * Este archivo actúa como un "traductor". Toma la data técnica de los clubes
 * y la convierte en data amigable para la interfaz visual.
 */

import { VIDEOJUEGOS_CLUBS } from "./ClubsDasboard/videojuegos";
import { ALL_MOCK_USERS } from "@/app/data/users/userData";

/** 
 * @description EL CLUB BASE
 * Seleccionamos un club del catálogo para previsualizarlo en el modal.
 * Actualmente fijado en Cyberpunk 2077 para pruebas.
 */
const BASE_CLUB = VIDEOJUEGOS_CLUBS[4]; 

/** 
 * @description EL DUEÑO ENCONTRADO
 * Buscamos en la lista global de usuarios (ALL_MOCK_USERS) a aquel cuyo 
 * uuid coincida con el ownerUuid guardado en el club.
 * @type {import("../users/userData").GlobalUser | undefined}
 */
const owner = ALL_MOCK_USERS.find(user => user.uuid === BASE_CLUB.ownerUuid);

/** 
 * @description CREADOR FORMATEADO
 * Un objeto limpio que contiene solo el nombre y avatar del dueño.
 * Si no encontramos al dueño, usamos datos de respaldo (fallback) para que no rompa la app.
 */
const resolvedCreator = {
  name: owner ? `${owner.first_name} ${owner.last_name}` : "Usuario Desconocido",
  avatar: owner ? owner.avatar : "https://api.dicebear.com/7.x/avataaars/svg?seed=Unknown",
};

/** 
 * @description DATA FINAL PARA EL MODAL (CLUB_MODAL_DATA)
 * Este es el objeto que el componente ClubPreviewModal.jsx importa y usa.
 * Combina datos originales del catálogo con los datos dinámicos que calculamos arriba.
 */
export const CLUB_MODAL_DATA = {
  title: BASE_CLUB.title,
  verified: BASE_CLUB.Verified,
  logo: BASE_CLUB.Logo,
  image: BASE_CLUB.image,
  description: BASE_CLUB.description,
  members: BASE_CLUB.members,
  online: BASE_CLUB.online,
  
  // Datos inventados o calculados
  tags: [BASE_CLUB.tag, "Destacado", "Comunidad"],
  createdAt: BASE_CLUB.createdAt || "2023",
  creator: resolvedCreator,
};
