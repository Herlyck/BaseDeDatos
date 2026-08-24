const { createConnection } = require("mysql2/promise");
const leer = require("prompt-sync")();
async function crearConexion() {
    return await createConnection({
        host: "localhost",
        user: "root",
        database: "Kiosco",
        password: "1234"
    });
}

async function main() {

    let opcion = 0;
    let resultado = 0;
    const conexionBD = await crearConexion();
    // const resultado = await conexionBD.query("SELECT * FROM golosinas;");
    menu();

    opcion = Number(leer("Ingrese Opcion: "));
    // const resultado = await conexionBD.query("SELECT * FROM golosinas;");
    resultado = await menuDeOpciones(opcion, resultado, conexionBD);
    conexionBD.end();
}
main();

//------------------------------Modularizacion----------------------------------------------
async function menuDeOpciones(opcion, resultado, conexionBD) {
    switch (opcion) {
        case 1:
            resultado = await mostrarDatosTablas(resultado, conexionBD);
            break;
        case 2:
            resultado = await insertarProductos(resultado, conexionBD);
            break;
        case 3:
            resultado = await actualizacionDatos(resultado, conexionBD);
            break;

    }
    return resultado;
}

async function mostrarDatosTablas(resultado, conexionBD) {
    miniMenuTablas();

    const subOpcion = Number(leer("Ingrese opcion: "));
    resultado = await subMenuTablas(subOpcion, resultado, conexionBD);
    return resultado;
}

function miniMenuTablas() {
    console.log("Tabla a consultar:");
    console.log("1. Golosinas");
    console.log("2. Proovedores");
}

async function actualizacionDatos(resultado, conexionBD) {
    miniMenuActualizar();

    const subActualizar = Number(leer("Ingrese opcion: "));
    resultado = await subMenuActualizar(subActualizar, resultado, conexionBD);
    return resultado;
}

function miniMenuActualizar() {
    console.log("Que desea actualizar?:");
    console.log("1. Golosinas");
    console.log("2. Proovedores");
}

async function insertarProductos(resultado, conexionBD) {
    const nombre = leer("Ingrese nombre del Producto: ");
    const marca = leer("Ingrese marca del producto: ");
    resultado = await conexionBD.query("insert into golosinas (nombre,marca) values (?,?);", [nombre, marca]);
    return resultado;
}


async function subMenuActualizar(subActualizar, resultado, conexionBD) {
    switch (subActualizar) {
        case 1:
            const nombre = leer("Ingrese nombre del Producto: ");
            const marca = leer("Ingrese marca del producto: ");
            resultado = await conexionBD.query(`UPDATE golosinas SET nombre = ?, marca = ? WHERE id =  1;`, [nombre, marca]);
            resultado = await conexionBD.query("select * from golosinas;");
            console.table(resultado[0]);
            break;

        case 2:
            resultado = await actualizarProovedores(resultado, conexionBD);
            break;
    }
    return resultado;
}


async function actualizarProovedores(resultado, conexionBD) {
    resultado = await conexionBD.query(`UPDATE proovedores SET nombre = "naranju", stock = "sin stock" WHERE id =  1;`);
    resultado = await conexionBD.query(`UPDATE proovedores SET nombre = "helados", stock = "stock" WHERE id =  2;`);
    resultado = await conexionBD.query(`UPDATE proovedores SET nombre = "patys", stock = "stock" WHERE id =  3;`);
    resultado = await conexionBD.query("select * from proovedores;");
    console.table(resultado[0]);
    return resultado;
}


async function subMenuTablas(subOpcion, resultado, conexionBD) {
    switch (subOpcion) {
        case 1:
            resultado = await conexionBD.query("select * from golosinas;");
            console.table(resultado[0]);
            break;
        case 2:
            resultado = await conexionBD.query("select * from proovedores;");
            console.table(resultado[0]);
            break;


    }
    return resultado;
}

function menu() {
    console.log("\n--- MENÚ PRINCIPAL ---");
    console.log("1- Mostrar Datos de Tabla");
    console.log("2- Insertar Datos");
    console.log("3- Actualizar Datos");
    console.log("4- Borrar Datos");
}

