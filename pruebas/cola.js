const Cola = require("../src/Cola.js");

const cola = new Cola();
cola.encolar({ mascota: "Lola", tutor: "Ana", horaLlegada: "08:00", motivo: "Vacunación" });
cola.encolar({ mascota: "Toby", tutor: "Carlos", horaLlegada: "08:10", motivo: "Consulta" });
cola.encolar({ mascota: "Mía", tutor: "Laura", horaLlegada: "08:20", motivo: "Control" });
cola.encolar({ mascota: "Max", tutor: "Pedro", horaLlegada: "08:30", motivo: "Radiografía" });
cola.encolar({ mascota: "Luna", tutor: "Sofía", horaLlegada: "08:40", motivo: "Limpieza dental" });
console.log("Turnos en espera:", cola.tamanio());
console.log("Siguiente turno:", cola.verFrente());
console.log("Cola vacía:", cola.estaVacia());
console.log("\nOrden de atención:");

while (!cola.estaVacia()) {
    console.log(cola.desencolar());
}
console.log("\nDesencolar cola vacía:", cola.desencolar());
console.log("Frente:", cola.frente);
console.log("Final:", cola.final);
console.log("Tamaño:", cola.tamanio());
console.log("Cola vacía:", cola.estaVacia());

const cantidad = 100000;
const colaMedicion = new Cola();
const arreglo = [];
const turno = { mascota: "Lola", tutor: "Ana", horaLlegada: "08:00", motivo: "Vacunación" };

console.log("\nComparación de 100.000 turnos:");
console.time("Cola - Encolar");

for (let i = 0; i < cantidad; i++) {
    colaMedicion.encolar(turno);
}
console.timeEnd("Cola - Encolar");
console.time("Cola - Desencolar");

for (let i = 0; i < cantidad; i++) {
    colaMedicion.desencolar();
}
console.timeEnd("Cola - Desencolar");
console.time("Arreglo - Push");

for (let i = 0; i < cantidad; i++) {
    arreglo.push(turno);
}
console.timeEnd("Arreglo - Push");
console.time("Arreglo - Shift");

for (let i = 0; i < cantidad; i++) {
    arreglo.shift();
}
console.timeEnd("Arreglo - Shift");