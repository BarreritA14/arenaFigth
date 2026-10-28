# Guía de Construcción Paso a Paso: Arena U (React 2026)

> **Basado en:** *Pensar en Componentes: Cuaderno de Código 2026 (Nivel 1 en 4 Subniveles)*  
> **Proyecto:** `arena-u` (Copa Pixel 2026)  
> **Stack de referencia del cuaderno:** React 19.3 / Vite 8.3 / Node.js 20.19+ o 22.12+

---

## Índice General

1. [Visión General y Filosofía de Diseño](#1-visión-general-y-filosofía-de-diseño)
2. [Estructura y Jerarquía de Archivos del Proyecto](#2-estructura-y-jerarquía-de-archivos-del-proyecto)
3. [Nivel 1.1 · Del Comando a la Pantalla (React y Vite)](#3-nivel-11--del-comando-a-la-pantalla-react-y-vite)
4. [Nivel 1.2 · Marcado con Reglas Propias (JSX)](#4-nivel-12--marcado-con-reglas-propias-jsx)
5. [Nivel 1.3 · Piezas que Encajan (Componentes)](#5-nivel-13--piezas-que-encajan-componentes)
6. [Nivel 1.4 · Piezas que Reciben Datos (Props)](#6-nivel-14--piezas-que-reciben-datos-props)
7. [Reto Final · Integración Completa de Arena U](#7-reto-final--integración-completa-de-arena-u)
8. [Criterios de Accesibilidad y Buenas Prácticas (WCAG & UX)](#8-criterios-de-accesibilidad-y-buenas-prácticas-wcag--ux)

---

## 1. Visión General y Filosofía de Diseño

El cuaderno enseña a **pensar en componentes**: *"Deja de construir páginas y empieza a construir piezas"*.  
En lugar de crear un archivo HTML monolítico, la interfaz se descompone en un árbol jerárquico siguiendo los principios del **Atomic Web Design** (Brad Frost):
- **Átomos:** Botones, iconos, etiquetas.
- **Moléculas:** Tarjetas (`TarjetaEquipo`, `TarjetaPartido`).
- **Organismos:** Secciones agrupadoras (`Panel`, `Encabezado`).
- **Plantilla / Página:** `App.jsx` ensamblando las piezas.

### Metáfora Clave:
- **React:** Pone las piezas (biblioteca para construir interfaces mediante componentes declarativos).
- **Vite:** Es el taller (crea el proyecto, ejecuta el servidor de desarrollo ultrarrápido con HMR y lo empaqueta para producción).

---

## 2. Estructura y Jerarquía de Archivos del Proyecto

La estructura objetivo para el proyecto `arena-u` tras completar los 4 subniveles es:

```text
arena-u/
├── index.html                  # Punto de entrada HTML (raíz #root, lang="es")
├── package.json                # Dependencias (react, react-dom) y scripts
├── vite.config.js              # Configuración del empaquetador Vite
├── .oxlintrc.json              # Configuración de linter (Oxlint)
├── public/                     # Archivos estáticos servidos directamente
│   ├── favicon.svg
│   ├── icons.svg
│   ├── copa.svg                # Icono trofeo utilizado en Marcador
│   └── escudo.svg              # Icono utilizado en Inscripcion
└── src/
    ├── main.jsx                # Punto de montaje React (createRoot -> #root)
    ├── App.jsx                 # Componente raíz que orquesta los componentes
    ├── App.css                 # Estilos específicos de componentes de la app
    ├── index.css               # Estilos globales y tokens de diseño
    └── components/             # Piezas modulares e independientes
        ├── Encabezado.jsx      # Cabecera de Arena U (Copa Pixel 2026)
        ├── Panel.jsx           # Contenedor reutilizable con prop children
        ├── TarjetaEquipo.jsx   # Tarjeta con datos de equipo
        ├── TarjetaPartido.jsx  # Tarjeta de enfrentamiento con estados
        ├── Marcador.jsx        # Componente de marcador en vivo/final
        └── Inscripcion.jsx     # Formulario/tarjeta de registro a la liga
```

---

## 3. Nivel 1.1 · Del Comando a la Pantalla (React y Vite)

### Objetivo
Crear y arrancar el entorno de desarrollo moderno con Vite, comprendiendo el ciclo desde el comando de la terminal hasta el renderizado en el navegador.

### Paso 1.1.1: Creación del Proyecto
Se genera la plantilla interactiva o declarativa con `create-vite`:
```bash
npm create vite@latest arena-ui -- --template react --no-interactive
cd arena-u
npm install
```
*En el proyecto actual, este paso ya fue ejecutado previamente en el directorio `arena-u`.*

### Paso 1.1.2: Anatomía de la Entrada (`index.html` y `src/main.jsx`)
1. **`index.html`:** Contiene el contenedor DOM:
   ```html
   <div id="root"></div>
   <script type="module" src="/src/main.jsx"></script>
   ```
2. **`src/main.jsx`:** Conecta React con el DOM real usando `createRoot`:
   ```jsx
   import { StrictMode } from 'react'
   import { createRoot } from 'react-dom/client'
   import './index.css'
   import App from './App.jsx'

   createRoot(document.getElementById('root')).render(
     <StrictMode>
       <App />
     </StrictMode>,
   )
   ```

### Paso 1.1.3: Primera Pantalla en `src/App.jsx`
Reemplazar el contenido inicial por una vista limpia de bienvenida:
```jsx
export default function App() {
  return (
    <main>
      <h1>¡Hola, Arena U!</h1>
      <p>Copa Pixel 2026 · 16 cupos</p>
    </main>
  )
}
```

### Paso 1.1.4: Ejecución y Verificación
```bash
npm run dev
```
- Se sirve por defecto en `http://localhost:5173/`.
- **HMR (Hot Module Replacement):** Los cambios guardados se reflejan al instante sin recargar la página completa ni reiniciar el servidor.

---

## 4. Nivel 1.2 · Marcado con Reglas Propias (JSX)

### Objetivo
Dominar la sintaxis JSX para transformar marcado HTML tradicional en código JavaScript válido que el compilador entienda.

### Las 3 Reglas de Oro de JSX:
1. **Una sola raíz:** Todo retorno JSX debe estar envuelto en un único elemento contenedor o en un Fragmento (`<> ... </>`).
2. **Todas las etiquetas se cierran:** Etiquetas autocontenidas como `<img>`, `<input>`, `<br>` deben cerrarse obligatoriamente con `/>` (`<img ... />`, `<input ... />`).
3. **Propiedades en `camelCase` y palabras reservadas:**
   - `class` $\rightarrow$ `className` (evita colisión con la palabra reservada `class` de JS).
   - `for` $\rightarrow$ `htmlFor` (evita colisión con el bucle `for`).
   - `maxlength` $\rightarrow$ `maxLength`.
   - `tabindex` $\rightarrow$ `tabIndex`.
4. **Ventana a JavaScript (`{ }`):**
   - Atributos dinámicos o expresiones van entre llaves: `{goles[0]}`.
   - Atributo de estilo inline recibe un objeto: `style={{ fontSize: 24 }}` (doble llave: externa de JSX, interna del objeto JS).

### Paso 1.2.1: Construcción de `src/components/Marcador.jsx`
Implementación del marcador de la final traduciendo HTML a JSX:
```jsx
export default function Marcador() {
  const local = 'Byte Club'
  const visita = 'Lag Cero'
  const goles = [2, 1]

  return (
    <>
      <h2 className="titulo">Final · Copa Pixel</h2>
      <img
        src="/copa.svg"
        alt="Trofeo de la Copa Pixel"
      />
      <p style={{ fontSize: 24 }}>
        {local} {goles[0]} – {goles[1]} {visita}
      </p>
      <label htmlFor="apodo">Tu apodo</label>
      <input id="apodo" maxLength={12} />
    </>
  )
}
```

### Paso 1.2.2: Construcción de `src/components/Inscripcion.jsx`
Componente para la misión de inscripción aplicando todas las reglas de marcado:
```jsx
export default function Inscripcion() {
  const cupos = 13

  return (
    <>
      <h2 className="titulo">Inscripción</h2>
      <img src="/escudo.svg" alt="Escudo de la Copa" />
      <label htmlFor="nombre">Equipo</label>
      <input id="nombre" maxLength={20} />
      <p>Quedan {cupos} cupos</p>
    </>
  )
}
```

---

## 5. Nivel 1.3 · Piezas que Encajan (Componentes)

### Objetivo
Modularizar la interfaz separando responsabilidades: convertir bloques de código en funciones independientes que devuelven JSX, ubicadas en archivos propios dentro de `src/components/`.

### Reglas para Definir Componentes:
- **Nombre en PascalCase:** Siempre iniciar con Mayúscula (`TarjetaEquipo`, `Encabezado`). Si empieza con minúscula (`tarjetaEquipo`), React lo interpreta como una etiqueta HTML nativa no reconocida.
- **Declaración en el nivel superior:** Nunca definir un componente dentro del cuerpo de otra función/componente.
- **Exportación e Importación:** Un componente por archivo usando `export default` e importándolo donde se necesite.

### Paso 1.3.1: Creación de `src/components/Encabezado.jsx`
```jsx
export default function Encabezado() {
  return (
    <header className="encabezado">
      <h1>Arena U</h1>
      <p>Copa Pixel 2026 · 16 cupos</p>
    </header>
  )
}
```

### Paso 1.3.2: Creación de `src/components/TarjetaEquipo.jsx` (Versión Estática)
```jsx
export default function TarjetaEquipo() {
  return (
    <article className="tarjeta">
      <h3>Los Pixelados</h3>
      <p>5 jugadores</p>
    </article>
  )
}
```

### Paso 1.3.3: Ensamblado Inicial en `src/App.jsx`
```jsx
import Encabezado from './components/Encabezado.jsx'
import TarjetaEquipo from './components/TarjetaEquipo.jsx'

export default function App() {
  return (
    <>
      <Encabezado />
      <TarjetaEquipo />
      <TarjetaEquipo />
    </>
  )
}
```

---

## 6. Nivel 1.4 · Piezas que Reciben Datos (Props)

### Objetivo
Permitir que un componente sea dinámico y reutilizable recibiendo datos desde su componente padre como argumentos de función.

### Reglas de las Props:
1. **Flujo unidireccional (de padre a hijo):** Los datos bajan del componente padre al hijo como atributos JSX.
2. **Inmutabilidad (Solo lectura):** Un componente hijo **nunca** debe modificar directamente sus props (`props.nombre = ...` genera error en React). Si se requiere transformar el valor, se almacena en una variable local.
3. **Desestructuración en la firma:** Declarar `{ nombre, jugadores, enVivo = false }` en los parámetros de la función para mayor claridad.
4. **Prop especial `children`:** Representa cualquier contenido que se anide entre la etiqueta de apertura y cierre de un componente (`<Panel> ... </Panel>`).

### Paso 1.4.1: Refactorización Dinámica de `src/components/TarjetaEquipo.jsx`
```jsx
export default function TarjetaEquipo({
  nombre,
  jugadores,
  enVivo = false,
}) {
  return (
    <article className="tarjeta">
      <h3>{nombre}</h3>
      <p>{jugadores} jugadores</p>
      <span>
        {enVivo ? 'En vivo' : 'Por jugar'}
      </span>
    </article>
  )
}
```

### Paso 1.4.2: Creación del Contenedor `src/components/Panel.jsx` (Uso de `children`)
```jsx
export default function Panel({ titulo, children }) {
  return (
    <section className="panel">
      <h2>{titulo}</h2>
      {children}
    </section>
  )
}
```

### Paso 1.4.3: Creación de `src/components/TarjetaPartido.jsx` (Misión 1.4)
Componente modular para los enfrentamientos de la liga:
```jsx
export default function TarjetaPartido({
  local,
  visita,
  hora,
  enVivo = false,
}) {
  return (
    <article className="partido">
      <h3>{local} – {visita}</h3>
      <p>Hora: {hora}</p>
      <span>{enVivo ? 'En vivo' : 'Por jugar'}</span>
    </article>
  )
}
```

---

## 7. Reto Final · Integración Completa de Arena U

### Objetivo
Unir los 4 subniveles en una pantalla consolidada de Arena U:
- Estructura limpia y modular en `src/components/`.
- Reutilización de piezas mediante `Panel` y `TarjetaPartido`.
- Paso de props de diferentes tipos (texto, números, booleanos, JSX anidado).

### Código Definitivo de `src/App.jsx` para el Reto Final
```jsx
import Encabezado from './components/Encabezado.jsx'
import Panel from './components/Panel.jsx'
import TarjetaPartido from './components/TarjetaPartido.jsx'

export default function App() {
  return (
    <main className="arena-app">
      <Encabezado />

      <Panel titulo="Partidos de Hoy">
        <TarjetaPartido
          local="Byte Club"
          visita="Lag Cero"
          hora="18:00"
          enVivo={true}
        />
        <TarjetaPartido
          local="Los Pixelados"
          visita="Glitch"
          hora="20:00"
          enVivo={false}
        />
        <TarjetaPartido
          local="Devs FC"
          visita="Null Pointers"
          hora="21:30"
          enVivo={false}
        />
      </Panel>
    </main>
  )
}
```

---

## 8. Criterios de Accesibilidad y Buenas Prácticas (WCAG & UX)

El cuaderno establece pautas de diseño y experiencia de usuario que acompañan a cada subnivel:

1. **Jerarquía Semántica de Títulos (WCAG 2.4.6):**
   - Usar un solo `<h1>` por pantalla principal (`Encabezado`).
   - Usar `<h2>` para títulos de secciones (`Panel`, `Marcador`).
   - Usar `<h3>` para elementos internos de tarjetas (`TarjetaPartido`, `TarjetaEquipo`).

2. **Texto Alternativo (`alt`) en Imágenes (WCAG 1.1.1):**
   - Toda imagen informativa debe describir su significado (`alt="Trofeo de la Copa Pixel"`).
   - Nunca omitir el atributo `alt`.

3. **Asociación de Formularios (`htmlFor` e `id`):**
   - Todo `<label>` debe estar asociado a su `<input>` mediante `htmlFor="campoId"` e `id="campoId"`.
   - Los placeholders no reemplazan a una etiqueta visible (Sherwin, NN/g).

4. **Estados con Texto y No Solo Color (WCAG 1.4.1):**
   - El estado «En vivo» o «Por jugar» debe expresarse en texto legible, no únicamente mediante colores rojo o verde.

5. **Idioma del Documento (WCAG 3.1.1):**
   - Asegurar que `index.html` declare `<html lang="es">` para la correcta pronunciación en lectores de pantalla.

6. **Área Táctil Mínima (WCAG 2.5.8):**
   - Los elementos interactivos deben medir al menos 24 × 24 píxeles CSS.
