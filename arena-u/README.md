# Arena U | Copa Pixel

Aplicación educativa construida a partir de **Pensar en Componentes**, nivel 1 del cuaderno React 2026. Presenta el calendario de la Copa Pixel, una clasificación y un formulario de inscripción de demostración.

> Los datos del torneo son ficticios. El formulario solo muestra una confirmación en el navegador: no envía ni guarda datos en un servidor.

## 1. Ruta rápida

### 1.1 Requisitos

- Node.js 20.19 o superior (también funciona con Node.js 22.12 o superior).
- npm, incluido con Node.js.

### 1.2 Instalar y ejecutar

Abre una terminal dentro de `arena-u/` y ejecuta:

```bash
npm install
npm run dev
```

Abre la dirección local que muestre Vite, normalmente `http://localhost:5173/`. El servidor permanece activo y actualiza la página al guardar cambios.

### 1.3 Compilar y revisar

```bash
npm run build
npm run lint
```

`npm run build` genera los archivos listos para publicar en `dist/`. `npm run lint` revisa JavaScript y JSX con Oxlint.

## 2. Qué construimos

### 2.1 Objetivo del producto

Arena U es el espacio de la Universidad Altamira para seguir el torneo ficticio Copa Pixel. La pantalla permite consultar partidos, filtrar por estado, buscar equipos o juegos, revisar la tabla y probar una solicitud de inscripción local.

### 2.2 Contenido de la pantalla

1. La cabecera navega a partidos, clasificación e inscripciones.
2. La banda principal destaca el torneo y un marcador en vivo.
3. Los indicadores resumen equipos, encuentros y próxima hora.
4. El calendario presenta partidos y ofrece búsqueda y filtros.
5. La clasificación presenta la posición de cuatro equipos.
6. El formulario valida nombre y correo, y confirma que la solicitud es solo una demostración local.

## 3. Estructura del proyecto

```text
arena-u/
|-- index.html                    # Página inicial y nodo donde React se monta
|-- package.json                  # Dependencias y comandos del proyecto
|-- README.md                     # Esta guía de lectura y ejecución
|-- public/                       # Recursos servidos sin transformar
|-- src/
|   |-- main.jsx                  # Punto de entrada de React
|   |-- App.jsx                   # Composición de pantalla y estado de interfaz
|   |-- App.css                   # Estilos del producto y adaptación móvil
|   |-- index.css                 # Reglas globales, paleta y accesibilidad
|   |-- components/
|   |   |-- AppHeader.jsx         # Marca y navegación
|   |   |-- MatchCard.jsx         # Tarjeta reutilizable con props
|   |   `-- StandingsPanel.jsx    # Tabla reutilizable de posiciones
|   `-- data/
|       `-- tournament.js         # Datos de ejemplo de partidos y equipos
`-- vite.config.js                # Configuración de Vite
```

## 4. Cómo llega el código a la pantalla

### 4.1 `index.html`: documento inicial

Vite abre `index.html`. El elemento `<div id="root"></div>` reserva el espacio para React. `lang="es"` informa el idioma principal a lectores de pantalla y navegadores.

### 4.2 `src/main.jsx`: montaje de React

1. Importa `StrictMode`, que ayuda a detectar problemas durante el desarrollo.
2. Importa los estilos globales y el componente `App`.
3. `createRoot(document.getElementById('root'))` encuentra el contenedor de `index.html`.
4. `.render(<App />)` dibuja la aplicación dentro de ese contenedor.

### 4.3 `src/App.jsx`: composición y comportamiento

`App` combina las piezas y mantiene tres valores con `useState`: el filtro seleccionado, el texto de búsqueda y el mensaje del formulario. El arreglo visible se calcula sin modificar los datos originales:

```jsx
// Conserva partidos cuyo estado y texto coinciden con los controles.
const visibleMatches = matches.filter((match) => {
  const matchesFilter = activeFilter === "all" || match.status === activeFilter;
  const searchableText =
    `${match.homeTeam} ${match.awayTeam} ${match.game}`.toLowerCase();
  return (
    matchesFilter && searchableText.includes(searchTerm.trim().toLowerCase())
  );
});
```

La pantalla usa JSX. Las etiquetas se cierran, cada sección tiene una estructura válida y los valores dinámicos van entre llaves. Los filtros exponen su estado con `aria-pressed`.

### 4.4 `src/data/tournament.js`: datos separados

