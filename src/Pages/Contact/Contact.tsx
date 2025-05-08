import React, { useState } from 'react';
import './Contact.css';
import { motion } from 'framer-motion';

const Contact = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: '' });
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormStatus({ message: 'Sending your message...', type: '' });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', 'YOUR_ACCESS_KEY'); // Replace with your Web3Forms access key
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus({
          message: 'Message sent successfully! We\'ll get back to you soon.',
          type: 'success'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus({
          message: 'Failed to send message. Please try again later.',
          type: 'error'
        });
      }
    } catch (error) {
      setFormStatus({
        message: 'An error occurred. Please try again later.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
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

  return (
    <div className="contact-container">
      <motion.div
        className="contact-banner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="banner-content">
          <h1>Contact Us</h1>
          <p>We're here to help and answer any questions you might have</p>
        </div>
      </motion.div>

      <motion.div className="contact-section" initial="hidden" animate="visible" variants={containerVariants}>
        <motion.div className="contact-left" variants={itemVariants}>
          <h2>Send us a message</h2>
          <p className="contact-intro">
            We'd love to hear from you. Our team is always ready to assist you with any inquiries.
          </p>

          {formStatus.message && (
            <div className={`form-status ${formStatus.type}`}>
              {formStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-column">
                <label htmlFor="name">
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={errors.name ? 'error-input' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-column">
                <label htmlFor="email">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  className={errors.email ? 'error-input' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-column">
                <label htmlFor="message">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className={errors.message ? 'error-input' : ''}
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className={isSubmitting ? 'submitting' : ''}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </motion.div>

        <div className="contact-right">
          <motion.div
            className="contact-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h3>Contact Information</h3>
            <p>The car was in great condition, and the owner was very helpful throughout.</p>

            <div className="box-sec">
              <span role="img" aria-label="Phone">📞</span>
              <p>Need immediate assistance? Call our customer service.</p>
              <div className="w-box">
                <h5>+44 123 456 789</h5>
              </div>
            </div>

            <div className="box-sec">
              <span role="img" aria-label="Email">📧</span>
              <p>Have questions or feedback? Email us and we'll respond ASAP.</p>
              <div className="w-box">
                <h5>info@oi-jo.com</h5>
              </div>
            </div>

            <div className="box-sec">
              <span role="img" aria-label="Social">🌐</span>
              <p>Connect with us on social media for updates and support.</p>
              <div className="icon-box">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> |
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> |
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a> |
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
