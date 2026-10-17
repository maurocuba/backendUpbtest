const HttpError = require('../utils/http-error');

// Valida y filtra lo que manda el cliente; solo deja pasar los campos permitidos
const validarCampos = (body, { parcial }) => {
    const errores = [];
    const datos = {};
    const { nombre, categoria, precio, stock } = body || {};

    if (nombre !== undefined) {
        if (typeof nombre !== 'string' || nombre.trim() === '') errores.push('"nombre" debe ser un texto no vacío');
        else if (nombre.length > 100) errores.push('"nombre" no puede superar 100 caracteres');
        else datos.nombre = nombre.trim();
    } else if (!parcial) {
        errores.push('"nombre" es obligatorio');
    }

    if (categoria !== undefined) {
        if (typeof categoria !== 'string' || categoria.trim() === '') errores.push('"categoria" debe ser un texto no vacío');
        else if (categoria.length > 50) errores.push('"categoria" no puede superar 50 caracteres');
        else datos.categoria = categoria.trim();
    } else if (!parcial) {
        datos.categoria = 'General';
    }

    if (precio !== undefined) {
        if (typeof precio !== 'number' || precio < 0) errores.push('"precio" debe ser un número mayor o igual a 0');
        else datos.precio = precio;
    } else if (!parcial) {
        datos.precio = 0;
    }

    if (stock !== undefined) {
        if (!Number.isInteger(stock) || stock < 0) errores.push('"stock" debe ser un entero mayor o igual a 0');
        else datos.stock = stock;
    } else if (!parcial) {
        datos.stock = 0;
    }

    if (parcial && Object.keys(datos).length === 0 && errores.length === 0) {
        errores.push('Debes enviar al menos un campo: nombre, categoria, precio o stock');
    }

    if (errores.length > 0) throw new HttpError(400, errores.join(', '));
    return datos;
};

// DTO de entrada para POST
const crearProductoDto = (body) => validarCampos(body, { parcial: false });

// DTO de entrada para PUT (todos los campos opcionales)
const actualizarProductoDto = (body) => validarCampos(body, { parcial: true });

// DTO de salida: lo que la API devuelve al cliente
const productoResponseDto = (producto) => ({
    id: producto.id,
    nombre: producto.nombre,
    categoria: producto.categoria,
    precio: producto.precio,
    stock: producto.stock,
    createdAt: producto.createdAt,
});

module.exports = { crearProductoDto, actualizarProductoDto, productoResponseDto };
