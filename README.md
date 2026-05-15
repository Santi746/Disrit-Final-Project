# 🚀 Vyne: Mensajería en Tiempo Real de Alta Escalabilidad

![Vyne Banner](/public/vyne_banner.png)

**Vyne** es una plataforma de mensajería premium en tiempo real, diseñada para soportar escala masiva. Construida bajo una mentalidad de "Escalabilidad Primero", emula los patrones de alto rendimiento de plataformas como Discord, garantizando un flujo de datos atómico y experiencias de usuario con latencia cero.

> [!IMPORTANT]
> Este repositorio contiene la capa de **Frontend**. Está arquitectónicamente preparado para integrarse de forma fluida con un backend de alto rendimiento en Laravel 11 + Reverb (WebSockets) + PostgreSQL.

---

## 🛠️ Stack Tecnológico

- **Core:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Estado y Datos:** [TanStack Query v5](https://tanstack.com/query/latest) (React Query)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Tiempo Real:** [Laravel Echo](https://laravel.com/docs/11.x/broadcasting) & WebSockets
- **Arquitectura:** Diseño Modular orientado a Funcionalidades (Feature-Sliced Design)

---

## 🏗️ Filosofía Arquitectónica (Las Reglas de Oro)

Para asegurar que Vyne pueda manejar miles de usuarios y mensajes simultáneos sin degradación, el frontend sigue mandatos arquitectónicos estrictos:

### 1. React Query como "Única Fuente de la Verdad"
Está prohibido el uso de `useState` para datos del servidor (mensajes, listas de usuarios, clubes). Todos los componentes consumen datos directamente de la caché de React Query. Esto previene la desincronización del estado y garantiza un flujo de datos unificado.

### 2. El Patrón "UUID de Cliente" (Deduplicación)
Para evitar la "Bomba Atómica" de las condiciones de carrera (Race Conditions), cada mensaje genera un `client_uuid` en el frontend **antes** de enviarse al servidor.
- **Update Optimista:** El mensaje se inyecta en la caché instantáneamente con estado `status: 'sending'`.
- **Reconciliación por WebSocket:** Cuando el servidor retransmite el mensaje, el cliente lo identifica por su UUID. En lugar de duplicarlo, simplemente actualiza el estado a `sent`.

### 3. Paginación Obligatoria por Cursores
La paginación tradicional por `offset/limit` está prohibida. Vyne utiliza **Paginación por Cursor** (`useInfiniteQuery`) para asegurar que la llegada de nuevos mensajes no desplace la ventana de datos, evitando duplicados o saltos de información.

### 4. Mutaciones Atómicas
Todas las mutaciones (`useMutation`) implementan un ciclo de vida de 3 fases:
- **`onMutate`**: Feedback instantáneo en la UI (Update Optimista).
- **`onError`**: Reversión automática de la caché a la última "verdad" conocida.
- **`onSettled`**: Sincronización silenciosa en segundo plano.

---

## 📂 Estructura del Proyecto

```text
src/
├── app/          # Capa de enrutamiento (Next.js App Router)
├── features/     # Módulos de lógica de negocio (Chat, Clubs, Auth, Users)
│   ├── [feature]/
│   │   ├── components/ # UI específica del módulo
│   │   ├── hooks/      # Hooks de React Query y lógica
│   │   ├── services/   # Capa de abstracción de API
│   │   └── data/       # Datos mock y esquemas
├── shared/       # Componentes UI globales, Contextos y Utilidades
└── services/     # Cliente API global y configuración de WebSockets
```

---

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+
- npm / yarn / pnpm

### Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/vyne-frontend.git
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

---

## ⚖️ Directivas de Escalabilidad

Cualquier contribución a este proyecto **debe** cumplir con lo siguiente:

- **Convención de Nombres:** Todos los datos de API (peticiones/respuestas) deben usar `snake_case` para mantener la paridad con la capa PostgreSQL/Laravel.
- **Minimalismo de Payload:** Los listeners de WebSockets solo deben inyectar los datos estrictamente necesarios.
- **Componentes Atómicos:** Seguir principios de Diseño Atómico dentro de las carpetas `shared` y `features`.
- **Idempotencia:** Asegurar que el `client_uuid` esté siempre presente en cualquier payload de creación.

---

## 📄 Licencia

Distribuido bajo la Licencia MIT. Consulta `LICENSE` para más información.

---

<p align="center">
  Construido con ❤️ para la Comunicación a Gran Escala.
</p>
