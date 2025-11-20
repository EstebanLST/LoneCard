/**
 * utils.js
 * Funciones utilitarias para LoneCard
 * Autor: Esteban Gualpa - Loneliness Software Technology
 */

/**
 * Obtiene el valor de un parámetro de la URL.
 * @param {string} name - Nombre del parámetro (por ejemplo "id").
 * @returns {string|null} Valor del parámetro o null si no existe.
 */
function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

/**
 * Deja solamente dígitos en una cadena.
 * Útil para normalizar números de teléfono.
 * @param {string} [str=""]
 * @returns {string} Cadena solo con números.
 */
function soloDigitos(str = "") {
  return String(str).replace(/\D+/g, "");
}

/**
 * Construye un enlace válido de WhatsApp usando https://wa.me
 * @param {string} numero - Número telefónico (se filtrarán los caracteres no numéricos).
 * @param {string} [texto=""] - Texto opcional del mensaje por defecto.
 * @returns {string} URL lista para usar en un <a>.
 */
function linkWhatsApp(numero, texto = "") {
  const n = soloDigitos(numero); // wa.me no acepta '+'
  const q = texto ? `?text=${encodeURIComponent(texto)}` : "";
  return `https://wa.me/${n}${q}`;
}

/**
 * Crea y descarga un archivo VCard (.vcf) para guardar un contacto.
 * @param {object} emp - Objeto colaborador con nombre, puesto, teléfonos, email, ubicación.
 */
function descargarVCard(emp) {
  const tel = emp.telefono || emp.movil || "";
  const mov = emp.movil || emp.telefono || "";
  const correo = emp.email || "";

  const vcard = `BEGIN:VCARD
VERSION:3.0
N:${emp.nombre}
FN:${emp.nombre}
TITLE:${emp.puesto || ""}
TEL;TYPE=WORK,VOICE:${tel}
TEL;TYPE=CELL,VOICE:${mov}
EMAIL;TYPE=INTERNET,PREF:${correo}
ADR;TYPE=WORK:;;${emp.ubicacion || ""};;;
END:VCARD`;

  const blob = new Blob([vcard], {
    type: "text/vcard;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${(emp.nombre || "contacto").replace(/\s+/g, "_")}.vcf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
