const Producto = require('../models/productModel');

function getAllProductos(req, res) {
    Producto.getAll((err, productos) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(productos);
    });
}

function getProductoById(req, res) {
    const id = req.params.id;
    Producto.getById(id, (err, producto) => {
        if (err) return res.status(500).json({ message: err.message });
        if (!producto) return res.status(404).json({ message: 'Producto not found' });
        res.json(producto);
    });
}

function createProducto(req, res) {
    const newProducto = req.body;
    Producto.create(newProducto, (err, producto) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json(producto);
    });
}

function updateProducto(req, res) {
    const id = req.params.id;
    const updatedProducto = req.body;
    updatedProducto.id = id;

    Producto.update(updatedProducto, (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto not found' });
        res.json({ message: 'Producto updated successfully' });
    });
}

function deleteProducto(req, res) {
    const id = req.params.id;
    Producto.delete(id, (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto not found' });
        res.json({ message: 'Producto deleted successfully' });
    });
}

module.exports = {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
};
