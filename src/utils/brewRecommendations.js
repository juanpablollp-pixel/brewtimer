const RANGOS = {
  claro:  { min: 92, max: 95 },
  medio:  { min: 88, max: 92 },
  oscuro: { min: 85, max: 88 },
};

const NOMBRE_TUESTE = {
  claro: 'tueste claro',
  medio: 'tueste medio',
  oscuro: 'tueste oscuro',
};

/**
 * Calcula recomendación de temperatura basada en atributos sensoriales.
 *
 * @param {number} tempActual  - Temperatura actual de preparación (°c)
 * @param {'claro'|'medio'|'oscuro'} tueste
 * @param {number} acidez      - 1–5
 * @param {number} amargor     - 1–5
 * @param {number} astringencia - 1–5
 * @returns {{ tipo: 'incompatible'|'recomendacion', ... }}
 */
export function calcularRecomendacionTemp(tempActual, tueste, acidez, amargor, astringencia) {
  // ── Incompatibilidades ────────────────────────────────────────────
  if (acidez >= 4 && astringencia >= 4) {
    return {
      tipo: 'incompatible',
      mensaje: 'No es posible una recomendación dado que tus calificaciones entre Acidez y Astringencia son incompatibles.',
    };
  }
  if (acidez >= 4 && amargor >= 4) {
    return {
      tipo: 'incompatible',
      mensaje: 'No es posible una recomendación dado que tus calificaciones entre Acidez y Amargor son incompatibles.',
    };
  }
  if (amargor >= 4 && astringencia <= 2) {
    return {
      tipo: 'incompatible',
      mensaje: 'No es posible una recomendación dado que tus calificaciones entre Amargor y Astringencia son incompatibles.',
    };
  }

  // ── Lógica de ajuste ──────────────────────────────────────────────
  const rango = RANGOS[tueste];
  const señal = acidez - astringencia;
  const magnitud = Math.abs(señal);
  const ajuste = magnitud >= 3 ? 3 : magnitud >= 2 ? 2 : magnitud >= 1 ? 1 : 0;

  let tempSugeridaRaw = señal > 0
    ? tempActual + ajuste
    : señal < 0
      ? tempActual - ajuste
      : tempActual;

  // Detectar si supera el rango ANTES de clampear (para comentarios de límite)
  const superaTecho = tempSugeridaRaw > rango.max;
  const superaPiso  = tempSugeridaRaw < rango.min;

  // Clampear dentro del rango
  const tempSugerida = Math.min(rango.max, Math.max(rango.min, tempSugeridaRaw));
  const ajusteFinal = tempSugerida - tempActual;
  const direccion = ajusteFinal > 0 ? 'subir' : ajusteFinal < 0 ? 'bajar' : 'mantener';

  // ── Mensaje principal ─────────────────────────────────────────────
  let mensaje = '';
  if (señal > 0) {
    const signo = `+${ajusteFinal}°c`;
    mensaje = `La acidez alta indica sub-extracción. Subí la temperatura ${signo} para aumentar la solubilidad y balancear el perfil dentro del rango de ${NOMBRE_TUESTE[tueste]}.`;
  } else if (señal < 0) {
    const signo = `${ajusteFinal}°c`;
    mensaje = `La astringencia alta indica sobre-extracción. Bajá la temperatura ${signo} para reducir la solubilidad y balancear el perfil dentro del rango de ${NOMBRE_TUESTE[tueste]}.`;
  } else {
    mensaje = `El balance entre acidez y astringencia es neutro. La temperatura actual está dentro del rango esperado para ${NOMBRE_TUESTE[tueste]}.`;
  }

  // ── Comentario de límite ──────────────────────────────────────────
  let comentario = null;

  if (superaTecho) {
    comentario = `Teniendo en cuenta que tu temperatura es de ${tempActual}°c, quizá el tipo de tueste de tu café es más claro de lo que indica el tostador.`;
  } else if (superaPiso) {
    comentario = `Teniendo en cuenta que tu temperatura es de ${tempActual}°c, quizá el tipo de tueste de tu café es más oscuro de lo que indica el tostador.`;
  } else if (tempSugerida === rango.max && señal > 0) {
    comentario = `Estás en el límite superior del rango para ${NOMBRE_TUESTE[tueste]}. Si la acidez persiste, considerá que tu café podría tener características de tueste más claro.`;
  } else if (tempSugerida === rango.min && señal < 0) {
    comentario = `Estás en el límite inferior del rango para ${NOMBRE_TUESTE[tueste]}. Si la astringencia persiste, considerá que tu café podría tener características de tueste más oscuro.`;
  }

  return {
    tipo: 'recomendacion',
    tempActual,
    tempSugerida,
    ajuste: ajusteFinal,
    direccion,
    mensaje,
    comentario,
  };
}
