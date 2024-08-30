const Categoria = require('../models/categoryModel');

function getAllCategorias(req, res) {
    Categoria.getAll((err, categorias) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(categorias);
    });
}

function getCategoriaById(req, res) {
    const id = req.params.id;
    Categoria.getById(id, (err, categoria) => {
        if (err) return res.status(500).json({ message: err.message });
        if (!categoria) return res.status(404).json({ message: 'Categoria not found' });
        res.json(categoria);
    });
}

function createCategoria(req, res) {
    const newCategoria = req.body;
    Categoria.create(newCategoria, (err, categoria) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json(categoria);
    });
}

function updateCategoria(req, res) {
    const id = req.params.id;
    const updatedCategoria = req.body;
    updatedCategoria.id = id;

    Categoria.update(updatedCategoria, (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Categoria not found' });
        res.json({ message: 'Categoria updated successfully' });
    });
}

function deleteCategoria(req, res) {
    const id = req.params.id;
    Categoria.delete(id, (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Categoria not found' });
        res.json({ message: 'Categoria deleted successfully' });
    });
}

module.exports = {
    getAllCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria,
};
