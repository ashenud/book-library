import { useState } from 'react';
import ToastContainer from '../components/ToastContainer';
import api from '../services/api';

const Login = () => {
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

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);

      addToast('success', 'Login successful!');
    } catch (err: any) {
      addToast('danger', err.message || 'Something went wrong');
    }
  };

  return (
    <div className='container mt-4'>
      <h1>Login</h1>
      <div className='mb-3'>
        <label>Email</label>
        <input type='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className='mb-3'>
        <label>Password</label>
        <input
          type='password'
          className='form-control'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className='btn btn-primary w-100' onClick={handleLogin}>
        Login
      </button>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};
export default Login;
