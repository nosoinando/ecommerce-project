const Product = require('../models/product');
const Category = require('../models/category'); // Si deseas validar la existencia de la categoría

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, category_id } = req.body;
    
    // Validación de datos
    if (!nombre || !precio || !stock || !category_id) {
      return res.status(400).json({ message: 'Los campos nombre, precio, stock y category_id son requeridos' });
    }

    // Verificar si la categoría existe
    const categoryExists = await Category.findByPk(category_id);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Categoría no encontrada' });
    }

    // Crear producto
    const newProduct = await Product.create({
      nombre,
      descripcion,
      precio,
      stock,
      category_id
    });
    
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};
