import React from 'react';
import './Pricing.css'; // We'll create this CSS file for styling

const Pricing = () => {
  return (
    <section className="pricing-section">
      <h2>Make your content Accessible, Searchable, and Navigable</h2>
      <p>No questions asked refunds.</p>

      <div className="pricing-cards">
        <div className="pricing-card">
          <h3>Zionotes Starter</h3>
          <p>For individuals, and freelance translators.</p>
          <p className="price">$49.99</p>
          <p>/month</p>
          <button className="cta-button">Join Starter</button>
          <ul>
            <li>Process 20 minutes of video per month</li>
            <li>Edit outputs</li>
          </ul>
        </div>

        <div className="pricing-card">
          <h3>Zionotes Plus</h3>
          <p>Ideal for growing businesses and professional creators.</p>
          <p className="price">$99.99</p>
          <p>/month</p>
          <div className="promo-banner">Offer ends in 48 hours! Start today and save 50% off your first month</div>
          <button className="cta-button">Join Plus</button>
          <ul>
            <li>Process 60 minutes of video per month</li>
            <li>Flexible bulk pricing as your needs evolve</li>
          </ul>
        </div>

        <div className="pricing-card">
          <h3>Zionotes Enterprise</h3>
          <p>Used by media studios, streaming platforms and more.</p>
          <button className="cta-button">Contact Us</button>
          <ul>
            <li>Professional Metadata Handlers will review all automatic processing</li>
            <li>On-prem solutions</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
