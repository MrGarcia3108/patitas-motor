const Recepcion = require("./Recepcion.js");
const Editor = require("./Editor.js");

const turnos = [
    { horaLlegada: 480, mascota: "Toby", tipo: "General", motivo: "Control de vacunas" },
    { horaLlegada: 485, mascota: "Max", tipo: "General", motivo: "Revisión de piel" },
    { horaLlegada: 490, mascota: "Luna", tipo: "Urgencia", motivo: "Intoxicación" },
    { horaLlegada: 500, mascota: "Simón", tipo: "General", motivo: "Corte de uñas" },
    { horaLlegada: 505, mascota: "Kira", tipo: "Urgencia", motivo: "Herida en pata" },
    { horaLlegada: 520, mascota: "Nala", tipo: "General", motivo: "Desparasitación" },
    { horaLlegada: 540, mascota: "Rocky", tipo: "Urgencia", motivo: "Dificultad para respirar" }
];

function formatearHora(minutos) {
    const horas = Math.floor(minutos / 60);
    const resto = minutos % 60;
    return horas + ":" + String(resto).padStart(2, "0");
}

const recepcion = new Recepcion();
const editor = new Editor();

let tiempo = 480;
let indice = 0;
let esperaUrgencias = 0;
let esperaGenerales = 0;
let cantidadUrgencias = 0;
let cantidadGenerales = 0;

console.log("ORDEN DE ATENCIÓN\n");
while (
    indice < turnos.length ||
    !recepcion.urgencias.estaVacia() ||
    !recepcion.generales.estaVacia()
) {
    while (indice < turnos.length && turnos[indice].horaLlegada <= tiempo) {
        recepcion.registrarLlegada(turnos[indice]);
        indice++;
    }
    const turno = recepcion.llamarSiguiente();
    if (turno === null) {
        console.log("No hay mascotas en espera.");
        tiempo = turnos[indice].horaLlegada;
        continue;
    }
    const espera = tiempo - turno.horaLlegada;
    console.log(
        turno.mascota +
        " | " + turno.tipo +
        " | Llegada: " + formatearHora(turno.horaLlegada) +
        " | Atención: " + formatearHora(tiempo) +
        " | Espera: " + espera + " min"
    );
    if (turno.tipo === "Urgencia") {
        esperaUrgencias += espera;
        cantidadUrgencias++;
    }
    else {
        esperaGenerales += espera;
        cantidadGenerales++;
    }
    const atencion = {
        tipo: turno.tipo,
        motivo: turno.motivo,
        horaAtencion: formatearHora(tiempo),
        horaFin: formatearHora(tiempo + 20)
    };
    tiempo += 20;
    if (turno.mascota === "Luna") {
        editor.agregar("Toby", atencion);
        console.log("Error: atención de Luna registrada en Toby.");
        editor.deshacer();
        console.log("Deshacer: atención eliminada del historial de Toby.");
        editor.agregar("Luna", atencion);
        console.log("Corrección: atención registrada en Luna.");
    }
    else {
        editor.agregar(turno.mascota, atencion);
    }
}

console.log("\nPROMEDIOS DE ESPERA");
console.log("Urgencias:", (esperaUrgencias / cantidadUrgencias).toFixed(2), "min");
console.log("Generales:", (esperaGenerales / cantidadGenerales).toFixed(2), "min");
console.log("\nHISTORIALES ACTUALIZADOS");

for (const [mascota, historial] of editor.registro.historiales) {
    console.log("\nMascota:", mascota);
    historial.recorrer(atencion => {
        console.log(
            atencion.tipo +
            " | " + atencion.motivo +
            " | Inicio: " + atencion.horaAtencion +
            " | Fin: " + atencion.horaFin
        );
    });
}

console.log("\nVALIDACIÓN DE SALA VACÍA");

const siguiente = recepcion.llamarSiguiente();
if (siguiente === null) {
    console.log("No hay mascotas en espera.");
}