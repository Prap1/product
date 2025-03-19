import React from 'react';
import { useDispatch } from 'react-redux';
import './Product.css';

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch({
      type: 'cart/addItem',
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1
      }
    });
  };
  // Safely convert any value to string
  const safeString = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') {
      if (value.name) return value.name;
      if (value.title) return value.title;
      return '';
    }
    return String(value);
  };

  // Normalize tags to simple strings
  const normalizedTags = Array.isArray(product.tags)
    ? product.tags.map((tag) => safeString(tag))
    : [];

  return (
    <div className="product-card">
      <img 
        src={safeString(product.thumbnail)} 
        alt={safeString(product.title)}
        className="product-image"
      />
      <h3 className="product-title">{safeString(product.title)}</h3>
      <p className="product-description">{safeString(product.description)}</p>
      <div className="product-details">
        <span className="product-price">
          ${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
        </span>
        <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
      <div className="product-rating">
        <span>Rating: {typeof product.rating === 'number' ? product.rating.toFixed(1) : '0'}/5</span>
      </div>
      {normalizedTags.length > 0 && (
        <div className="tags-container">
          {normalizedTags.map((tag, index) => (
            <span key={`tag-${index}-${tag}`} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
      <button 
        onClick={handleAddToCart}
        disabled={product.stock <= 0}
        className="add-to-cart-button"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
