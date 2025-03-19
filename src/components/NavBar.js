import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart || { items: [] });
  const cartCount = cart.items ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <div style={{
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #ddd',
      backgroundColor: '#fff'
    }}>
      {/* Logo and Navigation Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>
          <h1 style={{ margin: 0, fontSize: '24px' }}>🛍️ E-Shop</h1>
        </Link>
        <Link to="/product" style={{ 
          textDecoration: 'none', 
          color: '#333',
          padding: '8px 16px',
          borderRadius: '4px',
          transition: 'background-color 0.3s'
        }}>
          Products
        </Link>
      </div>

      {/* Cart Icon */}
      <div 
        onClick={() => navigate('/checkout')}
        style={{ 
          cursor: 'pointer',
          position: 'relative',
          padding: '8px'
        }}
      >
        🛒
        {cartCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '0',
            right: '0',
            background: '#ff4444',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '12px'
          }}>
            {cartCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default NavBar;