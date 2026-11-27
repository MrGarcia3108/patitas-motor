const Pila = require("./Pila.js");
const RegistroClinico = require("./RegistroClinico.js");

class Editor {
    constructor() {
        this.registro = new RegistroClinico();
        this.pilaDeshacer = new Pila();
        this.pilaRehacer = new Pila();
    }
    agregar(mascota, atencion) {
        this.registro.registrarAtencion(mascota, atencion);

        this.pilaDeshacer.apilar({
            tipo: "agregar",
            mascota,
            atencion
        });
        this.pilaRehacer = new Pila();
    }
    eliminar(mascota, condicion) {
        const historial = this.registro.historiales.get(mascota);
        if (!historial) {
            return null;
        }
        let anterior = null;
        let actual = historial.cabeza;
        while (actual !== null && !condicion(actual.dato)) {
            anterior = actual;
            actual = actual.siguiente;
        }
        if (actual === null) {
            return null;
        }
        const atencion = historial.eliminar(dato => dato === actual.dato);
        this.pilaDeshacer.apilar({
            tipo: "eliminar",
            mascota,
            atencion,
            anterior: anterior === null ? null : anterior.dato
        });
        this.pilaRehacer = new Pila();
        return atencion;
    }
    deshacer() {
        const accion = this.pilaDeshacer.desapilar();
        if (accion === null) {
            return null;
        }
        const historial = this.registro.historiales.get(accion.mascota);
        if (accion.tipo === "agregar") {
            historial.eliminar(dato => dato === accion.atencion);
        }
        else {
            if (accion.anterior === null) {
                historial.agregarAlInicio(accion.atencion);
            }
            else {
                historial.insertarDespuesDe(
                    dato => dato === accion.anterior,
                    accion.atencion
                );
            }
        }
        this.pilaRehacer.apilar(accion);
        return accion;
    }
    rehacer() {
        const accion = this.pilaRehacer.desapilar();
        if (accion === null) {
            return null;
        }
        if (accion.tipo === "agregar") {
            this.registro.registrarAtencion(accion.mascota, accion.atencion);
        }
        else {
            const historial = this.registro.historiales.get(accion.mascota);

            historial.eliminar(dato => dato === accion.atencion);
        }
        this.pilaDeshacer.apilar(accion);
        return accion;
    }
}

module.exports = Editor;

if (require.main === module) {
    const editor = new Editor();
    const A = { fecha: "02/02", motivo: "Vacunación", veterinario: "Dra. Ríos", costo: 85000 };
    const B = { fecha: "15/03", motivo: "Control de peso", veterinario: "Dr. Gómez", costo: 40000 };
    const C = { fecha: "20/05", motivo: "Limpieza dental", veterinario: "Dra. Ríos", costo: 150000 };
    function mostrar(paso) {
        const historial = editor.registro.historiales.get("Lola");
        console.log("\n" + paso);
        console.log("Historial:", historial.aArreglo().map(dato => dato.motivo));
        console.log("Deshacer:", editor.pilaDeshacer.tamanio());
        console.log("Rehacer:", editor.pilaRehacer.tamanio());
    }

    editor.agregar("Lola", A);
    mostrar("1. Agregar A");
    editor.agregar("Lola", B);
    mostrar("2. Agregar B");
    editor.eliminar("Lola", dato => dato === A);
    mostrar("3. Eliminar A");
    editor.deshacer();
    mostrar("4. Deshacer");
    editor.deshacer();
    mostrar("5. Deshacer");
    editor.rehacer();
    mostrar("6. Rehacer");
    editor.agregar("Lola", C);
    mostrar("7. Agregar C");
    editor.rehacer();
    mostrar("8. Rehacer");

    const editorVacio = new Editor();
    console.log("\nDeshacer vacío:", editorVacio.deshacer());
    console.log("Rehacer vacío:", editorVacio.rehacer());
}