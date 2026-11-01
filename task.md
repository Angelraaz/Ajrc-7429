# Progreso AjrcServicios

- [x] Propuesta aprobada; datos reales y logo revisados.
- [x] Proyecto administrado inicializado. Diseño definido.
- [x] Preparar logo y tipografía locales.
- [x] Implementar página y orientador de cuatro preguntas.
- [x] Verificar lógica, enlaces, móvil, escritorio, teclado y copia.
- [x] Build y lint sin errores; servidor activo en tmux ajrc-web, puerto 4200.
- [ ] Entregar web mediante deliver.

Decisiones: sin nuevas APIs, tablas ni integraciones. Zona y días no confirmados: omitir. WhatsApp 584126627894; correo ajrc.servicios@gmail.com. Mantener analítica obligatoria del proyecto.

Verificación: 120 tests Bun / 1530 aserciones, cero fallos. 8 recorridos UI completos, alertas, atrás y reinicio, copia real y alternativa manual, FAQ, menú y teclado. Siete tamaños entre 320 y 1440px sin desbordamiento. Axe WCAG 2 A/AA y 2.1 AA: cero hallazgos en escritorio, móvil, alerta y menú. Sin errores JS; el orientador no hace llamadas API. Build solo presenta avisos propios de Vite/plantilla y tamaño de bundle, no errores. No se enviaron mensajes ni se contactó al negocio durante las pruebas.