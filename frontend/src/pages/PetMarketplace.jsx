import React from 'react';

function PetMarketplace() {
  const containerStyle = {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '24px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '16px'
  };

  const cardStyle = {
    border: '1px solid #eee',
    borderRadius: '12px',
    overflow: 'hidden',
    background: '#fff'
  };

  const imageWrapStyle = {
    width: '100%',
    aspectRatio: '4 / 3',
    background: '#f3f3f3',
    overflow: 'hidden'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  };

  return (
    <div style={containerStyle}>
      <h1>Pet Marketplace</h1>
      <p>Browse available pets. This is a placeholder list; wire to API later.</p>

      <div style={gridStyle}>
        {[1, 2, 3, 4].map((id) => (
          <div key={id} style={cardStyle}>
            <div style={imageWrapStyle}>
              <img
                style={imageStyle}
                src={`https://picsum.photos/seed/pet-${id}/600/400`}
                alt={`Pet ${id}`}
              />
            </div>
            <div style={{ padding: '12px' }}>
              <h3 style={{ margin: '0 0 8px 0' }}>Pet {id}</h3>
              <button>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PetMarketplace;
