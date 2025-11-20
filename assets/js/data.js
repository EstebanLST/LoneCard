/**
 * data.js
 * Capa de acceso a datos para LoneCard.
 * Carga el archivo JSON de colaboradores y expone
 * una función para obtener un colaborador por ID.
 */

const LC_DATA_URL = "data/colaboradores.json";

/**
 * Obtiene el objeto colaborador a partir de su ID.
 * @param {string} id - ID del colaborador (por ejemplo "LST01").
 * @returns {Promise<object|null>} Promesa que resuelve con el colaborador o null.
 */
async function loadEmpleadoById(id) {
  try {
    const resp = await fetch(LC_DATA_URL, {
      cache: "no-store" // evitar problemas de cache al actualizar datos
    });

    if (!resp.ok) {
      console.error("No se pudo cargar colaboradores.json:", resp.status);
      return null;
    }

    const data = await resp.json();

    if (!data || !Array.isArray(data.colaboradores)) {
      console.error("Formato inválido en colaboradores.json");
      return null;
    }

    const emp = data.colaboradores.find((e) => e.id === id);
    return emp || null;
  } catch (error) {
    console.error("Error al cargar los datos de colaboradores:", error);
    return null;
  }
}
