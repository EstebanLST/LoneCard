/**
 * app.js
 * ---------------------------------------------------------------------------
 * Lógica principal de LoneCard.
 *
 * Responsabilidades:
 * - Leer el parámetro ?id de la URL.
 * - Obtener los datos del colaborador desde colaboradores.json (loadEmpleadoById).
 * - Pintar la tarjeta de presentación en el DOM.
 * - Gestionar acciones de contacto (WhatsApp, teléfono, email, móvil).
 * - Generar y descargar vCard.
 * - Mostrar un overlay elegante si:
 *      - NO llega ningún ?id en la URL, o
 *      - el ID no existe en el JSON.
 *
 * Dependencias:
 * - utils.js  -> getParam, linkWhatsApp, descargarVCard
 * - data.js   -> loadEmpleadoById
 * ---------------------------------------------------------------------------
 */

"use strict";

/**
 * Muestra el overlay de error cuando:
 *  - No se envía ?id en la URL, o
 *  - el ID no existe en colaboradores.json.
 *
 * Además atenúa la tarjeta de fondo y configura el botón "Volver a intentar".
 *
 * @param {string|null} idParam - ID recibido por parámetro (?id=...), o null/undefined
 */
function mostrarErrorIdNoEncontrado(idParam) {
  // 1. Atenuar / deshabilitar la tarjeta
  const card = document.querySelector(".lc-card");
  if (card) {
    card.classList.add("lc-card--disabled");
  }

  // 2. Mostrar el overlay de error
  const errorOverlay = document.getElementById("lc-error");
  if (errorOverlay) {
    errorOverlay.classList.add("lc-error--visible");
    errorOverlay.setAttribute("aria-hidden", "false");
  }

  // 3. Personalizar el mensaje según el caso
  const msgEl = document.querySelector(".lc-error__message");
  const titleEl = document.getElementById("lc-error-title");

  if (titleEl) {
    titleEl.textContent = "Tarjeta no disponible";
  }

  if (msgEl) {
    if (!idParam) {
      // Caso: no vino ningún ?id en la URL
      msgEl.textContent =
        "No se ha recibido ningún identificador en la URL. " +
        "Asegúrate de escanear un código QR válido o usa el enlace correcto de la tarjeta.";
    } else {
      // Caso: vino un ID, pero no existe en el JSON
      msgEl.textContent =
        `El identificador "${idParam}" no corresponde a ningún colaborador activo. ` +
        `Verifica el código de la tarjeta o ponte en contacto con el administrador.`;
    }
  }

  // 4. Botón "Volver a intentar" -> recargar página base (sin parámetros)
  const btnRetry = document.getElementById("lc-error-refresh");
  if (btnRetry) {
    btnRetry.addEventListener("click", () => {
      // Recarga el mismo path pero sin query string (?id=...)
      window.location.href = window.location.pathname;
    });
  }
}

