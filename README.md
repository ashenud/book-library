# 📚 Book Library System

A **React + Node.js + Sequelize + MySQL** web application for managing and browsing public books, with user-specific book status tracking and library locations.

---

## 🔹 Features

- **Public Book Search**

  - Search books by title, author, or year.
  - Filter books by proximity to your location (`maxDistance` in km).
  - Displays library name and distance from the user.

- **User Accounts**

  - Register/Login with JWT authentication.
  - Manage your book status: `read`, `reviewed`, `wishlist`, `purchased`.

- **My Books**

  - View all books associated with your account.
  - See book details along with the library information.

- **Libraries**

  - Each book is associated with a library.
  - Libraries have a name, latitude, and longitude.
  - Distance from user is calculated via Google Maps API.

- **Responsive UI**

  - Mobile-friendly navigation bar with collapsible dropdowns.
  - Responsive tables and action buttons with tooltips.
  - Pagination for book listings.

---

## 🔹 Tech Stack

- **Frontend**: React, React Router, Bootstrap 5, React-Bootstrap
- **Backend**: Node.js, Express
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Other**: Axios for API requests, Faker.js for seeding data

---

## 🔹 Database Models

### **User**

- `id`, `name`, `email`, `password`, `createdAt`, `updatedAt`
- Associations:

  - `hasMany(UserBook)`

### **Book**

- `id`, `title`, `author`, `year`, `library_id`, `createdAt`, `updatedAt`
- Associations:

  - `belongsTo(Library)`
  - `hasMany(UserBook, as: 'user_books')`

### **Library**

- `id`, `name`, `latitude`, `longitude`, `createdAt`, `updatedAt`
- Associations:

  - `hasMany(Book, as: 'books')`

### **UserBook**

- `id`, `user_id`, `book_id`, `status`, `review_text`, `createdAt`, `updatedAt`
- Associations:

  - `belongsTo(User)`
  - `belongsTo(Book, as: 'book')`

---

## 🔹 Setup Instructions

### 1. Clone or Download the Repository

```
// Set the files on related place
book-library
```

### 2. Install Dependencies

```
# Backend
cd app && npm install

# Frontend
cd ../frontend && npm install
```

### 3. Configure Environment

Create a `.env` file in the backend(app) root:

```
PORT=5000
DB_HOST=localhost
DB_USER=admin
DB_PASS=password
DB_NAME=book_library
JWT_SECRET=my_secret_key

GOOGLE_MAPS_API_KEY=YOUR_KEY_HERE
```

### 4. Run Database & Seeders

The database will be **automatically dropped and recreated**, and sample data will be generated via seeders **each time the server starts**.

```
// app/server.js
sequelize.sync({ force: true }).then(async () => {
  console.log('✅ Database connected and synced');

  // Run seeder
  await seedDatabase();

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
});
```

> ⚠️ **Warning:** This will erase all existing data on every server restart.

To preserve your existing database and avoid automatic recreation/seeding, remove sequelize.sync({ force: true }) and simply start the server:

```
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
```

You can also manually populate the database using the SQL dump provided:

```
/app/dumps/book-library.sql
```

### 5. Run the Application

```
# Backend
cd ../app
npm run dev

# Frontend
cd ../web
npm start
```

### 6. Access

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api`

---

## 🔹 Key API Endpoints

| Endpoint              | Method | Description                                            |
| --------------------- | ------ | ------------------------------------------------------ |
| /api/users/login      | POST   | Login and get JWT                                      |
| /api/users/register   | POST   | Register a new user                                    |
| /api/books            | GET    | Search books (filter by title, author, year, distance) |
| /api/books/user-books | GET    | Get logged in user books                               |
| /api/books/user-books | POST   | Add/update user book status                            |
| /api/users            | GET    | Get all users                                          |
| /api/users/:id        | GET    | Get a user's details                                   |
| /api/users/:id        | PUT    | Update a user                                          |
| /api/users/:id        | DELETE | Delete a user(admin only)                              |

---

## 🔹 Frontend Notes

- **Navbar**

  - Collapsible on mobile.
  - Shows `Home`, `My Books`, `Users` (if logged in).
  - Dropdown for `Login/Register` or `Logout`.

- **Book Table**

  - Responsive, bordered, with action buttons.
  - Action buttons show tooltips and disable when already selected.
  - Colors indicate status (`success`, `info`, `warning`, `primary`, `secondary`).

- **Token Handling**

  - JWT stored in local storage.
  - Automatic logout if token is expired or invalid.

- **Pagination**

  - Sliding window pagination for books.

---

## 🔹 Utilities

- **Distance Calculation**

  - Uses Google Maps Distance Matrix API.
  - Calculates distance between user location and libraries.
  - Distance added to book response as `book.library.distance`.

- **Seed Scripts**

  - Random libraries and books can be seeded using Faker.js.
  - Books randomly assigned to libraries.
