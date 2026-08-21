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


async function menuDeOpciones(opcion, resultado, conexionBD) {
    switch (opcion) {
        case 1:
            resultado = await conexionBD.query("select * from golosinas;");
            console.table(resultado[0]);

            break;
        case 2:
            const nombre = leer();
            const marca = leer ();
            resultado = await conexionBD.query("insert into golosinas (nombre,marca) values (?,?);", [nombre, marca]);
            console.log(resultado);
            break;
        case 3:

            break;

        default:

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

