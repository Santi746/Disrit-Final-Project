export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Reemplaza espacios con -
    .replace(/[^\w-]+/g, '')        // Quita caracteres no alfanuméricos
    .replace(/--+/g, '-');          // Evita guiones dobles
}
