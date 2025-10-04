import React from 'react';
import InteractiveNavMenu from '../components/InteractiveNavMenu';
import StatsBar from '../components/StatsBar';
import FAQAccordion from '../components/FAQAccordion';

const About = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#f7fbff,#ffffff)' }}>
      <div style={{ padding: '20px 40px' }}>
        <InteractiveNavMenu colorScheme="teal" />
      </div>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ color: '#006064' }}>About AdoptNest</h1>
        <p>AdoptNest connects loving adopters with pets in need. Our mission is to make adoption simple, transparent, and joyful.</p>
        <div style={{ margin: '20px 0' }}>
          <StatsBar />
        </div>
        <h2>What we do</h2>
        <ul>
          <li>Curated pet listings from verified owners and shelters</li>
          <li>Smart matching to help you find the right companion</li>
          <li>Guides and resources to prepare your home for adoption</li>
        </ul>
        <h2>Our values</h2>
        <p>We prioritize animal welfare, responsible adoption, and community education. Every adoption is a second chance.</p>
        <h2>FAQ</h2>
        <FAQAccordion />
      </div>
    </div>
  );
};

export default About;


