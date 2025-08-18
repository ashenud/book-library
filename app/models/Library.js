import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Library = sequelize.define(
  'Library',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    latitude: { type: DataTypes.DECIMAL(10, 6), allowNull: false },
    longitude: { type: DataTypes.DECIMAL(10, 6), allowNull: false },
  },
  {
    timestamps: true,
    tableName: 'libraries',
  }
);

export default Library;
