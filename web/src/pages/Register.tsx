import { useState } from 'react';
import ToastContainer from '../components/ToastContainer';
import api from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toasts, setToasts] = useState<{ id: number; type?: 'success' | 'danger'; message: string }[]>([]);

  const addToast = (type: 'success' | 'danger', message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents browser reload

    try {
      const res = await api.post('/auth/register', { name, email, password });
      addToast('success', res.data.message || 'Registration successful!');
    } catch (err: any) {
      addToast('danger', err.response?.data?.message || err.message || 'Registration failed!');
    }
  };

  return (
    <div className='container mt-4'>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            id='name'
            name='name'
            type='text'
            className='form-control'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            className='form-control'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='btn btn-success w-100'>
          Register
        </button>
      </form>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default Register;
