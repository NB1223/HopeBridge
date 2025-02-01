import React from 'react';
import './Ngo_Intro.css'; // Create a corresponding CSS file for styling

const AboutNGOsPage = () => {
  return (
    <div className="about-ngos-page">
      <h1>About the NGOs</h1>

      <section className="ngo-section">
        <h2>What is an NGO?</h2>
        <p>
          A Non-Governmental Organization (NGO) is a nonprofit organization that operates independently of any government. 
          NGOs focus on addressing social, environmental, and humanitarian issues by engaging in advocacy, research, and direct actions.
        </p>
      </section>

      <section className="ngo-section">
        <h2>Our Partnered NGOs</h2>
        <p>
          We collaborate with various NGOs to support causes ranging from education and health to environmental sustainability and human rights. 
          These NGOs work tirelessly to create lasting impacts in communities and improve the lives of those in need.
        </p>
        <ul>
          <li><strong>Hope Bridge:</strong> Focuses on sustainable development projects to uplift marginalized communities.</li>
          <li><strong>Save the Earth:</strong> Dedicated to combating climate change and promoting environmental awareness.</li>
          <li><strong>Children's Aid:</strong> Provides education, healthcare, and care for underprivileged children worldwide.</li>
        </ul>
      </section>

      <section className="ngo-section">
        <h2>How Can You Help?</h2>
        <p>
          NGOs depend on the generosity of individuals like you to fund their projects and make a positive difference. 
          By donating, volunteering, or raising awareness, you can play a vital role in the success of these initiatives.
        </p>
      </section>

      <section className="ngo-section">
        <h2>Why Support NGOs?</h2>
        <p>
          NGOs provide invaluable services that governments or other institutions might not focus on. They are often the first responders to crises, 
          and they work at the grassroots level to address the root causes of various social issues. By supporting NGOs, 
          you contribute to long-term, sustainable solutions.
        </p>
      </section>
    </div>
  );
};

export default AboutNGOsPage;
