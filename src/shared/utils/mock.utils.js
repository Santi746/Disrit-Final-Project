/**
 * Configuración para los mocks del sistema.
 * Permite centralizar latencias y probabilidades de error.
 */
export const MOCK_CONFIG = {
  // Latencia base en ms
  BASE_DELAY: 500,
  
  // Multiplicadores para diferentes tipos de peticiones
  DELAYS: {
    FAST: 200,
    MEDIUM: 500,
    SLOW: 1200,
    VERY_SLOW: 2000,
  },

  // Probabilidad de error (0 a 1)
  // Solo se aplica si estamos en entorno de desarrollo
  ERROR_PROBABILITY: 0.05,
  
  // Flag para habilitar/deshabilitar errores aleatorios globalmente
  ENABLE_RANDOM_ERRORS: false, // Deshabilitado por defecto para no molestar al dev
};

/**
 * Simula una espera asíncrona y opcionalmente lanza un error aleatorio.
 * @param {number} ms - Milisegundos de espera.
 * @param {boolean} canFail - Si la operación puede fallar aleatoriamente.
 */
export const mockRequest = async (ms = MOCK_CONFIG.BASE_DELAY, canFail = false) => {
  await new Promise((resolve) => setTimeout(resolve, ms));

  if (
    canFail && 
    MOCK_CONFIG.ENABLE_RANDOM_ERRORS && 
    process.env.NODE_ENV === "development" && 
    Math.random() < MOCK_CONFIG.ERROR_PROBABILITY
  ) {
    throw new Error("Error de red simulado (Mock API Error)");
  }
};
