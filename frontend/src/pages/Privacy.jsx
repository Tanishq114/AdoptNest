import React from 'react';
import InteractiveNavMenu from '../components/InteractiveNavMenu';

const Privacy = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      <div style={{ padding: '20px 40px' }}>
        <InteractiveNavMenu colorScheme="teal" />
      </div>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <h1>Privacy Policy</h1>
        <p>We respect your privacy. This policy explains what information we collect and how we use it.</p>
        <h2>Information we collect</h2>
        <ul>
          <li>Account information (name, email, phone)</li>
          <li>Listing details and preferences</li>
          <li>Usage analytics to improve our service</li>
        </ul>
        <h2>How we use information</h2>
        <p>We use data to provide and improve the service, communicate with you, and keep the platform safe.</p>
        <h2>Your choices</h2>
        <p>You can access and update profile information, and request deletion by contacting support.</p>
      </div>
    </div>
  );
};

export default Privacy;


