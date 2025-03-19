import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(credentials)).unwrap();
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const renderUserInfo = () => {
    if (!user) return null;
    
    return (
      <div>
        <h2>Welcome, {String(user.username || 'User')}</h2>
        <p>Email: {String(user.email || 'N/A')}</p>
        <p>Name: {`${String(user.firstName || '')} ${String(user.lastName || '')}`}</p>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto', padding: '20px' }}>
      {isAuthenticated && user ? (
        renderUserInfo()
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            style={{ padding: '8px' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            style={{ padding: '8px' }}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '10px', 
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && (
            <p style={{ color: 'red', margin: '10px 0' }}>
              {String(error)}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default Login;