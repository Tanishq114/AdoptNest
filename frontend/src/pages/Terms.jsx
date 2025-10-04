import React from 'react';
import InteractiveNavMenu from '../components/InteractiveNavMenu';

const Terms = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      <div style={{ padding: '20px 40px' }}>
        <InteractiveNavMenu colorScheme="teal" />
      </div>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <h1>Terms of Service</h1>
        <p>Welcome to AdoptNest. By using our services you agree to these terms.</p>
        <h2>Use of the platform</h2>
        <p>You agree to use AdoptNest responsibly and comply with all applicable laws. Listings must be truthful and accurate.</p>
        <h2>Accounts</h2>
        <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
        <h2>Listings and transactions</h2>
        <p>AdoptNest facilitates connections between adopters and owners/shelters. We are not responsible for third-party actions.</p>
        <h2>Privacy</h2>
        <p>See our Privacy Policy for how we collect and use information.</p>
      </div>
    </div>
  );
};

export default Terms;


