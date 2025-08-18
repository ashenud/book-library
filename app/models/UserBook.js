import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Book from './Book.js';
import User from './User.js';

const UserBook = sequelize.define(
  'UserBook',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: {
      type: DataTypes.INTEGER,
      references: { model: User, key: 'id' },
    },
    book_id: {
      type: DataTypes.INTEGER,
      references: { model: Book, key: 'id' },
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

// Associations
User.belongsToMany(Book, { through: UserBook, foreignKey: 'user_id' });
Book.belongsToMany(User, { through: UserBook, foreignKey: 'book_id' });

UserBook.belongsTo(User, { foreignKey: 'user_id' });
UserBook.belongsTo(Book, { foreignKey: 'book_id' });

export default UserBook;
