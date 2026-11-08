# Progreso AjrcServicios

- [x] Propuesta aprobada; datos reales y logo revisados.
- [x] Proyecto administrado inicializado. Diseño definido.
- [x] Preparar logo y tipografía locales.
- [x] Implementar página y orientador de cuatro preguntas.
- [x] Verificar lógica, enlaces, móvil, escritorio, teclado y copia.
- [x] Build y lint sin errores; servidor activo en tmux ajrc-web, puerto 4200.
- [x] Primera versión entregada mediante deliver.

Decisiones: sin nuevas APIs, tablas ni integraciones. Zona confirmada en revisión actual: Oasis, calle 19, Terrazas de Oasis, 653-a, Punto Fijo 4147, Falcón. Días de atención no confirmados: omitir. WhatsApp 584126627894; correo ajrc.servicios@gmail.com. Mantener analítica obligatoria del proyecto.

Verificación: 120 tests Bun / 1530 aserciones, cero fallos. 8 recorridos UI completos, alertas, atrás y reinicio, copia real y alternativa manual, FAQ, menú y teclado. Siete tamaños entre 320 y 1440px sin desbordamiento. Axe WCAG 2 A/AA y 2.1 AA: cero hallazgos en escritorio, móvil, alerta y menú. Sin errores JS; el orientador no hace llamadas API. Build solo presenta avisos propios de Vite/plantilla y tamaño de bundle, no errores. No se enviaron mensajes ni se contactó al negocio durante las pruebas.
## Revisión actual
- [x] Quitar proceso, actualizar tarjetas, CTAs y datos de contacto visibles.
- [x] Ubicación real, diagnóstico presencial/remoto, keywords y JSON-LD local.
- [x] Imagen de proyecto y sección Nuestros partners con Rossystilos.
- [x] Verificar responsividad, accesibilidad, enlaces y orientador; build/lint sin errores.
- [ ] Entregar revisión actual.

Pruebas de revisión: tests unitarios 120/120; 8 flujos navegador completos; 7 tamaños sin overflow; axe escritorio/móvil sin hallazgos. Validado texto sin teléfono/correo (destinos de enlaces conservados), imágenes cargadas, proceso ausente, dirección y Google Maps correctos, metadatos y JSON-LD válidos. Rossystilos sin URL no confirmada; lista extensible en lib/partners.ts.
