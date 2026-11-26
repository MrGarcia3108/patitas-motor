# Patitas Motor v0.1

## Descripción

Gestión de historiales clínicos veterinarios. Permite registrar, recorrer, buscar, insertar y eliminar atenciones clínicas.

## Estructuras

- **Nodo:** almacena una atención clínica.
- **ListaEnlazada:** Nnodos mediante cabeza, cola y tamaño.
- **RegistroClinico:** Lista enlazada por mascota con Map.

## Estructura del proyecto

```
patitas-motor/
├── src/
│   ├── Nodo.js
│   ├── ListaEnlazada.js
│   ├── RegistroClinico.js
│   └── reporte.js
├── pruebas/
│   ├── nodos.js
│   └── lista.js
├── bitacora.md
└── README.md
```

## Ejecución y pruebas

- Node.js instalado.
- Desde la raíz.
- [ node src/reporte.js ]
- node pruebas/nodos.js
- node pruebas/lista.js
