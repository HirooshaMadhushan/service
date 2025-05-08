import React, { useState, useEffect } from 'react';
import './Booking.css';
import { motion } from 'framer-motion';

const Booking = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    serviceDate: '',
    timeSlot: '',
    mealOption: 'none',
    mealItems: []
  });
  const [formStatus, setFormStatus] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tempMealItem, setTempMealItem] = useState({ itemName: '', quantity: 1 });

  // Available time slots
  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '01:00 PM - 02:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM'
  ];

  // Set minimum date to tomorrow
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: '' });
    
    if (name === 'mealOption' && value === 'none') {
      setFormData({ ...formData, [name]: value, mealItems: [] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleMealItemChange = (e) => {
    const { name, value } = e.target;
    setTempMealItem({ ...tempMealItem, [name]: name === 'quantity' ? parseInt(value) || 1 : value });
  };

  const addMealItem = () => {
    if (tempMealItem.itemName.trim() === '') {
      setErrors({ ...errors, mealItemName: 'Item name is required' });
      return;
    }

    setFormData({
      ...formData,
      mealItems: [...formData.mealItems, { ...tempMealItem }]
    });
    setTempMealItem({ itemName: '', quantity: 1 });
    setErrors({ ...errors, mealItemName: '' });
  };

  const removeMealItem = (index) => {
    const updatedMealItems = [...formData.mealItems];
    updatedMealItems.splice(index, 1);
    setFormData({ ...formData, mealItems: updatedMealItems });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.vehicleNumber.trim()) newErrors.vehicleNumber = 'Vehicle number is required';
    if (!formData.serviceDate) newErrors.serviceDate = 'Service date is required';
    if (!formData.timeSlot) newErrors.timeSlot = 'Time slot is required';
    if (formData.mealOption !== 'none' && formData.mealItems.length === 0) {
      newErrors.mealItems = 'Please add at least one meal item';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormStatus({ message: 'Processing your booking...', type: '' });

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          message: 'Booking successful! We look forward to servicing your vehicle.',
          type: 'success'
        });
        setFormData({
          vehicleNumber: '',
          serviceDate: '',
          timeSlot: '',
          mealOption: 'none',
          mealItems: []
        });
      } else {
        setFormStatus({
          message: data.error || 'Failed to create booking. Please try again.',
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
    <div className="booking-container">
        
      <motion.div
        className="booking-banner "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="banner-content">
          <h1>Book Your Vehicle Service</h1>
          <p>Schedule a service appointment for your vehicle with ease</p>
          
        </div>
      </motion.div>


      <motion.div className="booking-section" initial="hidden" animate="visible" variants={containerVariants}>
        <motion.div className="booking-left" variants={itemVariants}>
          <h2>Service Booking Form</h2>
          <p className="booking-intro">
            Complete the form below to schedule your vehicle service. We'll confirm your appointment shortly.
          </p>

          {formStatus.message && (
            <div className={`form-status ${formStatus.type}`}>
              {formStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-row">
              <div className="form-column">
                <label htmlFor="vehicleNumber">
                  Vehicle Number <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="vehicleNumber"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  placeholder="Enter your vehicle number"
                  className={errors.vehicleNumber ? 'error-input' : ''}
                />
                {errors.vehicleNumber && <span className="error-message">{errors.vehicleNumber}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-column">
                <label htmlFor="serviceDate">
                  Service Date <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="serviceDate"
                  name="serviceDate"
                  value={formData.serviceDate}
                  onChange={handleChange}
                  min={getTomorrowDate()}
                  className={errors.serviceDate ? 'error-input' : ''}
                />
                {errors.serviceDate && <span className="error-message">{errors.serviceDate}</span>}
              </div>

              <div className="form-column">
                <label htmlFor="timeSlot">
                  Preferred Time <span className="required">*</span>
                </label>
                <select
                  id="timeSlot"
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  className={errors.timeSlot ? 'error-input' : ''}
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map((slot, index) => (
                    <option key={index} value={slot}>{slot}</option>
                  ))}
                </select>
                {errors.timeSlot && <span className="error-message">{errors.timeSlot}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-column">
                <label htmlFor="mealOption">Meal Option</label>
                <select
                  id="mealOption"
                  name="mealOption"
                  value={formData.mealOption}
                  onChange={handleChange}
                >
                  <option value="none">No meal required</option>
                  <option value="basic">Basic meal</option>
                  <option value="premium">Premium meal</option>
                  <option value="custom">Custom meal selection</option>
                </select>
              </div>
            </div>

            {formData.mealOption !== 'none' && (
              <div className="meal-section">
                <h3>Meal Selection</h3>
                
                <div className="meal-items-container">
                  {formData.mealItems.length > 0 ? (
                    <div className="meal-items-list">
                      {formData.mealItems.map((item, index) => (
                        <div key={index} className="meal-item">
                          <span>{item.itemName} x {item.quantity}</span>
                          <button 
                            type="button" 
                            className="remove-item-btn"
                            onClick={() => removeMealItem(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-items-message">No meal items added yet</p>
                  )}
                  {errors.mealItems && <span className="error-message">{errors.mealItems}</span>}
                </div>

                <div className="add-meal-item">
                  <div className="form-row">
                    <div className="form-column">
                      <input
                        type="text"
                        name="itemName"
                        value={tempMealItem.itemName}
                        onChange={handleMealItemChange}
                        placeholder="Item name"
                        className={errors.mealItemName ? 'error-input' : ''}
                      />
                      {errors.mealItemName && <span className="error-message">{errors.mealItemName}</span>}
                    </div>
                    <div className="form-column quantity-column">
                      <input
                        type="number"
                        name="quantity"
                        value={tempMealItem.quantity}
                        onChange={handleMealItemChange}
                        min="1"
                        max="10"
                      />
                    </div>
                    <button 
                      type="button" 
                      className="add-item-btn"
                      onClick={addMealItem}
                    >
                      Add Item
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className={isSubmitting ? 'submitting' : ''}>
              {isSubmitting ? 'Processing...' : 'Book Service'}
            </button>
          </form>
        </motion.div>

        <div className="booking-right">
          <motion.div
            className="booking-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h3>Service Center Information</h3>
            <p>Our expert technicians are ready to provide the best care for your vehicle.</p>

            <div className="box-sec">
              <span role="img" aria-label="Location">📍</span>
              <p>Visit our state-of-the-art service center.</p>
              <div className="w-box">
                <h5>123 Service Road, Automotive District</h5>
              </div>
            </div>

            <div className="box-sec">
              <span role="img" aria-label="Phone">📞</span>
              <p>Questions about your booking? Call our service desk.</p>
              <div className="w-box">
                <h5>+44 987 654 321</h5>
              </div>
            </div>

            <div className="box-sec">
              <span role="img" aria-label="Hours">🕒</span>
              <p>Our working hours:</p>
              <div className="w-box">
                <h5>Monday - Friday: 8:00 AM - 6:00 PM</h5>
                <h5>Saturday: 9:00 AM - 5:00 PM</h5>
                <h5>Sunday: Closed</h5>
              </div>
            </div>

            <div className="box-sec">
              <span role="img" aria-label="Services">🔧</span>
              <p>Services we offer:</p>
              <div className="w-box">
                <h5>• Regular Maintenance</h5>
                <h5>• Oil Change</h5>
                <h5>• Brake Service</h5>
                <h5>• Engine Diagnostics</h5>
                <h5>• Wheel Alignment</h5>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Booking;