import React from 'react';

export default function HelpFab() {
  return (
    <a href="/contact" aria-label="Help and support" style={{ position: 'fixed', right: 18, bottom: 18, zIndex: 1000, textDecoration: 'none' }}>
      <div style={{ background: 'linear-gradient(135deg,#ff7ab6,#b388ff)', color: '#fff', width: 56, height: 56, borderRadius: '50%', display: 'grid', placeItems: 'center', boxShadow: '0 10px 24px rgba(0,0,0,0.2)' }}>❓</div>
    </a>
  );
}


