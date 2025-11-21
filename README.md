🐢 LoneCard — Tarjetas Digitales Dinámicas para Equipos Modernos (LST)
<p align="center"> <img src="assets/banner/lonecard-banner.png" alt="LoneCard Banner" width="100%"> </p>
📌 Badges del Proyecto
<p align="left"> <img src="https://img.shields.io/github/last-commit/EstebanLST/LoneCard?color=38bdf8&style=for-the-badge"> <img src="https://img.shields.io/github/languages/top/EstebanLST/LoneCard?color=8b5cf6&style=for-the-badge"> <img src="https://img.shields.io/github/repo-size/EstebanLST/LoneCard?color=f97316&style=for-the-badge"> <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge"> <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge"> </p>
🚀 ¿Qué es LoneCard?

LoneCard es un sistema moderno y totalmente dinámico para generar tarjetas digitales de presentación para colaboradores, sin duplicar páginas, sin backend y con un diseño profesional basado en la UI corporativa de LST.

💡 Se basa en 3 elementos:

1 único archivo HTML

1 archivo JSON con los colaboradores

1 script JavaScript que genera la tarjeta

Ejemplo:

https://tudominio.com/lonecard/?id=LST01


👉 El servidor oculta automáticamente index.html para mantener una URL más limpia y corporativa.

⭐ Características principales
✔️ 100% Dinámico (Sin archivos duplicados)

Cada tarjeta depende únicamente del ID:

?id=LST00


La información proviene de:

data/colaboradores.json

✔️ QR Permanentes (QRMonkey Compatible)

Genera un QR UNA sola vez usando:

🔗 https://www.qrmonkey.com/

El QR apunta a:

https://tudominio.com/lonecard/?id=LST03


Si cambia el colaborador → solo editas el JSON.
El QR sigue funcionando para siempre.

##✔️ Arquitectura profesional
```
LoneCard/
│
├── assets/
│   ├── css/
│   ├── js/
│   └── img/
│
├── data/
│   └── colaboradores.json
│
├── index.html
├── .htaccess
└── README.md
```

✔️ Seguridad lista para producción

El archivo .htaccess incluye:

🔒 Bloqueo de exploración de directorios
📁 Protección de archivos internos
📌 Rutas limpias y profesionales
➡️ Carga automática de index.html

✔️ UI moderna & responsive (LST Design System)

Incluye:

✨ Animaciones suaves
✨ Glassmorphism
✨ Íconos personalizados
✨ Colores oficiales LST
✨ Compatibilidad total con dispositivos:

Android

iPhone

Tablets

Escritorio

## 🧩 Estructura del Proyecto
```
LoneCard/
│
├── assets/
│   ├── css/
│   │   ├── styles.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── utils.js
│   │   ├── data.js
│   │   └── app.js
│   └── img/
│       ├── colaboradores/
│       ├── icons/
│       └── logos/
│
├── data/
│   └── colaboradores.json
│
├── index.html
├── .htaccess
└── README.md
```

⚙️ Cómo funciona

1️⃣ El usuario abre:

https://tudominio.com/lonecard/?id=LST01


2️⃣ JavaScript busca ese ID en:

data/colaboradores.json


3️⃣ El sistema carga dinámicamente:

Nombre

Puesto

Foto

Contacto

Ubicación

Botones de acción

4️⃣ Si el ID no existe → muestra un mensaje de error con interfaz profesional.

🛠 Opciones de Instalación
🔹 ✔️ Opción Recomendada: Subida por FTP

Perfecto para Hosting compartido (CPanel / Hostinger / Banahosting).

📌 Pasos:

Conéctate por FTP (FileZilla recomendado).

Sube todo el contenido de LoneCard:

assets/

data/

index.html

.htaccess

Asegúrate de que .htaccess está visible (algunos hostings lo ocultan).

Abre en el navegador:

https://tudominio.com/lonecard/?id=LST00


Listo. Está en producción.

🔹 Opción alternativa: CPanel (Administrador de Archivos)

Comprime el proyecto en ZIP

Súbelo a /public_html/lonecard/

Extrae el ZIP

Asegúrate de NO dejar todo dentro de una carpeta adicional

Verifica que .htaccess exista

🔹 Opción 3: GitHub Pages

Sube el repositorio a GitHub

Ve a Settings → Pages

Branch main

Carpeta /root

Guardar

URL final:

https://usuario.github.io/LoneCard/

🧭 Roadmap del Proyecto

✨ Animaciones premium LST

🛠 Panel administrativo para gestionar colaboradores

🧩 Multiempresa / Multiunidad

🔗 Generador de QR integrado

🌐 Versión API / Backend opcional

🤝 Cómo contribuir

Haz un fork del repositorio

Crea una nueva rama

Haz tus cambios

Envía un Pull Request

📄 Licencia

Este proyecto se distribuye bajo licencia MIT.
Puedes usarlo, modificarlo y desplegarlo libremente.

👨‍💻 Autor

Esteban Gualpa
Lead Developer — (LST)

