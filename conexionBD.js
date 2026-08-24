const { Connection } = require("mysql2");
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
    const conexionBD = await crearConexion();
    // const resultado = await conexionBD.query("SELECT * FROM golosinas;");
    menu();

    opcion = Number(leer("Ingrese Opcion: "));
    // const resultado = await conexionBD.query("SELECT * FROM golosinas;");
    await menuDeOpciones(opcion, conexionBD);
    conexionBD.end();
}
main();

//------------------------------Modularizacion----------------------------------------------

/**
 * Ejecuta las opciones con la conexion de base de datos
 * @param {Number} opcion Valor numerico para seleccionar menu
 * @param {Connection} conexionBD conexion a la base de datos
 */
async function menuDeOpciones(opcion, conexionBD) {

    switch (opcion) {
        case 1:
            await mostrarDatosTablas(conexionBD);
            break;
        case 2:
            await insertarProductos(conexionBD);
            break;
        case 3:
            await actualizacionDatos(conexionBD);
            break;
        case 4:
            await eliminarDato(conexionBD);
            break;
    }
}
/**
 * Eliminar Datos de la tabla
 * @param {Connection} conexionBD conexion a la base de datos
 */
async function eliminarDato(conexionBD) {
    let resultado = 0;
    let subopcion=0;
    subopcion=Number(leer("ingrese ID a eliminar: "))
    await conexionBD.query("DELETE FROM golosinas WHERE id = ?;",[subopcion]);
    resultado = await conexionBD.query("select * from golosinas;");
    console.log(resultado[0]);
    
}

/**
 * Muestra las tablas de la base de datos
 * @param {Connection} conexionBD conexion a la base de datos
 */
async function mostrarDatosTablas(conexionBD) {
    miniMenuTablas();

    const subOpcion = Number(leer("Ingrese opcion: "));
    await subMenuTablas(subOpcion, conexionBD);

}
/**
 * Muestra las opciones de las tablas
 */
function miniMenuTablas() {
    console.log("Tabla a consultar:");
    console.log("1. Golosinas");
    console.log("2. Proovedores");
}

/**
 * Actualizacion de los datos en las tablas seleccionada
 * @param {Connection} conexionBD conexion a la base de datos
 */
async function actualizacionDatos(conexionBD) {
    miniMenuActualizar();

    const subActualizar = Number(leer("Ingrese opcion: "));
    await subMenuActualizar(subActualizar, conexionBD);

}

/**
 * Muestra las opciones de las tablas a actualizar
 */
function miniMenuActualizar() {
    console.log("Que desea actualizar?:");
    console.log("1. Golosinas");
    console.log("2. Proovedores");
}

/**
 * Inserta Productos en golosinas
 * @param {Connection} conexionBD conexion a la base de datos
 */
async function insertarProductos(conexionBD) {
    const nombre = leer("Ingrese nombre del Producto: ");
    const marca = leer("Ingrese marca del producto: ");
    await conexionBD.query("insert into golosinas (nombre,marca) values (?,?);", [nombre, marca]);

}

/**
 * Actualizacion de nombres y marcas de los productos de pendiendo de la opcion
 * @param {Number} subActualizar opcion de actualizar seleccionada
 * @param {Connection} conexionBD conexion a la base de datos
 */
async function subMenuActualizar(subActualizar, conexionBD) {
    
    switch (subActualizar) {
        
        case 1:
            const nombre = leer("Ingrese nombre del Producto: ");
            const marca = leer("Ingrese marca del producto: ");
            resultado = await conexionBD.query(`UPDATE golosinas SET nombre = ?, marca = ? WHERE id =  1;`, [nombre, marca]);
            resultado = await mostrarGolosinas(resultado, conexionBD);
            
            break;

        case 2:
            await actualizarProovedores(conexionBD);
            break;
    }

}
/**
 * Muestra la tabla (mejorar para cualquier tabla...)
 * @param {*} conexionBD 
 */
async function mostrarGolosinas(conexionBD) {
    let resultado = 0;
    resultado = await conexionBD.query("select * from golosinas;");
    console.table(resultado[0]);
}

/* async function mostrarProovedores(resultado, conexionBD) {
    let resultado = 0;
    resultado = await conexionBD.query("select * from proovedores;");
    console.table(resultado[0]);
} */

/**
 * Actualiza los productos/stock de proovedores
 * @param {Connection} conexionBD conexion a la base de datos
 */
async function actualizarProovedores(conexionBD) {
    let resultado = 0;
    await conexionBD.query(`UPDATE proovedores SET nombre = "naranju", stock = "sin stock" WHERE id =  1;`);
    await conexionBD.query(`UPDATE proovedores SET nombre = "helados", stock = "stock" WHERE id =  2;`);
    await conexionBD.query(`UPDATE proovedores SET nombre = "patys", stock = "stock" WHERE id =  3;`);
    resultado = await conexionBD.query("select * from proovedores;");
    console.table(resultado[0]);
    
}

/**
 * Muestra los valores de la tabla seleccionada
 * @param {Number} subOpcion Navegacion en el menu
 * @param {*} conexionBD conexion a la base de datos
 */
async function subMenuTablas(subOpcion, conexionBD) {
    let resultado = 0;
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

}
/**
 * Menu principal de la Base de Datos
 */
function menu() {
    console.log("\n--- MENÚ PRINCIPAL ---");
    console.log("1- Mostrar Datos de Tabla");
    console.log("2- Insertar Datos");
    console.log("3- Actualizar Datos");
    console.log("4- Borrar Datos");
}

