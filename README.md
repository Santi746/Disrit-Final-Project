src/
├── shared/ <-- ¡EL HUB GLOBAL!
│ ├── components/ # UI (Átomos/Moléculas globales como Badge o Button)
│ ├── hooks/ # Lógica reutilizable (Detector de móvil, scroll, AOS)
│ ├── context/ # Estados globales (Navegación, Canal Abierto)
│ └── utils/ # Funciones de ayuda (Slugify)
│
├── features/ # EL CEREBRO (Chat, Clubs, Dashboard, Users)
│
└── app/ # EL MAPA (Solo rutas: ClubPage, page.js, layout.js)

---

## 🛑 BACKEND MIGRATION CHECKLIST (Reglas Vyne)

Cuando conectemos PostgreSQL + Laravel (Reverb), debemos cumplir con estas directivas obligatorias para mantener la escalabilidad:

- [ ] **React Query:** Instalar `@tanstack/react-query`. Prohibido usar `useState` o llamadas estáticas directas para datos. Toda la UI debe leer de la caché.
- [ ] **UUID Cliente (Bomba Atómica):** El frontend DEBE generar un UUID (`uuidv4`) al crear un mensaje e inyectarlo en la caché antes de enviar al backend. Laravel usará ese ID para evitar duplicación.
- [ ] **Paginación Infinita (Sin Offsets):** Las listas de mensajes o clubes deben cargarse mediante `useInfiniteQuery` pasando un `cursor` (ej. último UUID), nunca usando el `offset` tradicional.
- [ ] **Broadcasting Minimalista:** Asegurar que los listeners (Laravel Echo) en el front no muten el estado de React localmente, sino que modifiquen la caché centralizada de React Query.

# TEST ANTIGRAVITY UI

notas para laravel

⚠️ 2. Alertas Tempranas para la Integración con el Backend (Laravel + PostgreSQL)
Lo que acabamos de hacer en el frontend impone restricciones estrictas sobre cómo debes programar tu backend. Toma nota para cuando abras Laravel:

Alerta A: El Orden del Payload (CRÍTICO)
Nuestro frontend ahora utiliza flex-col-reverse y asume una línea temporal estricta. En Laravel, cuando hagas tu consulta a PostgreSQL, debes asegurarte de que cada "paquete" de 20 mensajes llegue en orden cronológico (del más viejo al más nuevo dentro de ese paquete). Si Laravel te devuelve los mensajes al revés (del más nuevo al más viejo), nuestra función .reverse() en page.js fallará y los mensajes se leerán de abajo hacia arriba.

En Laravel debes usar: $query->orderBy('created_at', 'asc') antes de paginar.
Alerta B: El Cursor String
En useChatMessages.js, configuraste pageParam como un UUID (string). Laravel 11 tiene el método cursorPaginate(), pero por defecto usa un hash opaco. Tendrás que configurar Laravel para que la paginación por cursor entienda que estás usando la columna uuid (y no el id autoincremental) para filtrar los mensajes anteriores a esa fecha/ID.

Alerta C: Eventos Reverb (Broadcasting)
Nuestra UI inversa asume que los mensajes nuevos se apilan en el índice 0 de la page[0]. Cuando configures el listener de Laravel Echo (window.Echo.private(...)), la función que actualice la caché deberá hacer exactamente la misma inyección que hicimos en el useMutateChatMessages.js (añadiéndolo al final de pages[0].messages).
