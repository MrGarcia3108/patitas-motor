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
cabeza [A] ----> [B] ---> cola [C] ---> null 

Después:
cabeza [B] ----> cola [C] ---> null

**2. Eliminar un nodo intermedio**

Antes:
cabeza [A] ----> [B] ---> cola [C] ---> null

Después:
cabeza [A] ----> cola [C] ---> null

**3. Eliminar la cola**

Antes:
cabeza [A] ----> [B] ---> cola [C] ---> null

Después:
cabeza [A] ----> cola [B] ---> null

### Complejidad de las operaciones

| Método | Tiempo | Espacio | Justificación |
|---|---|---|---|
| buscar | O(n) | O(1) | Hasta encontrar el dato. |
| insertarDespuesDe | O(n) | O(1) | Busca el nodo y modifica. |
| eliminar | O(n) | O(1) | Busca el nodo conservando. |

### ¿Por qué eliminar la cola requiere recorrerla?

Una solamente tiene referencias hacia el siguiente nodo. Aunque existe una referencia directa, no podemos acceder directamente.

## MiniReto 4: Patitas v0.1

### Comparación lista enlazada y arreglo

| Operación | ListaEnlazada | Arreglo |
|---|---|---|
| Agregar al final | O(1) | O(1) amortizado |
| Agregar al inicio | O(1) | O(n) |
| Acceder a la atención número k | O(k), peor caso O(n) | O(1) |
| Buscar | O(n) | O(n) |
| Eliminar la primera | O(1) | O(n) |

## MiniReto 5: La sala de espera

### Dibujos 

**Después de encolar a Lola, Toby y Mía:**

frente [Lola] ----> [Toby] ----> final [Mía] ---> null
Cantidad: 3

**Después de desencolar una vez:**

frente [Toby] ----> final [Mía] ---> null
Cantidad: 2

### Medición con 100.000

| Operación | Tiempo |
|---|---|
| Cola - Encolar | 17.546ms |
| Cola - Desencolar | 2.301ms |
| Arreglo - Push | 3.482ms |
| Arreglo - Shift | 1.760s |

### Comparación

| Operación | Cola con nodos | Arreglo | Justificación |
|---|---|---|---|
| Encolar | O(1) | O(1) amortizado | La cola accede directamente al final. |
| Desencolar | O(1) | O(n) | La cola actualiza el frente. |
| Ver frente | O(1) | O(1) | Acceso directo al primer elemento. |
| Está vacía | O(1) | O(1) | Consulta la cantidad de elementos. |
| Tamaño | O(1) | O(1) | La cantidad se encuentra almacenada. |

### Diferencia de rendimiento

- La cola basada en nodos permite encolar porque tiene referencias directas al frente y al final.
- El arreglo utiliza push para insertar y shift para eliminar.
- Al desencolar, la cola tiene una complejidad total O(n).

## MiniReto 6: Urgencias primero

### Cálculo

| Mascota | Tipo | Llegada | Atención | Espera |
|---|---|---|---|---|
| Toby | General | 8:00 | 8:00 | 0 min |
| Luna | Urgencia | 8:10 | 8:20 | 10 min |
| Kira | Urgencia | 8:25 | 8:40 | 15 min |
| Rocky | Urgencia | 9:00 | 9:00 | 0 min |
| Max | General | 8:05 | 9:20 | 75 min |
| Simón | General | 8:20 | 9:40 | 80 min |
| Nala | General | 8:40 | 10:00 | 80 min |


Promedio urgencias: (10 + 15 + 0) / 3 = 8.33 min.
Promedio generales: (0 + 75 + 80 + 80) / 4 = 58.75 min.

### Comparación con el programa

| Resultado | Cálculo manual | Programa |
|---|---|---|
| Orden de atención | Toby, Luna, Kira, Rocky, Max, Simón, Nala | Toby, Luna, Kira, Rocky, Max, Simón, Nala |
| Promedio urgencias | 8.33 min | 8.33 min |
| Promedio generales | 58.75 min | 58.75 min |

- Toby va primero porque fue el primero en llegar, cuando luna llego, a toby ya lo estaban atendiendo por eso le toca esperar aunque fuera de urgencias.
- A continuacion, se sigue con las mascotas que vengan con urgencias, y las mascotas que llegaron desde antes pero que tienen cita general les tocaria esperar.

## MiniReto 7: Deshacer y rehacer

### justificacion de estructura

Utilize pila utilizando nodos para reutilizar la clase Nodo y realizar todas las operaciones en tiempo constante.

### Traza de las acciones

**1. Agregar A**

Historial: cabeza y cola [A] ---> null
Deshacer: tope [Agregar A] ---> null
Rehacer: null

**2. Agregar B**

Historial: cabeza [A] ---> cola [B] ---> null
Deshacer: tope [Agregar B] ---> [Agregar A] ---> null
Rehacer: null

**3. Eliminar A**

Historial: cabeza y cola [B] ---> null
Deshacer: tope [Eliminar A] ---> [Agregar B] ---> [Agregar A] ---> null
Rehacer: null

**4. Deshacer**

Historial: cabeza [A] ---> cola [B] ---> null
Deshacer: tope [Agregar B] ---> [Agregar A] ---> null
Rehacer: tope [Eliminar A] ---> null

**5. Deshacer**

Historial: cabeza y cola [A] ---> null
Deshacer: tope [Agregar A] ---> null
Rehacer: tope [Agregar B] ---> [Eliminar A] ---> null

**6. Rehacer**

Historial: cabeza [A] ---> cola [B] ---> null
Deshacer: tope [Agregar B] ---> [Agregar A] ---> null
Rehacer: tope [Eliminar A] ---> null

**7. Agregar C**

Historial: cabeza [A] ---> [B] ---> cola [C] ---> null
Deshacer: tope [Agregar C] ---> [Agregar B] ---> [Agregar A] ---> null
Rehacer: null

**8. Rehacer**

Historial: cabeza [A] ---> [B] ---> cola [C] ---> null
Deshacer: tope [Agregar C] ---> [Agregar B] ---> [Agregar A] ---> null
Rehacer: null

## MiniReto 8: Patitas v0.2 — La recepción completa

### Estructuras de datos del motor

| Estructura | Principio | Uso | Complejidad de operaciones |
|---|---|---|---|
| Lista enlazada | Secuencial | Almacenar los historiales. | Agregar al inicio y al final: O(1). |
| Cola | FIFO | Administrar turnos de urgencias y generales. | Encolar, desencolar, ver frente, consultar tamaño: O(1). |
| Pila | LIFO | Acciones de deshacer y rehacer del editor. | Apilar, desapilar, ver tope, consultar tamaño: O(1). |
| Map | Clave-valor | Asociar mascota con su historial. | Insertar, consultar y eliminar por clave. |