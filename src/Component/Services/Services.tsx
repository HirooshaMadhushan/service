import React, { useState, useEffect } from 'react';
import './Services.css';
import { motion } from 'framer-motion';

const Services = () => {
  const [activeTab, setActiveTab] = useState('maintenance');
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const serviceCategories = [
    { id: 'maintenance', label: 'Maintenance', icon: '🔧' },
    { id: 'repair', label: 'Repair', icon: '⚙️' },
    { id: 'diagnostic', label: 'Diagnostic', icon: '🔍' },
    { id: 'custom', label: 'Custom Services', icon: '🏎️' }
  ];

  const servicesList = {
    maintenance: [
      {
        title: 'Oil Change Service',
        description: 'Complete oil change with high-quality lubricants, oil filter replacement, and a multi-point inspection.',
        price: 'From $39.99',
        duration: '30-45 mins',
        icon: '🔧',
        bgColor: '#e3f2fd'
      },
      {
        title: 'Brake Maintenance',
        description: 'Inspection and maintenance of brake pads, rotors, and brake fluid to ensure optimal braking performance.',
        price: 'From $89.99',
        duration: '60-90 mins',
        icon: '🛑',
        bgColor: '#ffebee'
      },
      {
        title: 'Filter Replacement',
        description: 'Replacement of air, fuel, and cabin filters to improve engine performance and air quality.',
        price: 'From $49.99',
        duration: '30-45 mins',
        icon: '🔄',
        bgColor: '#f1f8e9'
      },
      {
        title: 'Tire Rotation & Balancing',
        description: 'Even out tire wear and improve vehicle handling with professional tire rotation and balancing.',
        price: 'From $29.99',
        duration: '45-60 mins',
        icon: '🛞',
        bgColor: '#ede7f6'
      }
    ],
    repair: [
      {
        title: 'Engine Repair',
        description: 'Comprehensive engine repair services from minor fixes to major overhauls for all vehicle makes and models.',
        price: 'From $149.99',
        duration: '2-8 hours',
        icon: '⚙️',
        bgColor: '#e8f5e9'
      },
      {
        title: 'Transmission Service',
        description: 'Transmission fluid change, filter replacement, and comprehensive inspection of transmission components.',
        price: 'From $119.99',
        duration: '1-2 hours',
        icon: '🔄',
        bgColor: '#e0f7fa'
      },
      {
        title: 'Exhaust System Repair',
        description: 'Repair or replacement of mufflers, catalytic converters, and other exhaust components.',
        price: 'From $99.99',
        duration: '1-3 hours',
        icon: '💨',
        bgColor: '#fce4ec'
      },
      {
        title: 'Electrical System Service',
        description: 'Diagnosis and repair of electrical issues, including battery, alternator, and starter problems.',
        price: 'From $79.99',
        duration: '1-4 hours',
        icon: '⚡',
        bgColor: '#fff8e1'
      }
    ],
    diagnostic: [
      {
        title: 'Computer Diagnostics',
        description: 'Advanced computer diagnostics to identify error codes and system malfunctions.',
        price: '$69.99',
        duration: '30-60 mins',
        icon: '💻',
        bgColor: '#e8eaf6'
      },
      {
        title: 'Engine Performance Check',
        description: 'Comprehensive assessment of engine performance, fuel efficiency, and power output.',
        price: '$89.99',
        duration: '45-60 mins',
        icon: '📊',
        bgColor: '#f3e5f5'
      },
      {
        title: 'Pre-Purchase Inspection',
        description: 'Detailed inspection of vehicles prior to purchase to identify potential issues and maintenance needs.',
        price: '$129.99',
        duration: '60-90 mins',
        icon: '🔍',
        bgColor: '#efebe9'
      },
      {
        title: 'Emissions Testing',
        description: 'State-certified emissions testing to ensure your vehicle meets environmental standards.',
        price: '$49.99',
        duration: '30 mins',
        icon: '🌿',
        bgColor: '#e0f2f1'
      }
    ],
    custom: [
      {
        title: 'Fleet Services',
        description: 'Specialized maintenance programs for business fleets with priority scheduling and volume discounts.',
        price: 'Custom Quote',
        duration: 'Varies',
        icon: '🚐',
        bgColor: '#e3f2fd'
      },
      {
        title: 'Performance Upgrades',
        description: 'Professional installation of performance parts and tuning to enhance vehicle capabilities.',
        price: 'Custom Quote',
        duration: 'Varies',
        icon: '🏎️',
        bgColor: '#f1f8e9'
      },
      {
        title: 'Restoration Services',
        description: 'Expert restoration of classic and vintage vehicles to original or custom specifications.',
        price: 'Custom Quote',
        duration: 'Project Based',
        icon: '🔧',
        bgColor: '#fffde7'
      },
      {
        title: 'Mobile Service',
        description: 'On-site maintenance and repair services at your home or workplace for convenient vehicle care.',
        price: 'From $99.99',
        duration: 'By Appointment',
        icon: '🚗',
        bgColor: '#e8eaf6'
      }
    ]
  };

  // Reset active card when changing tabs
  useEffect(() => {
    setActiveCardIndex(null);
  }, [activeTab]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const benefits = [
    {
      title: 'Certified Technicians',
      description: 'Our ASE-certified technicians have years of experience working with all vehicle makes and models.',
      icon: '👨‍🔧',
      color: '#3498db'
    },
    {
      title: 'Warranty Protection',
      description: 'All repairs and parts come with a comprehensive warranty for your peace of mind.',
      icon: '🛡️',
      color: '#2ecc71'
    },
    {
      title: 'Transparent Pricing',
      description: 'No hidden fees or surprises. We provide detailed estimates before beginning any work.',
      icon: '💰',
      color: '#f39c12'
    },
    {
      title: 'Convenient Scheduling',
      description: 'Online booking, flexible appointments, and loaner vehicles available for longer repairs.',
      icon: '📅',
      color: '#9b59b6'
    }
  ];

  const handleCardClick = (index) => {
    setActiveCardIndex(activeCardIndex === index ? null : index);
  };

  return (
    <div className=" services-container">
      
        
      <div className="section-divider ">
        
        <div className="divider-content">
          <span className="divider-icon">⚙️</span>
          <h2>Our Services</h2>
          <span className="divider-icon">🔧</span>
        </div>
      </div>

      <div className="services-intro">
        <div className="intro-content ">
          <p>
            Our service center is equipped with state-of-the-art diagnostic tools and staffed by experienced technicians
            who are passionate about providing the highest quality automotive service. Whether you need routine
            maintenance or complex repairs, we're here to keep your vehicle running at its best.
          </p>
        </div>
      </div>

      <div className="services-category-tabs">
        {serviceCategories.map((category) => (
          <button
            key={category.id}
            className={`category-tab ${activeTab === category.id ? 'active' : ''}`}
            onClick={() => setActiveTab(category.id)}
          >
            <span className="tab-icon">{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>

      <motion.div 
        className="services-gallery"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={activeTab}
      >
        {servicesList[activeTab].map((service, index) => (
          <motion.div 
            className={`service-gallery-card ${activeCardIndex === index ? 'expanded' : ''}`}
            key={index}
            variants={itemVariants}
            onClick={() => handleCardClick(index)}
            style={{ 
              background: service.bgColor,
              borderTop: `4px solid ${
                index === 0 ? '#3498db' : 
                index === 1 ? '#e74c3c' : 
                index === 2 ? '#2ecc71' : 
                '#f39c12'
              }`
            }}
          >
            <div className="gallery-card-header">
              <div className="service-icon-container">
                <span className="service-gallery-icon">{service.icon}</span>
              </div>
              <h3>{service.title}</h3>
            </div>
            
            <div className="gallery-card-content">
              <p className="service-gallery-description">{service.description}</p>
              <div className="service-gallery-details">
                <div className="detail-item">
                  <span className="detail-icon">💲</span>
                  <span className="detail-text">{service.price}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">⏱️</span>
                  <span className="detail-text">{service.duration}</span>
                </div>
              </div>
              {activeCardIndex === index && (
                <button className="book-service-btn">Book Now</button>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="section-divider">
        <div className="divider-content">
          <span className="divider-icon">✨</span>
          <h2>Why Choose Us</h2>
          <span className="divider-icon">✨</span>
        </div>
      </div>

      <div className="benefits-container">
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <motion.div
              className="benefit-card"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              style={{ borderTop: `4px solid ${benefit.color}` }}
            >
              <div className="benefit-icon-container" style={{ backgroundColor: benefit.color }}>
                <div className="benefit-icon">{benefit.icon}</div>
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="testimonials-section">
        <div className="section-divider">
          <div className="divider-content">
            <span className="divider-icon">⭐</span>
            <h2>Customer Feedback</h2>
            <span className="divider-icon">⭐</span>
          </div>
        </div>
        
        <div className="testimonials-slider">
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">"The team at this service center is absolutely exceptional. My car was running better than ever after their thorough service."</p>
            <div className="testimonial-author">— Michael R.</div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">"Transparent pricing, on-time service, and excellent work. I won't take my vehicle anywhere else."</p>
            <div className="testimonial-author">— Sarah L.</div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-rating">★★★★★</div>
            <p className="testimonial-text">"The diagnostic service saved me thousands in potential repairs by identifying the actual issue quickly."</p>
            <div className="testimonial-author">— James T.</div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Experience Premium Vehicle Care?</h2>
          <p>Book your service appointment today and discover why we're the most trusted automotive service center in the region.</p>
          < a href="/booking" ><button className="cta-button ">Schedule Your Service</button></a>
        </div>
        <div className="cta-pattern"></div>
      </div>
    </div>
  );
};

export default Services;