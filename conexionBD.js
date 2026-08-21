const { createConnection } = require("mysql2/promise");

async function crearConexion() {
    return await createConnection({
        host: "localhost",
        user: "root",
        database: "Kiosco",
        password: "Peter20221103"
    });
}

async function main() {
    const conexionBD = await crearConexion();
    const resultado = await conexionBD.query("SELECT * FROM golosinas;");
    console.log(resultado);
    conexionBD.end();
}
main();
