const Nodo = require("./Nodo.js");

class ListaEnlazada {
    constructor() {
        this.cabeza = null;
        this.cola = null;
        this.tamanio = 0;
    }

    agregarAlFinal(dato) {
        const nuevo = new Nodo(dato);
        if (this.cabeza === null) {
            this.cabeza = nuevo;
            this.cola = nuevo;
        }
        else {
            this.cola.siguiente = nuevo;
            this.cola = nuevo;
        }
        this.tamanio++;
    }
    agregarAlInicio(dato) {
        const nuevo = new Nodo(dato);
        if (this.cabeza === null) {
            this.cabeza = nuevo;
            this.cola = nuevo;
        }
        else {
            nuevo.siguiente = this.cabeza;
            this.cabeza = nuevo;
        }
        this.tamanio++;
    }
    recorrer(callback) {
        let actual = this.cabeza;
        while (actual !== null) {
            callback(actual.dato);
            actual = actual.siguiente;
        }
    }
    aArreglo() {
        const datos = [];
        this.recorrer(dato => datos.push(dato));
        return datos;
    }
    estaVacia() {
        return this.tamanio === 0;
    }
    obtenerTamanio() {
        return this.tamanio;
    }
    buscar(condicion) {
        let actual = this.cabeza;
        while (actual !== null) {
            if (condicion(actual.dato)) {
                return actual.dato;
            }
            actual = actual.siguiente;
        }
        return null;
    }
    insertarDespuesDe(condicion, dato) {
        let actual = this.cabeza;
        while (actual !== null) {
            if (condicion(actual.dato)) {
                const nuevo = new Nodo(dato);
                nuevo.siguiente = actual.siguiente;
                actual.siguiente = nuevo;
                if (actual === this.cola) {
                    this.cola = nuevo;
                }
                this.tamanio++;
                return true;
            }
            actual = actual.siguiente;
        }
        return false;
    }
    eliminar(condicion) {
        let anterior = null;
        let actual = this.cabeza;
        while (actual !== null) {
            if (condicion(actual.dato)) {
                if (anterior === null) {
                    this.cabeza = actual.siguiente;
                }
                else {
                    anterior.siguiente = actual.siguiente;
                }
                if (actual === this.cola) {
                    this.cola = anterior;
                }
                this.tamanio--;
                return actual.dato;
            }
            anterior = actual;
            actual = actual.siguiente;
        }
        return null;
    }
    tamanioRecursivo() {
        function contar(nodo) {
            if (nodo === null) {
                return 0;
            }
            return 1 + contar(nodo.siguiente);
        }
        return contar(this.cabeza);
    }
    costoTotalRecursivo() {
        function sumar(nodo) {
            if (nodo === null) {
                return 0;
            }
            return nodo.dato.costo + sumar(nodo.siguiente);
        }
        return sumar(this.cabeza);
    }
    buscarRecursivo(condicion) {
        function buscarNodo(nodo) {
            if (nodo === null) {
                return null;
            }
            if (condicion(nodo.dato)) {
                return nodo.dato;
            }
            return buscarNodo(nodo.siguiente);
        }
        return buscarNodo(this.cabeza);
    }
    imprimirAlReves() {
        function imprimir(nodo) {
            if (nodo === null) {
                return;
            }
            imprimir(nodo.siguiente);
            console.log(nodo.dato);
        }
        imprimir(this.cabeza);
    }
}

module.exports = ListaEnlazada;

if (require.main === module) {
    const lola = new ListaEnlazada();
    const toby = new ListaEnlazada();
    const mia = new ListaEnlazada();

    lola.agregarAlFinal({ fecha: "02/02", motivo: "Vacunación anual", veterinario: "Dra. Ríos", costo: 85000 });
    lola.agregarAlFinal({ fecha: "15/03", motivo: "Control de peso", veterinario: "Dr. Gómez", costo: 40000 });
    lola.agregarAlFinal({ fecha: "20/05", motivo: "Limpieza dental", veterinario: "Dra. Ríos", costo: 150000 });
    toby.agregarAlFinal({ fecha: "10/01", motivo: "Consulta cojera", veterinario: "Dr. Gómez", costo: 60000 });
    toby.agregarAlFinal({ fecha: "12/01", motivo: "Radiografía pata", veterinario: "Dr. Gómez", costo: 120000 });
    toby.agregarAlFinal({ fecha: "05/04", motivo: "Vacunación anual", veterinario: "Dra. Ríos", costo: 85000 });
    mia.agregarAlFinal({ fecha: "18/02", motivo: "Esterilización", veterinario: "Dra. Ríos", costo: 280000 });
    mia.agregarAlFinal({ fecha: "25/02", motivo: "Control posquirúrgico", veterinario: "Dra. Ríos", costo: 0 });

    function comparar(nombre, historial, condicion) {
        console.log("\nHISTORIAL DE " + nombre.toUpperCase());
        let cantidad = 0;
        let costoTotal = 0;
        historial.recorrer(atencion => {
            cantidad++;
            costoTotal += atencion.costo;
        });

        console.log("Tamaño iterativo:", cantidad);
        console.log("Tamaño recursivo:", historial.tamanioRecursivo());
        console.log("Tamaño almacenado:", historial.obtenerTamanio());
        console.log("Costo iterativo:", costoTotal);
        console.log("Costo recursivo:", historial.costoTotalRecursivo());
        console.log("Búsqueda iterativa:", historial.buscar(condicion));
        console.log("Búsqueda recursiva:", historial.buscarRecursivo(condicion));
        console.log("Orden inverso iterativo:");

        const atenciones = historial.aArreglo();
        for (let i = atenciones.length - 1; i >= 0; i--) {
            console.log(atenciones[i]);
        }
        console.log("Orden inverso recursivo:");
        historial.imprimirAlReves();
    }
    comparar("Lola", lola, dato => dato.motivo === "Control de peso");
    comparar("Toby", toby, dato => dato.motivo === "Radiografía pata");
    comparar("Mía", mia, dato => dato.motivo === "Esterilización");
    console.log("\nPRUEBA CON 100.000 ATENCIONES");
    const listaGrande = new ListaEnlazada();
    for (let i = 0; i < 100000; i++) {
        listaGrande.agregarAlFinal({
            motivo: "Atención " + (i + 1),
            costo: 60000
        });
    }
    console.log("Tamaño almacenado:", listaGrande.obtenerTamanio());
    try {
        console.log("Tamaño recursivo:", listaGrande.tamanioRecursivo());
    }
    catch (error) {
        console.log(error.name + ": " + error.message);
    }
}