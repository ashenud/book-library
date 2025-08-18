import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Login from './pages/Login';
import MyBooks from './pages/MyBooks';
import Register from './pages/Register';
import User from './pages/User';

const App = () => {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/my-books' element={<MyBooks />} />
        <Route path='/users' element={<User />} />
      </Routes>
    </Router>
  );
};

export default App;
