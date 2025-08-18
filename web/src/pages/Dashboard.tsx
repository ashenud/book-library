import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ToastContainer from '../components/ToastContainer';
import api from '../services/api';

interface User {
  id: number;
  role: 'admin' | 'user';
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

interface UserBook {
  id: number;
  user_id: number;
  book_id: number;
  status: string;
  review_text?: string;
  Book?: {
    id: number;
    title: string;
    author: string;
  };
  User?: {
    id: number;
    name: string;
  };
}

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userBooks, setUserBooks] = useState<UserBook[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; type?: 'success' | 'danger'; message: string }[]>([]);

  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  const loggedUser = userString ? JSON.parse(userString) : null;

  const addToast = (type: 'success' | 'danger', message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(res.data);
    } catch (err: any) {
      addToast('danger', err.response?.data?.error || 'Failed to fetch users');
    }
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
    fetchUsers();
    fetchUserBooks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      addToast('danger', 'Failed to delete user');
    }

    fetchUsers();
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!selectedUser) return;

    try {
      await api.put(`/users/${selectedUser.id}`, selectedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });

      addToast('success', 'User updated successfully');
    } catch (error) {
      addToast('danger', 'Failed to update user');
    }

    setShowModal(false);
    fetchUsers();
  };

  if (!users || !userBooks) {
    return (
      <div className='container mt-4'>
        <h1>Dashboard</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='container mt-4'>
      <h1>Dashboard</h1>

      {/* User Books Section */}
      <h3>User Books</h3>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>User</th>
            <th>Book</th>
            <th>Status</th>
            <th>Review</th>
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
            userBooks.map((ub) => (
              <tr key={ub.id}>
                <td>{ub.User?.name || ub.user_id}</td>
                <td>{ub.Book?.title || ub.book_id}</td>
                <td>{ub.status}</td>
                <td>{ub.review_text || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* User Management Section */}
      <h3>User Management</h3>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button className='btn btn-sm btn-warning me-2' onClick={() => handleEdit(u)}>
                  View
                </button>
                <button
                  className='btn btn-sm btn-danger'
                  onClick={() => handleDelete(u.id)}
                  disabled={loggedUser?.role !== 'admin' || loggedUser?.id === u.id}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Name</label>
          <input
            type='text'
            className='form-control mb-2'
            value={selectedUser?.name || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser!, name: e.target.value })}
          />

          <label>Email</label>
          <input type='email' className='form-control mb-2' value={selectedUser?.email || ''} disabled />

          <label>Phone</label>
          <input
            type='text'
            className='form-control mb-2'
            value={selectedUser?.phone || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser!, phone: e.target.value })}
          />

          <label>Address</label>
          <input
            type='text'
            className='form-control mb-2'
            value={selectedUser?.address || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser!, address: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={handleSave}
            disabled={selectedUser?.id !== loggedUser?.id && loggedUser?.role !== 'admin'}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default Dashboard;
