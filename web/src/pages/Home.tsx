import { useState } from 'react';
import api from '../services/api';
import ToastContainer from '../components/ToastContainer';

const Home = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [distance, setDistance] = useState('');
  const [books, setBooks] = useState<any[]>([]);
  const [isLoggedIn] = useState(!!localStorage.getItem('token'));
  const [toasts, setToasts] = useState<{ id: number; type?: 'success' | 'danger'; message: string }[]>([]);

  const addToast = (type: 'success' | 'danger', message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const searchBooks = async () => {
    let userLat = 0;
    let userLng = 0;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        userLat = position.coords.latitude;
        userLng = position.coords.longitude;
        fetchBooks(userLat, userLng);
      });
    } else {
      fetchBooks();
    }
  };

  const fetchBooks = async (lat?: number, lng?: number) => {
    const res = await api.get(
      `/books?title=${title}&author=${author}&year=${year}&userLat=${lat || 0}&userLng=${
        lng || 0
      }&maxDistance=${distance}`
    );

    setBooks(res.data);
  };

  const addToMyBooks = async (bookId: number, status: string) => {
    try {
      await api.post(
        '/books/user-books',
        { bookId, status },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      addToast('success', `Book marked as ${status}`);
    } catch (err) {
      addToast('danger', 'Error saving book status');
    }
  };

  return (
    <div className='container mt-4'>
      <h1>Public Book Search</h1>
      {/* Search Bar */}
      <div className='row mb-3'>
        <div className='col-md-3'>
          <input
            className='form-control'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='col-md-3'>
          <input
            className='form-control'
            placeholder='Author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className='col-md-2'>
          <input className='form-control' placeholder='Year' value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
        <div className='col-md-2'>
          <select className='form-select' value={distance} onChange={(e) => setDistance(e.target.value)}>
            <option value=''>Any Distance</option>
            <option value='1'>Within 1 km</option>
            <option value='10'>Within 10 km</option>
            <option value='20'>Within 20 km</option>
          </select>
        </div>
        <div className='col-md-2'>
          <button className='btn btn-primary w-100' onClick={searchBooks}>
            Search
          </button>
        </div>
      </div>

      {/* Book Results */}
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Library</th>
            {isLoggedIn && <th className='text-center'>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.year}</td>
              <td>{b.library_name}</td>
              {isLoggedIn && (
                <td className='text-center'>
                  <button className='btn btn-sm btn-success me-1' onClick={() => addToMyBooks(b.id, 'read')}>
                    Read
                  </button>
                  <button className='btn btn-sm btn-info me-1' onClick={() => addToMyBooks(b.id, 'reviewed')}>
                    Reviewed
                  </button>
                  <button className='btn btn-sm btn-warning me-1' onClick={() => addToMyBooks(b.id, 'wishlist')}>
                    Wish
                  </button>
                  <button className='btn btn-sm btn-primary' onClick={() => addToMyBooks(b.id, 'purchased')}>
                    Purchased
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default Home;
