import React, { useState } from 'react';

function NutritionCTA() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
    // In a real app, send to backend/newsletter provider
  };

  return (
    <section style={{ background: '#fafafa', padding: '40px 20px', borderTop: '1px solid #eee' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '24px', alignItems: 'center' }}>
        <div>
          <div style={{ width: '120px', height: '6px', background: '#ff7a00', borderRadius: '4px', marginBottom: '16px' }} />
          <h2 style={{ fontSize: '40px', margin: '0 0 12px 0', color: '#0e554e' }}>Pet Nutrition Chart</h2>
          <p style={{ fontSize: '22px', margin: '0 0 16px 0', color: '#ff7a00' }}>Fill up the form to get the FREE nutrition chart!</p>
          <p style={{ color: '#444', marginBottom: '18px' }}>By submitting this form, you agree to receive emails from AdoptNest.</p>

          {submitted ? (
            <div style={{ background: '#e8f5e9', border: '1px solid #c8e6c9', padding: '16px', borderRadius: '10px', color: '#2e7d32' }}>
              Thanks {name}! Check your inbox for the download link.
            </div>
          ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '14px' }}>
              <div style={{ width: '100%', borderRadius: '14px', border: '2px solid #0e8b85', background: '#fff', overflow: 'hidden' }}>
                <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" style={{ width: '100%', padding: '16px 18px', border: 'none', outline: 'none', fontSize: '18px' }} />
              </div>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <div style={{ width: '100%', borderRadius: '14px', border: '2px solid #0e8b85', background: '#fff', overflow: 'hidden' }}>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" type="email" style={{ width: '100%', padding: '16px 18px', border: 'none', outline: 'none', fontSize: '18px' }} />
              </div>
            </div>
            <button type="submit" style={{ width: '100%', background: '#0e8b85', color: '#fff', border: '2px solid #0e8b85', borderRadius: '14px', padding: '16px 18px', fontWeight: 800, letterSpacing: '0.5px', cursor: 'pointer' }}>DOWNLOAD NOW</button>
          </form>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ background: '#19736f', color: '#fff', borderRadius: '36px', padding: '24px', boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }}>
            <h3 style={{ fontSize: '36px', margin: 0 }}>Pet Nutrition Chart</h3>
            <p style={{ margin: '8px 0 0 0' }}>by Team AdoptNest</p>
            <div style={{ height: '220px', display: 'grid', placeItems: 'center' }}>
              <span style={{ fontSize: '120px' }}>🐶🍖</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NutritionCTA;


