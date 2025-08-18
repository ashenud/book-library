import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; // keeps active state
import { useNavigate } from 'react-router-dom';

const AppNavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Book Library</Navbar.Brand>
        </LinkContainer>

        {/* Mobile toggle (hamburger) */}
        <Navbar.Toggle aria-controls='main-navbar' />
        <Navbar.Collapse id='main-navbar'>
          <Nav className='ms-auto'>
            <LinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            {token && (
              <>
                <LinkContainer to='/my-books'>
                  <Nav.Link>My Books</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/users'>
                  <Nav.Link>Users</Nav.Link>
                </LinkContainer>
              </>
            )}

            <NavDropdown title='Account' id='account-dropdown' align='end'>
              {!token ? (
                <>
                  <LinkContainer to='/login'>
                    <NavDropdown.Item>Login</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <NavDropdown.Item>Register</NavDropdown.Item>
                  </LinkContainer>
                </>
              ) : (
                <NavDropdown.Item onClick={handleLogout} className='text-danger'>
                  Logout
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
