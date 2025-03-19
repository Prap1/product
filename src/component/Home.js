import React from 'react';
import NavBar from '../components/NavBar';

const Home = () => {
  const demoImages = [
    {
      id: 1,
      src: 'https://picsum.photos/800/400?random=1',
      title: 'Featured Products'
    },
    {
      id: 2,
      src: 'https://picsum.photos/800/400?random=2',
      title: 'New Arrivals'
    },
    {
      id: 3,
      src: 'https://picsum.photos/800/400?random=3',
      title: 'Best Sellers'
    }
  ];

  return (
    <div>
      <NavBar />
      
      <main style={{ padding: '20px', minHeight: 'calc(100vh - 120px)' }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '30px', 
          maxWidth: '1200px', 
          margin: '0 auto' 
        }}>
          {demoImages.map(image => (
            <div key={image.id} style={{ textAlign: 'center' }}>
              <h2 style={{ margin: '20px 0' }}>{image.title}</h2>
              <img 
                src={image.src} 
                alt={image.title}
                style={{
                  width: '100%',
                  maxHeight: '400px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
              />
            </div>
          ))}
        </div>
      </main>

      <footer style={{
        backgroundColor: '#333',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        marginTop: 'auto'
      }}>
        <p>© 2024 Your E-Commerce Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
