import React from 'react';

function Stat({ value, label, icon }) {
  return (
    <div style={{ background: 'white', borderRadius: '14px', padding: '16px', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', textAlign: 'center', minWidth: 180 }}>
      <div style={{ fontSize: '28px' }}>{icon}</div>
      <div style={{ fontSize: '28px', fontWeight: 800, color: '#006064' }}>{value}</div>
      <div style={{ color: '#666' }}>{label}</div>
    </div>
  );
}

export default function StatsBar() {
  const stats = [
    { value: '12k+', label: 'Pets Adopted', icon: '🐾' },
    { value: '4.8★', label: 'User Rating', icon: '✨' },
    { value: '1.2k+', label: 'Shelters Listed', icon: '🏥' },
    { value: '24/7', label: 'Support', icon: '🛟' },
  ];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
      {stats.map(s => <Stat key={s.label} {...s} />)}
    </div>
  );
}


