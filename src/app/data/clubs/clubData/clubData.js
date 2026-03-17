/**
 * @file clubData.js
 * @description Clase maestra que define el esquema (blueprint) de los clubes.
 * Garantiza que todos los clubes tengan la misma estructura de datos,
 * independientemente de su categoría o origen.
 */



// ─────────────────────────────────────────────────────────
// Modelo Estándar de Club
// ─────────────────────────────────────────────────────────

export class ClubData {
    /**
     * @param {number} id           - Identificador único del club.
     * @param {string} title        - Nombre público del club.
     * @param {string} tag          - Etiqueta principal de categoría (ej: "FPS").
     * @param {string} description  - Misión o breve descripción del club.
     * @param {string} image        - URL de la imagen de banner (Unsplash).
     * @param {string} members      - Conteo total de miembros (formato string: "125k").
     * @param {string} online       - Miembros activos actualmente (formato string: "5k").
     * @param {string} bottomText   - Texto destacado en la base de la tarjeta (novedad).
     * @param {boolean} Verified    - Estado de verificación oficial.
     * @param {string} Logo         - URL del icono/perfil del club.
     * @param {string} created_at   - Fecha de creación del club (formato string: "DD/MM/YYYY").
     * @param {string} ownerUuid    - UUID del dueño del club (para base de datos).
     */
    constructor({
        id,
        title,
        tag,
        description,
        image,
        members,
        online,
        bottomText,
        Verified,
        Logo,
        createdAt,
        ownerUuid
    } = {}) {
        this.id = id;
        this.title = title;
        this.tag = tag;
        this.description = description;
        this.image = image;
        this.members = members;
        this.online = online;
        this.bottomText = bottomText;
        this.Verified = Verified;
        this.Logo = Logo;
        this.createdAt = createdAt;
        this.ownerUuid = ownerUuid;
    }
}
