import React from 'react';
import './About_Us.css'; // Create a corresponding CSS file for styling

const AboutUsPage = () => {
  return (
    <div className="about-us-page">
      <h1>About Us</h1>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          We are dedicated to eliminating the middleman and directly connecting donors with NGOs during times of crisis. 
          Our platform ensures that every contribution is received by those who need it the most — quickly, efficiently, and without delay. 
          By cutting out the intermediaries, we ensure that 100% of your donations go directly to the causes that matter.
        </p>
      </section>

      <section className="vision-section">
        <h2>Our Vision</h2>
        <p>
          We envision a world where crisis relief is delivered swiftly and efficiently, and where every donation is accounted for, 
          making a tangible impact. Through our platform, we bridge the gap between generous individuals and the NGOs that are on the ground, 
          providing them with the resources they need to respond to urgent situations.
        </p>
      </section>

      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <p>
          Our platform connects donors directly with reputable NGOs, allowing them to contribute to emergency relief efforts in real time. 
          Here’s how it works:
        </p>
        <ol>
          <li><strong>Browse Verified NGOs:</strong> We feature a carefully curated list of NGOs working on the frontlines of humanitarian crises.</li>
          <li><strong>Choose a Cause:</strong> Select the cause you wish to support — whether it’s disaster relief, health aid, food distribution, or more.</li>
          <li><strong>Donate Directly:</strong> With a simple click, you can donate directly to the NGO of your choice, ensuring your contribution goes straight to the people in need.</li>
          <li><strong>Track Your Impact:</strong> After donation, you’ll receive updates on how your contribution has been used, so you can see the direct impact of your support.</li>
        </ol>
      </section>

      <section className="our-impact-section">
        <h2>Our Impact</h2>
        <p>
          Since our inception, we have helped channel millions of dollars directly to NGOs in crisis zones, resulting in faster aid delivery and 
          more transparent usage of donations. Our work has empowered both donors and NGOs to act decisively when it matters most.
        </p>
      </section>

      <section className="why-choose-us-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li><strong>Transparency:</strong> You will always know exactly where your money goes and how it’s used.</li>
          <li><strong>Efficiency:</strong> Donations are delivered directly to those in need, without delays or administrative overhead.</li>
          <li><strong>Impact:</strong> You are directly contributing to urgent, lifesaving efforts on the ground.</li>
          <li><strong>Trustworthy Partnerships:</strong> We only partner with reputable, verified NGOs that have a proven track record in crisis management.</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUsPage;