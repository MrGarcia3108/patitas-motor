# Patitas Motor v0.2

## Descripción

Gestión de historiales clínicos veterinarios. Permite registrar, recorrer, buscar, insertar y eliminar atenciones, gestionar turnos con prioridad, calcular tiempos de espera y deshacer o rehacer.

## Estructuras

- **Nodo:** almacena un dato y una referencia al siguiente nodo.
- **ListaEnlazada:** conecta nodos mediante cabeza, cola y tamaño.
- **RegistroClinico:** administra una lista enlazada por mascota mediante Map.
- **Cola:** gestiona los turnos de atención mediante FIFO.
- **Recepcion:** administra dos colas, dando prioridad a las urgencias.
- **Pila:** almacena acciones mediante LIFO.
- **Editor:** permite agregar, eliminar, deshacer y rehacer acciones mediante dos pilas.

## Estructura del proyecto

```text
patitas-motor/
├── src/
│   ├── Nodo.js
│   ├── ListaEnlazada.js
│   ├── RegistroClinico.js
│   ├── reporte.js
│   ├── Cola.js
│   ├── Recepcion.js
│   ├── Pila.js
│   ├── Editor.js
│   └── simulacion.js
├── pruebas/
│   ├── nodos.js
│   ├── lista.js
│   └── cola.js
├── bitacora.md
└── README.md
```

## Ejecución y pruebas

- Node.js instalado.
- Ejecutar desde la raíz del proyecto.
- `node src/reporte.js`
- `node src/simulacion.js`
- `node pruebas/nodos.js`
- `node pruebas/lista.js`
- `node pruebas/cola.js`
- `node src/Editor.js`