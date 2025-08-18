import { useEffect, useState } from 'react';
import ToastContainer from '../components/ToastContainer';
import api from '../services/api';

interface UserBook {
  id: number;
  user_id: number;
  book_id: number;
  status: string;
  review_text?: string;
  book?: {
    id: number;
    title: string;
    author: string;
    library: {
      name: string;
    };
  };
}

const MyBooks = () => {
  const [userBooks, setUserBooks] = useState<UserBook[]>([]);
  const [toasts, setToasts] = useState<{ id: number; type?: 'success' | 'danger'; message: string }[]>([]);

  const token = localStorage.getItem('token');

  const addToast = (type: 'success' | 'danger', message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchUserBooks = async () => {
    try {
      const res = await api.get('/books/user-books', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserBooks(res.data);
    } catch (err: any) {
      addToast('danger', err.response?.data?.error || 'Failed to fetch user books');
    }
  };

  useEffect(() => {
    fetchUserBooks();
  }, []);

  if (!userBooks) {
    return (
      <div className='container mt-4'>
        <h1>My Books</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='container mt-4'>
      <h3>My Books</h3>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Author</th>
            <th>Book</th>
            <th>Library</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {userBooks.length === 0 ? (
            <tr>
              <td colSpan={4} className='text-center'>
                No user books found
              </td>
            </tr>
          ) : (
            userBooks.map((userBook) => (
              <tr key={userBook.id}>
                <td>{userBook.book?.author}</td>
                <td>{userBook.book?.title}</td>
                <td>{userBook.book?.library?.name}</td>
                <td>{userBook.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default MyBooks;
