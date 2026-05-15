import { User } from "@/features/users/types/user_data";

/**
 * BANNED_USERS_TABLE contiene datos ficticios de usuarios que han sido baneados de un club.
 * Cada entrada incluye el identificador único del baneo, el motivo, la marca de tiempo 
 * y los datos del usuario asociado.
 * 
 * @constant
 * @type {Array<Object>}
 * @property {string} ban_uuid - Identificador único para el registro de baneo.
 * @property {string} reason - Explicación detallada de por qué el usuario fue baneado.
 * @property {string} banned_at - Marca de tiempo ISO 8601 de cuándo ocurrió el baneo.
 * @property {Object} user - Una instancia de la clase User que contiene detalles del miembro.
 */
export const BANNED_USERS_TABLE = [


  {
    ban_uuid: "ban_1",
    reason: "Uso de lenguaje inapropiado y faltas de respeto reiteradas.",
    banned_at: new Date(Date.now() - 86400000 * 2).toISOString(), // Hace 2 días
    user: new User({
      uuid: "banned_user_1",
      first_name: "Toxic",
      last_name: "Player",
      username: "toxic_master",
      category_tag: "Gamer",
      avatar_url: "https://i.pravatar.cc/150?u=toxic1",
    })
  },
  {
    ban_uuid: "ban_2",
    reason: "Spam masivo en los canales de texto.",
    banned_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    user: new User({
      uuid: "banned_user_2",
      first_name: "Spam",
      last_name: "Bot",
      username: "free_nitro_bot",
      category_tag: "Bot",
      avatar_url: "https://i.pravatar.cc/150?u=bot2",
    })
  },
  {
    ban_uuid: "ban_3",
    reason: "Intento de estafa a otros miembros del club (Phishing).",
    banned_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    user: new User({
      uuid: "banned_user_3",
      first_name: "Scam",
      last_name: "Artist",
      username: "crypto_king",
      category_tag: "Finance",
      avatar_url: "https://i.pravatar.cc/150?u=scam3",
    })
  },
  {
    ban_uuid: "ban_4",
    reason: "Acoso por mensajes directos a moderadores.",
    banned_at: new Date(Date.now() - 86400000 * 15).toISOString(),
    user: new User({
      uuid: "banned_user_4",
      first_name: "Angry",
      last_name: "Dude",
      username: "mad_guy_99",
      category_tag: "Casual",
      avatar_url: "https://i.pravatar.cc/150?u=angry4",
    })
  },
  {
    ban_uuid: "ban_5",
    reason: "Compartir contenido no seguro para el trabajo (NSFW).",
    banned_at: new Date(Date.now() - 86400000 * 20).toISOString(),
    user: new User({
      uuid: "banned_user_5",
      first_name: "Rule",
      last_name: "Breaker",
      username: "rebel_without_cause",
      category_tag: "Artist",
      avatar_url: "https://i.pravatar.cc/150?u=rebel5",
    })
  },
  {
    ban_uuid: "ban_6",
    reason: "Uso de hacks o cheats en eventos del servidor.",
    banned_at: new Date(Date.now() - 86400000 * 25).toISOString(),
    user: new User({
      uuid: "banned_user_6",
      first_name: "Hacker",
      last_name: "Man",
      username: "aimbot_pro",
      category_tag: "Hacker",
      avatar_url: "https://i.pravatar.cc/150?u=hack6",
    })
  },
  {
    ban_uuid: "ban_7",
    reason: "Evasión de muteo mediante cuentas alternativas.",
    banned_at: new Date(Date.now() - 86400000 * 30).toISOString(),
    user: new User({
      uuid: "banned_user_7",
      first_name: "Alt",
      last_name: "Account",
      username: "shadow_ninja",
      category_tag: "Ninja",
      avatar_url: "https://i.pravatar.cc/150?u=alt7",
    })
  },
  {
    ban_uuid: "ban_8",
    reason: "Toxicidad extrema en chat de voz.",
    banned_at: new Date(Date.now() - 86400000 * 35).toISOString(),
    user: new User({
      uuid: "banned_user_8",
      first_name: "Loud",
      last_name: "Yeller",
      username: "screamer_kid",
      category_tag: "Music",
      avatar_url: "https://i.pravatar.cc/150?u=loud8",
    })
  },
  {
    ban_uuid: "ban_9",
    reason: "Raideo del servidor con multicuentas.",
    banned_at: new Date(Date.now() - 86400000 * 40).toISOString(),
    user: new User({
      uuid: "banned_user_9",
      first_name: "Raid",
      last_name: "Leader",
      username: "destroyer_9000",
      category_tag: "Raider",
      avatar_url: "https://i.pravatar.cc/150?u=raid9",
    })
  },
  {
    ban_uuid: "ban_10",
    reason: "Compartir información personal de otros usuarios (Doxxing).",
    banned_at: new Date(Date.now() - 86400000 * 45).toISOString(),
    user: new User({
      uuid: "banned_user_10",
      first_name: "Doxx",
      last_name: "Er",
      username: "info_broker",
      category_tag: "Spy",
      avatar_url: "https://i.pravatar.cc/150?u=doxx10",
    })
  },
  {
    ban_uuid: "ban_11",
    reason: "Incitar al odio o discriminación.",
    banned_at: new Date(Date.now() - 86400000 * 50).toISOString(),
    user: new User({
      uuid: "banned_user_11",
      first_name: "Hate",
      last_name: "Speech",
      username: "troll_face_x",
      category_tag: "Troll",
      avatar_url: "https://i.pravatar.cc/150?u=troll11",
    })
  },
  {
    ban_uuid: "ban_12",
    reason: "Abuso de pings a roles de administración (@everyone).",
    banned_at: new Date(Date.now() - 86400000 * 55).toISOString(),
    user: new User({
      uuid: "banned_user_12",
      first_name: "Ping",
      last_name: "Abuser",
      username: "ping_lord",
      category_tag: "Annoying",
      avatar_url: "https://i.pravatar.cc/150?u=ping12",
    })
  },
  {
    ban_uuid: "ban_13",
    reason: "Publicidad no autorizada de otros servidores de Discord/Vyne.",
    banned_at: new Date(Date.now() - 86400000 * 60).toISOString(),
    user: new User({
      uuid: "banned_user_13",
      first_name: "Ad",
      last_name: "Spammer",
      username: "join_my_server",
      category_tag: "Advertiser",
      avatar_url: "https://i.pravatar.cc/150?u=ad13",
    })
  },
  {
    ban_uuid: "ban_14",
    reason: "Suplantación de identidad de un miembro del Staff.",
    banned_at: new Date(Date.now() - 86400000 * 65).toISOString(),
    user: new User({
      uuid: "banned_user_14",
      first_name: "Fake",
      last_name: "Admin",
      username: "real_admin_trust_me",
      category_tag: "Impostor",
      avatar_url: "https://i.pravatar.cc/150?u=fake14",
    })
  },
  {
    ban_uuid: "ban_15",
    reason: "Amenazas a la integridad del servidor (DDoS threats).",
    banned_at: new Date(Date.now() - 86400000 * 70).toISOString(),
    user: new User({
      uuid: "banned_user_15",
      first_name: "Danger",
      last_name: "Noodle",
      username: "ddos_kid_1337",
      category_tag: "Danger",
      avatar_url: "https://i.pravatar.cc/150?u=danger15",
    })
  }
];
