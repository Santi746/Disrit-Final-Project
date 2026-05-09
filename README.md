src/
├── shared/           <-- ¡EL HUB GLOBAL!
│   ├── components/   # UI (Átomos/Moléculas globales como Badge o Button)
│   ├── hooks/        # Lógica reutilizable (Detector de móvil, scroll, AOS)
│   ├── context/      # Estados globales (Navegación, Canal Abierto)
│   └── utils/        # Funciones de ayuda (Slugify)
│
├── features/         # EL CEREBRO (Chat, Clubs, Dashboard, Users)
│
└── app/              # EL MAPA (Solo rutas: ClubPage, page.js, layout.js)

---

## 🛑 BACKEND MIGRATION CHECKLIST (Reglas Vyne)

Cuando conectemos PostgreSQL + Laravel (Reverb), debemos cumplir con estas directivas obligatorias para mantener la escalabilidad:

- [ ] **React Query:** Instalar `@tanstack/react-query`. Prohibido usar `useState` o llamadas estáticas directas para datos. Toda la UI debe leer de la caché.
- [ ] **UUID Cliente (Bomba Atómica):** El frontend DEBE generar un UUID (`uuidv4`) al crear un mensaje e inyectarlo en la caché antes de enviar al backend. Laravel usará ese ID para evitar duplicación.
- [ ] **Paginación Infinita (Sin Offsets):** Las listas de mensajes o clubes deben cargarse mediante `useInfiniteQuery` pasando un `cursor` (ej. último UUID), nunca usando el `offset` tradicional.
- [ ] **Broadcasting Minimalista:** Asegurar que los listeners (Laravel Echo) en el front no muten el estado de React localmente, sino que modifiquen la caché centralizada de React Query.

# GIT TEST: SI VES ESTO, GIT FUNCIONA.

