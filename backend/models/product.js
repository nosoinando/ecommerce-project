const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Product = db.define('Product', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,  // Ahora es obligatorio
    references: {
      model: 'categorias',  // Referencia a la tabla 'categorias'
      key: 'categoria_id'
    }
  }
});

module.exports = Product;
