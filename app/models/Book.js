import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Book = sequelize.define(
  'Book',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },
    library_name: { type: DataTypes.STRING },
    latitude: { type: DataTypes.DECIMAL(10, 6) },
    longitude: { type: DataTypes.DECIMAL(10, 6) },
  },
  {
    timestamps: true,
    tableName: 'books',
  }
);

export default Book;