/**
 * Inicializa la tarjeta de presentación.
 * Se ejecuta cuando el DOM está listo.
 */
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // ---------------------------------------------------------------------
    // 1. Leer el ID desde la URL
    //    IMPORTANTE:
    //    - Si NO hay ?id= -> mostramos directamente el overlay de error.
    //    - Ya NO usamos LST00 como valor por defecto.
    // ---------------------------------------------------------------------
    const rawId = getParam("id");

    if (!rawId) {
      console.warn("[LoneCard] No se recibió parámetro ?id en la URL.");
      // Mostramos overlay de error indicando que no hay ID
      mostrarErrorIdNoEncontrado(null);
      return; // No continuamos con la carga de la tarjeta
    }

    const idParam = String(rawId).trim();

    // ---------------------------------------------------------------------
    // 2. Referencias a elementos del DOM
    // ---------------------------------------------------------------------
    const foto = document.getElementById("foto");
    const nombreEl = document.getElementById("nombre");
    const puestoEl = document.getElementById("puesto");
    const ubicacionEl = document.getElementById("ubicacion");
    const ubicacionTexto = ubicacionEl
      ? ubicacionEl.querySelector(".lc-content__location-text")
      : null;

    const btnWhatsapp = document.getElementById("btnWhatsapp");
    const btnTel = document.getElementById("btnTel");
    const btnMail = document.getElementById("btnMail");
    const btnMovil = document.getElementById("btnMovil");
    const btnGuardar = document.getElementById("guardarContacto");
    const btnCompartir = document.getElementById("compartirWhatsapp");

    // ---------------------------------------------------------------------
    // 3. Cargar datos del colaborador desde el JSON
    // ---------------------------------------------------------------------
    const emp = await loadEmpleadoById(idParam);

    // ---------------------------------------------------------------------
    // 4. Manejo cuando el ID NO existe en colaboradores.json
    // ---------------------------------------------------------------------
    if (!emp) {
      console.warn(
        `[LoneCard] ID de colaborador no encontrado en JSON: "${idParam}".`
      );

      // Mostrar overlay de error profesional
      mostrarErrorIdNoEncontrado(idParam);

      // Estado mínimo en la tarjeta, por si se ve de fondo
      if (nombreEl) nombreEl.textContent = "Colaborador no encontrado";
      if (puestoEl) puestoEl.textContent = "";
      if (ubicacionTexto) {
        ubicacionTexto.textContent =
          "Verifica el identificador de la tarjeta o escanea un QR válido.";
      }

      // Desactivar enlaces de contacto para evitar clics inútiles
      if (btnWhatsapp) btnWhatsapp.href = "#";
      if (btnTel) btnTel.href = "#";
      if (btnMail) btnMail.href = "#";
      if (btnMovil) btnMovil.href = "#";

      if (btnGuardar) btnGuardar.style.display = "none";
      if (btnCompartir) btnCompartir.style.display = "none";

      // Importante: no seguimos con la lógica normal
      return;
    }

    // ---------------------------------------------------------------------
    // 5. Rellenar datos visuales cuando el colaborador SÍ existe
    // ---------------------------------------------------------------------

    // Foto
    if (foto) {
      if (emp.foto) {
        // Ruta definida en el JSON (puede ser absoluta o relativa)
        foto.src = emp.foto;
      }
      foto.alt = `Foto de ${emp.nombre || "colaborador"}`;
    }

    // Nombre, puesto y ubicación
    if (nombreEl) nombreEl.textContent = emp.nombre || "";
    if (puestoEl) puestoEl.textContent = emp.puesto || "";
    if (ubicacionTexto) ubicacionTexto.textContent = emp.ubicacion || "";

    // ---------------------------------------------------------------------
    // 6. Enlaces de contacto
    // ---------------------------------------------------------------------
    const tel = emp.telefono || emp.movil || "";
    const mov = emp.movil || emp.telefono || "";
    const correo = emp.email || "";

    if (btnWhatsapp) {
      btnWhatsapp.href = emp.whatsapp
        ? linkWhatsApp(emp.whatsapp, `Hola ${emp.nombre}`)
        : "#";
      if (!emp.whatsapp) {
        btnWhatsapp.classList.add("lc-actions__btn--disabled");
      }
    }

    if (btnTel) {
      btnTel.href = tel ? `tel:${tel}` : "#";
      if (!tel) {
        btnTel.classList.add("lc-actions__btn--disabled");
      }
    }

    if (btnMovil) {
      btnMovil.href = mov ? `tel:${mov}` : "#";
      if (!mov) {
        btnMovil.classList.add("lc-actions__btn--disabled");
      }
    }

    if (btnMail) {
      btnMail.href = correo ? `mailto:${correo}` : "#";
      if (!correo) {
        btnMail.classList.add("lc-actions__btn--disabled");
      }
    }

    // ---------------------------------------------------------------------
    // 7. Guardar contacto (descarga vCard)
    // ---------------------------------------------------------------------
    if (btnGuardar) {
      btnGuardar.addEventListener("click", (e) => {
        e.preventDefault();
        // descargarVCard viene de utils.js
        descargarVCard(emp);
      });
    }

    // ---------------------------------------------------------------------
    // 8. Compartir tarjeta (Web Share API + fallback WhatsApp)
    // ---------------------------------------------------------------------
    if (btnCompartir) {
      btnCompartir.addEventListener("click", (e) => {
        e.preventDefault();

        const shareUrl = window.location.href;
        const texto = `Te comparto la tarjeta de ${emp.nombre}: ${shareUrl}`;

        if (navigator.share) {
          // Compatibilidad con navegadores modernos / móviles
          navigator
            .share({
              title: emp.nombre,
              text: texto,
              url: shareUrl
            })
            .catch(() => {
              // El usuario puede cancelar el share; no hacemos nada.
            });
        } else if (emp.whatsapp) {
          // Fallback: abrir WhatsApp con el mismo mensaje
          window.location.href = linkWhatsApp(emp.whatsapp, texto);
        } else {
          alert(
            "No hay un número de WhatsApp disponible para compartir esta tarjeta."
          );
        }
      });
    }

    // Fin de inicialización correcta
    console.info(`[LoneCard] Tarjeta cargada para el ID: "${idParam}".`);
  } catch (err) {
    // -------------------------------------------------------------------
    // 9. Manejo de errores inesperados
    // -------------------------------------------------------------------
    console.error("[LoneCard] Error inicializando la tarjeta:", err);

    // En caso de un fallo grave, evitamos dejar la UI "rota".
    mostrarErrorIdNoEncontrado(getParam("id") || null);
  }
});
