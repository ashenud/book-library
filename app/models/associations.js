// associations.js
import Book from './Book.js';
import User from './User.js';
import UserBook from './UserBook.js';

// Many-to-many
User.belongsToMany(Book, { through: UserBook, foreignKey: 'user_id' });
Book.belongsToMany(User, { through: UserBook, foreignKey: 'book_id' });

// Direct hasMany / belongsTo for eager loading junction table
User.hasMany(UserBook, { as: 'user_books', foreignKey: 'user_id' });
Book.hasMany(UserBook, { as: 'user_books', foreignKey: 'book_id' });
UserBook.belongsTo(User, { as: 'users', foreignKey: 'user_id' });
UserBook.belongsTo(Book, { as: 'books', foreignKey: 'book_id' });
