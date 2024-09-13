const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Category = db.define('Category', {
  categoria_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'categorias',
  timestamps: false // No agregar automáticamente createdAt y updatedAt
});

module.exports = Category;
