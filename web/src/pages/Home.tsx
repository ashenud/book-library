import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { OverlayTrigger, Pagination, Spinner, Tooltip } from 'react-bootstrap';
import { FaBook, FaCheck, FaHeart, FaShoppingCart } from 'react-icons/fa';
import ToastContainer from '../components/ToastContainer';
import api from '../services/api';

const Home = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [distance, setDistance] = useState('');
  const [books, setBooks] = useState<any[]>([]);
  const [isLoggedIn] = useState(!!localStorage.getItem('token'));
  const [toasts, setToasts] = useState<{ id: number; type?: 'success' | 'danger'; message: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

    setLoading(true);

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
    try {
      setLoading(true);

      const res = await api.get(
        `/books?title=${title}&author=${author}&year=${year}&userLat=${lat || 0}&userLng=${
          lng || 0
        }&maxDistance=${distance}`
      );

      setBooks(res.data);
      setCurrentPage(1);
    } catch (err) {
      setLoading(false);

      addToast('danger', 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const addToMyBooks = async (bookId: number, status: string) => {
    try {
      await api.post(
        '/books/user-books',
        { bookId, status },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      addToast('success', `Book marked as ${status}`);

      searchBooks(); // Refresh book list after adding
    } catch (err) {
      addToast('danger', 'Error saving book status');
    }
  };

  useEffect(() => {
    searchBooks();
  }, []);

  // Pagination calculations
  const totalItems = books.length > 0 ? books[0].totalItems || books.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Sliding window pagination
  const maxPageButtons = 9;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = startPage + maxPageButtons - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  // Slice books for client-side fallback (optional)
  const paginatedBooks = books.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className='container mt-4 position-relative'>
      <h1>Public Book Search</h1>

      {/* Search Bar */}
      <div className='row mb-3'>
        <div className='col-md-3 p-2'>
          <input
            className='form-control'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='col-md-3 p-2'>
          <input
            className='form-control'
            placeholder='Author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className='col-md-2 p-2'>
          <input className='form-control' placeholder='Year' value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
        <div className='col-md-2 p-2'>
          <select className='form-select' value={distance} onChange={(e) => setDistance(e.target.value)}>
            <option value=''>Any Distance</option>
            <option value='1'>Within 1 km</option>
            <option value='10'>Within 10 km</option>
            <option value='20'>Within 20 km</option>
          </select>
        </div>
        <div className='col-md-2 p-2'>
          <button className='btn btn-primary w-100' onClick={searchBooks}>
            Search
          </button>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div
          className='position-absolute w-100 h-100 d-flex justify-content-center align-items-center'
          style={{
            top: 0,
            left: 0,
            backgroundColor: 'rgba(255,255,255,0.7)',
            zIndex: 9999,
          }}
        >
          <Spinner animation='border' variant='primary' />
        </div>
      )}

      {/* Books Table */}
      <div className='table-responsive'>
        <table className='table table-bordered table-hover'>
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
            {paginatedBooks.map(
              (book) => (
                console.log(book),
                (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.year}</td>
                    <td>{book.library_name}</td>
                    {isLoggedIn && (
                      <td className='text-center'>
                        <OverlayTrigger
                          placement='top'
                          overlay={<Tooltip id={`tooltip-read-${book.id}`}>Mark as Read</Tooltip>}
                        >
                          <button
                            className={clsx(
                              'btn btn-sm m-1',
                              book.user_books?.[0]?.status === 'read' ? 'btn-secondary' : 'btn-success'
                            )}
                            onClick={() => addToMyBooks(book.id, 'read')}
                            disabled={book.user_books?.[0]?.status === 'read'}
                          >
                            <FaBook />
                          </button>
                        </OverlayTrigger>

                        <OverlayTrigger
                          placement='top'
                          overlay={<Tooltip id={`tooltip-reviewed-${book.id}`}>Mark as Reviewed</Tooltip>}
                        >
                          <button
                            className={clsx(
                              'btn btn-sm m-1',
                              book.user_books?.[0]?.status === 'reviewed' ? 'btn-secondary' : 'btn-info'
                            )}
                            onClick={() => addToMyBooks(book.id, 'reviewed')}
                            disabled={book.user_books?.[0]?.status === 'reviewed'}
                          >
                            <FaCheck />
                          </button>
                        </OverlayTrigger>

                        <OverlayTrigger
                          placement='top'
                          overlay={<Tooltip id={`tooltip-wishlist-${book.id}`}>Add to Wishlist</Tooltip>}
                        >
                          <button
                            className={clsx(
                              'btn btn-sm m-1',
                              book.user_books?.[0]?.status === 'wishlist' ? 'btn-secondary' : 'btn-warning'
                            )}
                            onClick={() => addToMyBooks(book.id, 'wishlist')}
                            disabled={book.user_books?.[0]?.status === 'wishlist'}
                          >
                            <FaHeart />
                          </button>
                        </OverlayTrigger>

                        <OverlayTrigger
                          placement='top'
                          overlay={<Tooltip id={`tooltip-purchased-${book.id}`}>Mark as Purchased</Tooltip>}
                        >
                          <button
                            className={clsx(
                              'btn btn-sm m-1',
                              book.user_books?.[0]?.status === 'purchased' ? 'btn-secondary' : 'btn-primary'
                            )}
                            onClick={() => addToMyBooks(book.id, 'purchased')}
                            disabled={book.user_books?.[0]?.status === 'purchased'}
                          >
                            <FaShoppingCart />
                          </button>
                        </OverlayTrigger>
                      </td>
                    )}
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination className='justify-content-center'>
        <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} />

        {pageNumbers.map((num) => (
          <Pagination.Item key={num} active={currentPage === num} onClick={() => setCurrentPage(num)}>
            {num}
          </Pagination.Item>
        ))}

        <Pagination.Next
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default Home;
