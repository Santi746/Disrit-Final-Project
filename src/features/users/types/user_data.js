/**
 * @file user_data.js
 * @description Clase que representa la estructura de un usuario en el sistema.
 * Alineada con la tabla 'users' de PostgreSQL.
 */

export class users {
  constructor({
    uuid,
    first_name,
    last_name,
    username,
    category_tag,
    avatar_url,
    banner_url,
    bio = "",
    location = "",
    created_at = new Date().toISOString(),
    is_online = false,
    club_ids = [],
    friends = [],
    mutual_friends_count = 0,
  }) {
    this.uuid = uuid;
    this.first_name = first_name;
    this.last_name = last_name;
    this.username = username;
    this.category_tag = category_tag;
    this.avatar_url = avatar_url;
    this.banner_url = banner_url;
    this.bio = bio;
    this.location = location;
    this.created_at = created_at;
    this.is_online = is_online;
    this.club_ids = club_ids;
    this.friends = friends;
    this.mutual_friends_count = mutual_friends_count;
  }

  /**
   * Retorna el nombre completo del usuario.
   * @returns {string}
   */
  get display_name() {
    return `${this.first_name} ${this.last_name}`;
  }

  /**
   * Retorna el handle único (ej: @santi_dev#7842).
   * @returns {string}
   */
  get handle() {
    return `@${this.username}${this.category_tag}`;
  }

  /**
   * Retorna la fecha de registro formateada para humanos (ej: Marzo 2025).
   * @returns {string}
   */
  get joined_date() {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const date = new Date(this.created_at);
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }
}
