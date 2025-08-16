import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ToastContainer from '../components/ToastContainer';
import api from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; type?: 'success' | 'danger'; message: string }[]>([]);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const addToast = (type: 'success' | 'danger', message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchUsers = async () => {
    const url = role === 'admin' ? '/users' : '/users/me';

    try {
      const res = await api.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        setUsers([res.data]); // wrap single object into array
      }
    } catch (err: any) {
      addToast('danger', err.response?.data?.error || 'Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
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
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      addToast('success', 'User updated successfully');
    } catch (error) {
      addToast('danger', 'Failed to update user');
    }

    setShowModal(false);
    fetchUsers();
  };

  if (!users) {
    <div className='container mt-4'>
      <h1>Dashboard</h1>
      <p>Loading...</p>;
    </div>;
  }

  return (
    <div className='container mt-4'>
      <h1>Dashboard</h1>
        <>
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
                      Edit
                    </button>
                    <button className='btn btn-sm btn-danger' onClick={() => handleDelete(u.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type='text'
            className='form-control mb-2'
            value={selectedUser?.name || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser!, name: e.target.value })}
          />
          <input
            type='email'
            className='form-control mb-2'
            value={selectedUser?.email || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser!, email: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default Dashboard;
