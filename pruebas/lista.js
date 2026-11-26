const ListaEnlazada = require("../src/ListaEnlazada.js");

function verificar(nombre, lista, esperado) {
    const datos = lista.aArreglo();
    const ordenCorrecto = JSON.stringify(datos) === JSON.stringify(esperado);
    const cabezaCorrecta = esperado.length === 0 ? lista.cabeza === null : lista.cabeza?.dato === esperado[0];
    const colaCorrecta = esperado.length === 0 ? lista.cola === null : lista.cola?.dato === esperado[esperado.length - 1];
    const tamanioCorrecto = lista.obtenerTamanio() === esperado.length;
    const referenciasCorrectas = esperado.length === 0
        ? lista.cabeza === null && lista.cola === null
        : lista.cola?.siguiente === null && (esperado.length !== 1 || lista.cabeza === lista.cola);
    const correcto = ordenCorrecto && cabezaCorrecta && colaCorrecta &&
        tamanioCorrecto && referenciasCorrectas;
    console.log(nombre, correcto ? "OK" : "ERROR");
    console.log("Datos:", datos);
    console.log("Cabeza:", lista.cabeza?.dato ?? null, "| Cola:", lista.cola?.dato ?? null, "| Tamaño:", lista.obtenerTamanio());
}

const listaFinal = new ListaEnlazada();
console.log("Lista vacía:", listaFinal.estaVacia());
listaFinal.agregarAlFinal(10);
verificar("Final - Lista vacía:", listaFinal, [10]);
listaFinal.agregarAlFinal(20);
verificar("Final - Un nodo:", listaFinal, [10, 20]);
listaFinal.agregarAlFinal(30);
verificar("Final - Varios nodos:", listaFinal, [10, 20, 30]);

const listaInicio = new ListaEnlazada();
listaInicio.agregarAlInicio(10);
verificar("Inicio - Lista vacía:", listaInicio, [10]);
listaInicio.agregarAlInicio(20);
verificar("Inicio - Un nodo:", listaInicio, [20, 10]);
listaInicio.agregarAlInicio(30);
verificar("Inicio - Varios nodos:", listaInicio, [30, 20, 10]);
console.log("Lista vacía:", listaInicio.estaVacia());

console.log("\nMINIRETO 3");

const lista = new ListaEnlazada();
console.log("Dato eliminado:", lista.eliminar(dato => dato === 10));
verificar("Eliminar en lista vacía:", lista, []);
lista.agregarAlFinal(10);
console.log("Dato eliminado:", lista.eliminar(dato => dato === 10));
verificar("Eliminar único nodo:", lista, []);
lista.agregarAlFinal(10);
lista.agregarAlFinal(20);
lista.agregarAlFinal(30);
console.log("Dato eliminado:", lista.eliminar(dato => dato === 10));
verificar("Eliminar cabeza:", lista, [20, 30]);
console.log("Dato eliminado:", lista.eliminar(dato => dato === 30));
verificar("Eliminar cola:", lista, [20]);
console.log("Dato eliminado:", lista.eliminar(dato => dato === 100));
verificar("Eliminar dato inexistente:", lista, [20]);
console.log("Insertado:", lista.insertarDespuesDe(dato => dato === 20, 40));
verificar("Insertar después de la cola:", lista, [20, 40]);
console.log("Buscar 40:", lista.buscar(dato => dato === 40));
console.log("Buscar 100:", lista.buscar(dato => dato === 100));