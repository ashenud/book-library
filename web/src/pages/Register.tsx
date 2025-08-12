import { useState } from 'react';
import api from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      alert(res.data.message);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className='container mt-4'>
      <h1>Register</h1>
      <div className='mb-3'>
        <label>Name</label>
        <input type='text' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
      </div>
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
      <button className='btn btn-success w-100' onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};
export default Register;
