require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');

// Crea la tabla "productos" si no existe y carga el inventario inicial si está vacía
const inicializarBD = async () => {
    await pool.query(schema);
    await pool.query(seed);
    console.log('Tabla "productos" lista ✅');
};

module.exports = { inicializarBD };

// Permite ejecutarlo a mano con: npm run db:init
if (require.main === module) {
    inicializarBD()
        .catch((err) => console.error('Error al crear la tabla ❌', err.message))
        .finally(() => pool.end());
}
