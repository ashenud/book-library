// associations.js
import Book from './Book.js';
import Library from './Library.js';
import User from './User.js';
import UserBook from './UserBook.js';

// Many-to-many
User.belongsToMany(Book, { through: UserBook, foreignKey: 'user_id' });
Book.belongsToMany(User, { through: UserBook, foreignKey: 'book_id' });

// Direct hasMany / belongsTo for eager loading junction table
User.hasMany(UserBook, { as: 'user_books', foreignKey: 'user_id' });
Book.hasMany(UserBook, { as: 'user_books', foreignKey: 'book_id' });
UserBook.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
UserBook.belongsTo(Book, { as: 'book', foreignKey: 'book_id' });

Book.belongsTo(Library, { as: 'library', foreignKey: 'library_id' });
Library.hasMany(Book, { as: 'books', foreignKey: 'library_id' });
