const db = require('../config/database');

const Producto = {
    getAll: function (callback) {
        return db.query('SELECT * FROM Producto', callback);
    },

    getById: function (id, callback) {
        return db.query('SELECT * FROM Producto WHERE id = ?', [id], callback);
    },

    create: function (producto, callback) {
        return db.query('INSERT INTO Producto (nombre, precio, categoriaId) VALUES (?, ?, ?)', [producto.nombre, producto.precio, producto.categoriaId], callback);
    },

    update: function (producto, callback) {
        return db.query('UPDATE Producto SET nombre = ?, precio = ?, categoriaId = ? WHERE id = ?', [producto.nombre, producto.precio, producto.categoriaId, producto.id], callback);
    },

    delete: function (id, callback) {
        return db.query('DELETE FROM Producto WHERE id = ?', [id], callback);
    }
};

module.exports = Producto;
