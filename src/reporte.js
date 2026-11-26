const RegistroClinico = require("./RegistroClinico.js");

const registro = new RegistroClinico();
registro.registrarAtencion("Lola", { fecha: "02/02", motivo: "Vacunación anual", veterinario: "Dra. Ríos", costo: 85000 });
registro.registrarAtencion("Lola", { fecha: "15/03", motivo: "Control de peso", veterinario: "Dr. Gómez", costo: 40000 });
registro.registrarAtencion("Lola", { fecha: "20/05", motivo: "Limpieza dental", veterinario: "Dra. Ríos", costo: 150000 });
registro.registrarAtencion("Toby", { fecha: "10/01", motivo: "Consulta por cojera", veterinario: "Dr. Gómez", costo: 60000 });
registro.registrarAtencion("Toby", { fecha: "12/01", motivo: "Radiografía de pata", veterinario: "Dr. Gómez", costo: 120000 });
registro.registrarAtencion("Toby", { fecha: "05/04", motivo: "Vacunación anual", veterinario: "Dra. Ríos", costo: 85000 });
registro.registrarAtencion("Mía", { fecha: "18/02", motivo: "Esterilización", veterinario: "Dra. Ríos", costo: 280000 });
registro.registrarAtencion("Mía", { fecha: "25/02", motivo: "Control posquirúrgico", veterinario: "Dra. Ríos", costo: 0 });

for (const [mascota, historial] of registro.historiales) {
    console.log("\nHistorial de " + mascota);
    let total = 0;
    historial.recorrer(atencion => {
        console.log(atencion.fecha, "|", atencion.motivo, "|", atencion.veterinario, "| $" + atencion.costo.toLocaleString("es-CO"));
        total += atencion.costo;
    });
    console.log("Número de atenciones:", historial.obtenerTamanio());
    console.log("Costo total: $" + total.toLocaleString("es-CO"));
    const vacunacion = historial.buscar(atencion => atencion.motivo === "Vacunación anual");
    console.log("Última vacunación:", vacunacion !== null ? vacunacion.fecha : "sin registro");
}