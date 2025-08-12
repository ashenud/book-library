import { useState } from 'react';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      alert(res.data.message);
      localStorage.setItem('token', res.data.token);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Login failed');
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
    </div>
  );
};
export default Login;