`matches` contiene lo que necesita cada tarjeta: nombres, juego, hora, estado, marcador, cancha y tonos. `standings` contiene los equipos de la tabla. Mantener los datos separados facilita sustituirlos por una API después.

## 5. Componentes y props

### 5.1 `AppHeader`

Se ocupa de la marca y los enlaces. No necesita props porque su contenido es fijo en esta versión.

### 5.2 `MatchCard`

Se reutiliza para los tres encuentros. Cada instancia recibe valores diferentes:

```jsx
// El padre crea una tarjeta por partido y React usa id como key estable.
matches.map((match) => <MatchCard key={match.id} {...match} />);
```

Dentro de `MatchCard`, las props se desestructuran en la firma. El estado determina si hay marcador y qué etiqueta se presenta.

### 5.3 `StandingsPanel`

Recibe el arreglo `teams` y crea una fila por equipo. Usa una tabla semántica con encabezados y una descripción accesible.

### 5.4 Dirección de datos

Los datos bajan desde `App` a los componentes hijos. Las props son de solo lectura: los componentes las muestran, no las modifican. El formulario tiene estado local y no simula un envío a un servicio inexistente.

## 6. Estilos, idioma y accesibilidad

### 6.1 CSS global y CSS de pantalla

- `src/index.css` define colores, foco visible, selección de texto y movimiento reducido.
- `src/App.css` da estilo a la navegación, el marcador, las tarjetas, los filtros, la tabla y el formulario.
- Las reglas `@media` reorganizan la interfaz en tablet y móvil.

### 6.2 Decisiones accesibles

- El documento está marcado en español; cada sección tiene un título asociado.
- Los iconos decorativos se ocultan con `aria-hidden`.
- El formulario usa etiquetas visibles y validación nativa.
- La búsqueda tiene un nombre accesible y los filtros comunican selección con `aria-pressed`.
- Los estados se nombran con texto; el color solo los acompaña.
- Los cambios de resultados se anuncian con `aria-live`.
- El foco del teclado es visible y se respeta la preferencia de movimiento reducido.

## 7. Cómo modificar el proyecto

### 7.1 Añadir un partido

1. Abre `src/data/tournament.js`.
2. Añade un objeto a `matches` con un `id` único.
3. Usa `live`, `upcoming` o `finished` en `status`.
4. Para partidos en vivo o finalizados, indica `homeScore` y `awayScore`.
5. Guarda y comprueba el resultado en el navegador.

### 7.2 Añadir un equipo a la clasificación

Añade un objeto a `standings` con `name`, `played`, `points` y `tone`. Los tonos disponibles son `lime`, `coral`, `blue`, `yellow` y `violet`.

### 7.3 Cambiar contenido o apariencia

- Edita `src/components/MatchCard.jsx` para cambiar lo que muestra cada encuentro.
- Edita `src/components/StandingsPanel.jsx` para ajustar la tabla.
- Edita `src/App.jsx` para reorganizar secciones o controles.
- Edita `src/App.css` para ajustar la apariencia; usa `src/index.css` para reglas globales.

## 8. Relación con la guía PDF

| Subnivel   | Tema              | Evidencia en el proyecto                                                       |
| ---------- | ----------------- | ------------------------------------------------------------------------------ |
| 1.1        | React y Vite      | `index.html`, `src/main.jsx`, `npm run dev` y `npm run build`                  |
| 1.2        | JSX               | Secciones con raíz, etiquetas cerradas, `className` y expresiones entre llaves |
| 1.3        | Componentes       | `AppHeader`, `MatchCard` y `StandingsPanel` en archivos separados              |
| 1.4        | Props             | Partidos y clasificación se pasan del padre a los hijos                        |
| Reto final | Arena U en piezas | Tres partidos usan una tarjeta común con datos distintos                      |

## 9. Alcance y siguientes pasos

1. **Incluido:** interfaz adaptable, datos de muestra, filtros, búsqueda y confirmación local del formulario.
2. **No incluido:** base de datos, autenticación, API, administración de resultados ni envío real de inscripciones.
3. **Para producción:** conectar el formulario y los datos a un servicio, validar en el servidor y definir quién publica resultados.

> Nota: `package.json` y la configuración JSON no admiten comentarios JavaScript válidos. Por eso se explican aquí; los archivos de código fuente incluyen comentarios por bloque para indicar su responsabilidad.
