const db = require('../config/database');


const Categoria = {
    getAll: function (callback) {
        return db.query('SELECT * FROM Categoria', callback);
    },

    getById: function (id, callback) {
        return db.query('SELECT * FROM Categoria WHERE id = ?', [id], callback);
    },

    create: function (categoria, callback) {
        return db.query('INSERT INTO Categoria (nombre) VALUES (?)', [categoria.nombre], callback);
    },

    update: function (categoria, callback) {
        return db.query('UPDATE Categoria SET nombre = ? WHERE id = ?', [categoria.nombre, categoria.id], callback);
    },

    delete: function (id, callback) {
        return db.query('DELETE FROM Categoria WHERE id = ?', [id], callback);
    }
};

module.exports = Categoria;

