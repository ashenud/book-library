import { useState } from 'react';
import api from '../services/api';

const Home = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [distance, setDistance] = useState('');
  const [books, setBooks] = useState<any[]>([]);

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

  return (
    <div className='container mt-4'>
      <h1>Public Book Search</h1>
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
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Library</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
