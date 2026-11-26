## MiniReto 1: Nodo y repositorio en Github
### Diagrama de nodos

- cabeza
- [Vacunación | siguiente]
- [Control de peso | siguiente]
- [Limpieza dental | null]

### Enlace perdido

- cabeza
- [Vacunación | null]
- [Control de peso] --> [Limpieza dental] --> null

El recorrido solamente muestra la primera atención porque su referencia siguiente es null.

## MiniReto 2: Lista enlazada

### Dibujos 

**1. lista vacía**

Antes: cabeza = null, cola = null
Después: cabeza y cola --> [A] --> null
Cambian cabeza y cola. Tamaño: 0 → 1.

**2. lista con un nodo**

Antes:   cabeza y cola --> [A] --> null
Después: cabeza --> [A] --> [B] --> null
Cambian la referencia siguiente de A y la cola. Tamaño: 1 → 2.

**3. lista con varios nodos**

Antes:   cabeza --> [A] --> [B] --> null
Después: cabeza --> [A] --> [B] --> [C] --> null
Cambian la referencia siguiente de B y la cola. Tamaño: 2 → 3.

**4. inicio de una lista vacía**

Antes: cabeza = null, cola = null
Después: cabeza y cola --> [A] --> null
Cambian cabeza y cola. Tamaño: 0 → 1.

**5. inicio de una lista con un nodo**

Antes:   cabeza y cola --> [A] --> null
Después: cabeza --> [B] --> [A] --> null
Cambian la referencia siguiente de B y la cabeza. Tamaño: 1 → 2.

**6. inicio de una lista con varios nodos**

Antes:   cabeza --> [B] --> [A] --> null
Después: cabeza --> [C] --> [B] --> [A] --> null
Cambian la referencia siguiente de C y la cabeza. Tamaño: 2 → 3.

### Complejidad de los métodos

| Método | Tiempo | Espacio | Justificación |
|---|---|---|---|
| constructor | O(1) | O(1) | Inicializa las propiedades. |
| agregarAlFinal | O(1) | O(1) | Accede directamente a la cola. |
| agregarAlInicio | O(1) | O(1) | Accede directamente a la cabeza. |
| recorrer | O(n) | O(1) | Recorre todos los nodos. |
| aArreglo | O(n) | O(n) | Crea un arreglo. |
| estaVacia | O(1) | O(1) | Compara con cero. |
| obtenerTamanio | O(1) | O(1) | tamaño almacenado. |

## MiniReto 3: Corregir sin romper cadena

### Dibujos

**1. Eliminar la cabeza**

Antes:
cabeza              cola
   |                  |
   v                  v
  [A] ----> [B] ---> [C] ---> null

Después:
cabeza     cola
   |         |
   v         v
  [B] ----> [C] ---> null

**2. Eliminar un nodo intermedio**

Antes:
cabeza              cola
   |                  |
   v                  v
  [A] ----> [B] ---> [C] ---> null

Después:
cabeza     cola
   |         |
   v         v
  [A] ----> [C] ---> null

**3. Eliminar la cola**

Antes:
cabeza              cola
   |                  |
   v                  v
  [A] ----> [B] ---> [C] ---> null

Después:
cabeza     cola
   |         |
   v         v
  [A] ----> [B] ---> null

### Complejidad de las operaciones

| Método | Tiempo | Espacio | Justificación |
|---|---|---|---|
| buscar | O(n) | O(1) | Hasta encontrar el dato. |
| insertarDespuesDe | O(n) | O(1) | Busca el nodo y modifica. |
| eliminar | O(n) | O(1) | Busca el nodo conservando. |

### ¿Por qué eliminar la cola requiere recorrerla?

Una solamente tiene referencias hacia el siguiente nodo. Aunque existe una referencia directa, no podemos acceder directamente.