import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const UserBook = sequelize.define(
  'UserBook',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: {
      type: DataTypes.INTEGER,
    },
    book_id: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM('read', 'reviewed', 'wishlist', 'purchased'),
      allowNull: false,
    },
    review_text: { type: DataTypes.TEXT },
  },
  {
    timestamps: true,
    tableName: 'user_books',
  }
);

export default UserBook;
