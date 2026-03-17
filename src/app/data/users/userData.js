/**
 * @file userData.js
 * @description Backend simulado — representa la tabla de usuarios en la base de datos.
 */

/**
 * @typedef {Object} Friend
 * @property {string} uuid - Identificador único universal (backend).
 * @property {string} first_name - Nombre.
 * @property {string} last_name - Apellido.
 * @property {string} avatar - URL del avatar.
 * @property {string} tag - Identificador visual (#1234).
 */
   /* */
const MOCK_FRIENDS = [
    { uuid: "usr_rel_4521", first_name: "María", last_name: "García", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria", tag: "#4521" },
    { uuid: "usr_rel_8834", first_name: "Juan", last_name: "Pérez", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan", tag: "#8834" },
    { uuid: "usr_rel_1190", first_name: "Ana", last_name: "Torres", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana", tag: "#1190" },
    { uuid: "usr_rel_6673", first_name: "Carlos", last_name: "López", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos", tag: "#6673" },
    { uuid: "usr_rel_2201", first_name: "Pedro", last_name: "Ruiz", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro", tag: "#2201" },
    { uuid: "usr_rel_9910", first_name: "Laura", last_name: "Díaz", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura", tag: "#9910" },
    { uuid: "usr_rel_3347", first_name: "Diego", last_name: "Mora", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diego", tag: "#3347" },
];

export const MOCK_USER = {
    uuid: "usr_master_7842",
    tag: "#7842",
    first_name: "Santiago",
    last_name: "Mejias",
    username: "santi_dev",
    birth_date: "1998-06-15",
    email: "santi@gmail.com",
    password: "hashed_b3c4a9f2e1d0",
    global_role: "standard",
    last_activity: "2026-03-12T16:45:00Z",
    bio: "Desarrollador apasionado y constructor de comunidades digitales.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Santiago",
    banner: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600&h=200&fit=crop",
    location: "La Guaira, VE",
    created_at: "2025-03-15T12:00:00Z",
    is_online: true,
    mutual_friends_count: 4,
    friends: MOCK_FRIENDS,
    club_ids: [9, 4, 14, 6, 10],
};

/**
 * @description Simulación de la tabla 'users' completa para búsquedas globales.
 */
export const ALL_MOCK_USERS = [MOCK_USER, ...MOCK_FRIENDS];
