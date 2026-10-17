const pool = require('../config/db');
const Producto = require('../entities/producto.entity');

const findAll = async () => {
    const { rows } = await pool.query('SELECT * FROM productos ORDER BY id');
    return rows.map(Producto.fromRow);
};

const findById = async (id) => {
    const { rows } = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
    return Producto.fromRow(rows[0]);
};

const create = async ({ nombre, categoria, precio, stock }) => {
    const { rows } = await pool.query(
        `INSERT INTO productos (nombre, categoria, precio, stock)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [nombre, categoria, precio, stock]
    );
    return Producto.fromRow(rows[0]);
};

const update = async (id, { nombre, categoria, precio, stock }) => {
    const { rows } = await pool.query(
        `UPDATE productos
         SET nombre = $1, categoria = $2, precio = $3, stock = $4
         WHERE id = $5
         RETURNING *`,
        [nombre, categoria, precio, stock, id]
    );
    return Producto.fromRow(rows[0]);
};

const remove = async (id) => {
    const { rowCount } = await pool.query('DELETE FROM productos WHERE id = $1', [id]);
    return rowCount > 0;
};

module.exports = { findAll, findById, create, update, remove };
