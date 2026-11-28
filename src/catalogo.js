const catalogo = {
    nombre: "Patitas",
    servicios: [],
    subcategorias: [
        {
            nombre: "Consultas",
            servicios: [
                { nombre: "Consulta general", precio: 60000 },
                { nombre: "Consulta a domicilio", precio: 90000 }
            ],
            subcategorias: [
                {
                    nombre: "Especializada",
                    servicios: [
                        { nombre: "Dermatología", precio: 110000 },
                        { nombre: "Cardiología", precio: 130000 }
                    ],
                    subcategorias: []
                }
            ]
        },
        {
            nombre: "Cirugías",
            servicios: [],
            subcategorias: [
                {
                    nombre: "Esterilización",
                    servicios: [
                        { nombre: "Gata", precio: 280000 },
                        { nombre: "Perra", precio: 350000 }
                    ],
                    subcategorias: []
                },
                {
                    nombre: "Limpieza dental",
                    servicios: [
                        { nombre: "Con anestesia", precio: 150000 }
                    ],
                    subcategorias: []
                }
            ]
        },
        {
            nombre: "Vacunas",
            servicios: [
                { nombre: "Rabia", precio: 45000 },
                { nombre: "Triple felina", precio: 85000 }
            ],
            subcategorias: []
        }
    ]
};

function contarServicios(categoria) {
    let total = categoria.servicios.length;
    for (const subcategoria of categoria.subcategorias) {
        total += contarServicios(subcategoria);
    }
    return total;
}
function listarCatalogo(categoria, nivel = 0) {
    const sangria = "  ".repeat(nivel);
    console.log(sangria + categoria.nombre);
    for (const servicio of categoria.servicios) {
        console.log(
            sangria + "  - " + servicio.nombre +
            ": $" + servicio.precio.toLocaleString("es-CO")
        );
    }
    for (const subcategoria of categoria.subcategorias) {
        listarCatalogo(subcategoria, nivel + 1);
    }
}
function profundidad(categoria) {
    let maxima = 0;
    for (const subcategoria of categoria.subcategorias) {
        maxima = Math.max(maxima, profundidad(subcategoria));
    }
    return maxima + 1;
}

function buscarServicio(categoria, nombre) {
    for (const servicio of categoria.servicios) {
        if (servicio.nombre === nombre) {
            return servicio;
        }
    }
    for (const subcategoria of categoria.subcategorias) {
        const encontrado = buscarServicio(subcategoria, nombre);

        if (encontrado !== null) {
            return encontrado;
        }
    }
    return null;
}
function rutaDeServicio(categoria, nombre) {
    for (const servicio of categoria.servicios) {
        if (servicio.nombre === nombre) {
            return [categoria.nombre, servicio.nombre];
        }
    }
    for (const subcategoria of categoria.subcategorias) {
        const ruta = rutaDeServicio(subcategoria, nombre);

        if (ruta !== null) {
            return [categoria.nombre, ...ruta];
        }
    }
    return null;
}
function sumarPrecios(categoria) {
    let total = 0;
    for (const servicio of categoria.servicios) {
        total += servicio.precio;
    }
    for (const subcategoria of categoria.subcategorias) {
        total += sumarPrecios(subcategoria);
    }
    return total;
}
function precioPaquete(categoria) {
    return sumarPrecios(categoria) * 0.9;
}
function serviciosEnRango(categoria, min, max) {
    const encontrados = [];
    for (const servicio of categoria.servicios) {
        if (servicio.precio >= min && servicio.precio <= max) {
            encontrados.push(servicio);
        }
    }
    for (const subcategoria of categoria.subcategorias) {
        encontrados.push(
            ...serviciosEnRango(subcategoria, min, max)
        );
    }
    return encontrados;
}
if (require.main === module) {
    console.log("CATÁLOGO ORIGINAL\n");
    listarCatalogo(catalogo);
    console.log("\nTotal de servicios:", contarServicios(catalogo));
    console.log("Profundidad:", profundidad(catalogo));
    console.log("\nBUSCAR SERVICIOS");
    console.log(buscarServicio(catalogo, "Consulta general"));
    console.log(buscarServicio(catalogo, "Gata"));
    console.log(buscarServicio(catalogo, "Peluquería"));
    console.log("\nRUTAS DE SERVICIOS");
    console.log(rutaDeServicio(catalogo, "Consulta general"));
    console.log(rutaDeServicio(catalogo, "Gata"));
    console.log(rutaDeServicio(catalogo, "Peluquería"));
    console.log("\nPRECIO DE PAQUETES");
    console.log("Consultas: $" + precioPaquete(catalogo.subcategorias[0]).toLocaleString("es-CO"));
    console.log("Cirugías: $" + precioPaquete(catalogo.subcategorias[1]).toLocaleString("es-CO"));
    console.log("Esterilización: $" + precioPaquete(catalogo.subcategorias[1].subcategorias[0]).toLocaleString("es-CO"));
    console.log("\nSERVICIOS EN RANGO");
    console.log(serviciosEnRango(catalogo, 80000, 150000));
    console.log(serviciosEnRango(catalogo, 60000, 60000));
    console.log(serviciosEnRango(catalogo, 280000, 280000));
    console.log(serviciosEnRango(catalogo, 400000, 500000));
    console.log("\nCATEGORÍA VACÍA");

    const categoriaVacia = {
        nombre: "Vacía",
        servicios: [],
        subcategorias: []
    };
    console.log(buscarServicio(categoriaVacia, "Gata"));
    console.log(rutaDeServicio(categoriaVacia, "Gata"));
    console.log(precioPaquete(categoriaVacia));
    console.log(serviciosEnRango(categoriaVacia, 80000, 150000));
    catalogo.subcategorias[0].subcategorias[0].subcategorias.push({
        nombre: "Oftalmología",
        servicios: [
            { nombre: "Consulta oftalmológica", precio: 120000 }
        ],
        subcategorias: []
    });
    console.log("\nCATÁLOGO ACTUALIZADO\n");
    listarCatalogo(catalogo);
    console.log("\nTotal de servicios:", contarServicios(catalogo));
    console.log("Profundidad:", profundidad(catalogo));
    console.log("\nPRUEBAS DEL NUEVO NIVEL");
    console.log(buscarServicio(catalogo, "Consulta oftalmológica"));
    console.log(rutaDeServicio(catalogo, "Consulta oftalmológica"));
    console.log(precioPaquete(catalogo.subcategorias[0].subcategorias[0].subcategorias[0]));
    console.log(serviciosEnRango(catalogo, 120000, 120000));
}

module.exports = {
    catalogo,
    contarServicios,
    listarCatalogo,
    profundidad,
    buscarServicio,
    rutaDeServicio,
    precioPaquete,
    serviciosEnRango
};
