import { ClubData } from "../clubData/clubData";

export const FEATURED_CLUBS = [
    new ClubData({
        id: 1,
        title: "Vyne Creators",
        tag: "Verified",
        description: "Comunidad oficial para creadores de Vyne. Comparte consejos y obtén acceso anticipado a funciones.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800",
        members: "45.2k",
        online: "3.4k",
        bottomText: "Nuevas herramientas de monetización anunciadas",
        Verified: true,
        Logo: "https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?q=80&w=200",
        createdAt: "2024",
        ownerUuid: "usr_master_7842"
    }),
    new ClubData({
        id: 2,
        title: "Indie Hackers",
        tag: "Startup",
        description: "Impulsa tu startup. Comparte hitos, ingresos y obtén feedback.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800",
        members: "8.7k",
        online: "840",
        bottomText: "Sesión de crítica de landing pages",
        Verified: false,
        Logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200",
        createdAt: "2023",
        ownerUuid: "usr_rel_4521"
    }),
    new ClubData({
        id: 3,
        title: "Digital Nomads",
        tag: "Travel",
        description: "Conecta con trabajadores remotos que viajan por el mundo. Guías de configuración, visados y quedadas.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
        members: "32.1k",
        online: "1.8k",
        bottomText: "¡Quedada en Bali este fin de semana!",
        Verified: true,
        Logo: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=200",
        createdAt: "2022",
        ownerUuid: "u-ana-1190"
    })
];
