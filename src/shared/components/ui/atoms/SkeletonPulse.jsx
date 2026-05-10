/**
 * @atom SkeletonPulse
 * @description Átomo base de skeleton con animación shimmer estilo Discord/Notion.
 * Puede recibir cualquier className para personalizar dimensiones y forma.
 *
 * @param {string} className - Clases de Tailwind para forma/tamaño.
 * @returns {JSX.Element}
 */
export default function SkeletonPulse({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden bg-forest-stat/60 ${className}`}
      aria-hidden="true"
    >
      {/* Shimmer sweep */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-linear-to-r from-transparent via-white/4 to-transparent" />
    </div>
  );
}
