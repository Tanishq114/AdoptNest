import React, { useState } from 'react';
import InteractiveNavMenu from '../components/InteractiveNavMenu';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#f7fbff,#ffffff)' }}>
      <div style={{ padding: '20px 40px' }}>
        <InteractiveNavMenu colorScheme="teal" />
      </div>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ color: '#006064' }}>Contact Us</h1>
        <p>Have a question about adoption or listings? Send us a message and we’ll get back within 24 hours.</p>
        {sent ? (
          <div style={{ background: '#e8f5e9', border: '1px solid #c8e6c9', padding: '16px', borderRadius: '10px', color: '#2e7d32' }}>
            Thanks! Your message has been sent.
          </div>
        ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', alignItems: 'start' }}>
          <form onSubmit={submit} style={{ display: 'grid', gap: '12px' }}>
            <input placeholder="Name" value={form.name} onChange={(e)=>setForm({ ...form, name: e.target.value })} style={{ padding: '14px 16px', borderRadius: '10px', border: '1px solid #cfd8dc' }} />
            <input placeholder="Email" type="email" value={form.email} onChange={(e)=>setForm({ ...form, email: e.target.value })} style={{ padding: '14px 16px', borderRadius: '10px', border: '1px solid #cfd8dc' }} />
            <textarea placeholder="Message" rows={8} value={form.message} onChange={(e)=>setForm({ ...form, message: e.target.value })} style={{ padding: '14px 16px', borderRadius: '10px', border: '1px solid #cfd8dc' }} />
            <button type="submit" style={{ background: '#006064', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px 16px', fontWeight: 700, width: '180px' }}>Send</button>
          </form>
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ background: '#ffffff', border: '1px solid #eee', borderRadius: '12px', padding: '14px', boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
              <strong>Support</strong>
              <p style={{ margin: '6px 0 0 0' }}>support@adoptnest.example<br/>+1 (555) 123-4567</p>
            </div>
            <div style={{ background: '#ffffff', border: '1px solid #eee', borderRadius: '12px', padding: '0', overflow: 'hidden', boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
              <iframe title="Map" src="https://maps.google.com/maps?q=Central%20Park%2C%20NY&t=&z=13&ie=UTF8&iwloc=&output=embed" style={{ width: '100%', height: '240px', border: '0' }}></iframe>
            </div>
          </div>
        </div>
        )}
        <h2 style={{ marginTop: '30px' }}>Reach us</h2>
        <p>Email: support@adoptnest.example</p>
        <p>Phone: +1 (555) 123-4567</p>
      </div>
    </div>
  );
};

export default Contact;


