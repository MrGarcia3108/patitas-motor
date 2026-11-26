const ListaEnlazada = require("../src/ListaEnlazada.js");

function verificar(nombre, lista, esperado) {
    const datos = lista.aArreglo();
    const ordenCorrecto = JSON.stringify(datos) === JSON.stringify(esperado);
    const cabezaCorrecta = lista.cabeza.dato === esperado[0];
    const colaCorrecta = lista.cola.dato === esperado[esperado.length - 1];
    const tamanioCorrecto = lista.obtenerTamanio() === esperado.length;
    const referenciasCorrectas = lista.cola.siguiente === null &&
        (esperado.length !== 1 || lista.cabeza === lista.cola);
    const correcto = ordenCorrecto && cabezaCorrecta && colaCorrecta &&
        tamanioCorrecto && referenciasCorrectas;
    console.log(nombre, correcto ? "OK" : "ERROR");
    console.log("Datos:", datos);
    console.log("Cabeza:", lista.cabeza.dato, "| Cola:", lista.cola.dato, "| Tamaño:", lista.obtenerTamanio());
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