import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Banner */}
      <div className="about-hero">
        <div className="hero-content">
          <h1>About Us</h1>
          <div className="hero-divider"></div>
          <p className="hero-subtitle">Your Trusted Partner in Car Rental Services Since 2010</p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="content-wrapper">
        <div className="about-card">
          <div className="about-header">
            <div className="section-badge">OUR MISSION</div>
            <h2 className="section-title">If You Want To See The World, We Will Help You</h2>
            <div className="section-separator"></div>
            <p className="section-intro">
              Providing exceptional car rental experiences with a personalized approach. 
              We connect car owners and renters worldwide with transparency, security, and convenience.
            </p>
          </div>

          <div className="about-story">
            <h3 className="story-heading">Our Story</h3>
            
            <div className="story-content">
              <p>
                Oi-jo provides the first online service dealing with car rental, being the first service in Europe to make 
                it possible for anyone to rent our their vehicle, provided that they comply with the specified conditions. 
                We are enabling you to bypass unnecessary costs of car rental agencies and to use high-quality vehicles of private
                car Owners and car dealers; such cars are offered at prices adjusted to your individual possibilities.
              </p>
              
              <p>
                Oi-jo is an online car rental service enabling car owners to rent out their vehicles to 
                renters all over the world. That's attractive, isn't it? Car owners, on the one hand, 
                can make money by car rental while, on the other hand, we offer renters a wider range of 
                vehicles along with large savings in comparison to car rental agencies, particularly if 
                long-term rental is involved.
              </p>
              
              <p>
                We are aware of the fact that trust and security are crucial when we are connecting individuals 
                from all over the world! As a renter, you may view feedback submitted by previous renters, but also 
                feedback provided by car owners. Oi-jo offers the widest choice of cars – sports cars, convertibles, 
                4WD-vehicles, and luxury limousines – we will find the car that suits you best!
              </p>
              
              <p>
                We offer flexible, mid-term, and long-term car rentals for periods from 7 days to 12 months. 
                Oi-jo is the latest flexible car rental system in Europe, and we are able to adapt to all methods 
                of business operation pertaining to car rental. Oi-jo also offers a variety of cars for long-term rental. 
                <strong> Save up to 40% in comparison to other car rental agencies!</strong> See for yourselves on our Website!
              </p>
            </div>

            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Years of Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Satisfied Customers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5K+</span>
                <span className="stat-label">Available Cars</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">40%</span>
                <span className="stat-label">Cost Savings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;