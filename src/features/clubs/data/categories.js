/* @description Este archivo se encarga de almacenar las categorías de los clubes tanto como igual que los canales */

/* 
 * 🚀 FUTURA INTEGRACIÓN BACKEND (PostgreSQL)
 * --------------------------------------------------------
 * En la base de datos, las categorías y canales serán tablas separadas.
 * - Categorías: uuid, club_id, name, order
 * - Canales: uuid, category_id, name, description, type (text, voice), order
 */

export const categories = [
    {
        uuid: "category-001", 
        name: "General 🌍",
        order: 1,
        channels: [
            {
                uuid: "category-001-channel-001",
                name: "Chat General",
                description: "Canal para hablar de cualquier tema relacionado al club.",
                type: "text",
                order: 1
            },
            {
                uuid: "category-001-channel-002",
                name: "Caraota con azucar 😋",
                description: "Debate serio sobre la mejor forma de comer caraotas.",
                type: "text",
                order: 2,
                is_private: true,
            }
        ]
    },
    {
        uuid: "category-002",
        name: "Anuncios📯",
        order: 2,
        is_private: true,
        channels: [
            {
                uuid: "category-002-channel-001",
                name: "Anuncios",
                description: "Noticias oficiales del club.",
                type: "announcement",
                order: 1
            },
            {
                uuid: "category-002-channel-002",
                name: "Eventos",
                description: "Calendario de próximas actividades.",
                type: "text",
                order: 2
            },
            {
                uuid: "category-002-channel-003",
                name: "Encuestas",
                description: "Tu opinión importa en las decisiones del club.",
                type: "text",
                order: 3
            }
        ]
    },
    {
        uuid: "category-003",
        name: "Juegos 🎮",
        order: 3,
        channels: [
            {
                uuid: "category-003-channel-001",
                name: "Elden Ring ⚔️",
                description: "Canal general de las Tierras Entre Medias.",
                type: "text",
                order: 1
            },
            {
                uuid: "category-003-channel-002",
                name: "Builds y Estrategias",
                description: "Comparte y debate las mejores builds para el DLC.",
                type: "text",
                order: 2
            },
            {
                uuid: "category-003-channel-003",
                name: "Lore y Teorías",
                description: "Discusión sobre la historia y misterios de Miquella.",
                type: "text",
                order: 3
            },
            {
                uuid: "category-003-channel-004",
                name: "Helldivers 2 🚀",
                description: "Por la democracia gestionada.",
                type: "voice",
                order: 4
            }
        ]
    },
    {
        uuid: "category-004",
        name: "Series y Peliculas 🎬",
        order: 4,
        channels: [
            {
                uuid: "category-004-channel-001",
                name: "Series",
                description: "Recomendaciones de lo que hay que ver.",
                type: "text",
                order: 1
            },
            {
                uuid: "category-004-channel-002",
                name: "Peliculas",
                description: "Cine y palomitas.",
                type: "voice",
                order: 2
            },
            {
                uuid: "category-004-channel-003",
                name: "Comics 📖",
                description: "Marvel, DC y mucho más.",
                type: "text",
                order: 3
            },
            {
                uuid: "category-004-channel-004",
                name: "Anime 🌸",
                description: "El rincón de los nakamas.",
                type: "text",
                order: 4
            }
        ]
    }
]