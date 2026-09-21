# Flores amarillas — regalo digital

MVP mobile-first listo para usar: intro → jardín → ramo interactivo → cierre emocional.

## Ejecutar

```bash
npm install
npm run dev
```

Abrí http://localhost:3000

Para probar como producción:

```bash
npm run build
npm start
```

## Personalizar textos

Editá `components/GiftExperience.jsx`:

- `messages`: mensajes de las cuatro flores.
- textos de intro, jardín y cierre.

## Fotos

El proyecto usa dos fotos remotas de Unsplash para que funcione apenas lo abras.
Podés reemplazar las URLs por imágenes propias cuando quieras.

- Jardín: Kostiantyn Li / Unsplash — https://unsplash.com/photos/yellow-flower-field-during-sunset-0Kl_0KcSN-0
- Ramo: Niqi B / Unsplash — https://unsplash.com/photos/yellow-sunflowers-bouquet-xDD-AZDN5pg

## Mobile

Diseñado para navegadores in-app de Instagram y Safari/Chrome móvil:
- `100dvh`
- safe areas
- touch targets de 48–52px
- sin Canvas / Three.js
- animaciones CSS

