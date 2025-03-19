import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from '../redux/cartSlice';
import './Checkout.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector(state => state.cart);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleCheckout = () => {
    alert('Thank you for your purchase!');
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return <div className="checkout-empty">Your cart is empty</div>;
  }

  return (
    <div className="checkout-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p>${item.price.toFixed(2)}</p>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => handleRemoveItem(item.id)} className="remove-button">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="checkout-summary">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button onClick={handleCheckout} className="checkout-button">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Checkout;