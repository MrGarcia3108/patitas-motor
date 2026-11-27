const Nodo = require("./Nodo.js");

class Cola {
    constructor() {
        this.frente = null;
        this.final = null;
        this.cantidad = 0;
    }
    encolar(dato) {
        const nuevo = new Nodo(dato);
        if (this.estaVacia()) {
            this.frente = nuevo;
            this.final = nuevo;
        }
        else {
            this.final.siguiente = nuevo;
            this.final = nuevo;
        }
        this.cantidad++;
    }
    desencolar() {
        if (this.estaVacia()) {
            return null;
        }
        const dato = this.frente.dato;
        this.frente = this.frente.siguiente;
        this.cantidad--;

        if (this.estaVacia()) {
            this.final = null;
        }

        return dato;
    }
    verFrente() {
        if (this.estaVacia()) {
            return null;
        }

        return this.frente.dato;
    }
    estaVacia() {
        return this.cantidad === 0;
    }
    tamanio() {
        return this.cantidad;
    }
}

module.exports = Cola;
