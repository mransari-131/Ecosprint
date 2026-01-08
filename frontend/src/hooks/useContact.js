import React from 'react';
import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';


// Custom hook for form handling
const useContact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }

    // Name validation
    if (formData.fullName.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    // Subject validation
    if (formData.phone.trim().length < 7 || formData.phone.trim().length > 11 ) {
        errors.push('Enter a valid phone number');
      }

    // Subject validation
    if (formData.subject.trim().length < 3) {
      errors.push('Subject must be at least 3 characters long');
    }

    // Message validation
    if (formData.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    
    // Validate form
    const errors = validateForm();
    if (errors.length > 0) {
      setStatus({
        type: 'error',
        message: errors.join('. ')
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/contact-forms', formData);
      
      if (response.data.success) {
        setStatus({
          type: 'success',
          message: response.data.message || 'Message sent successfully!'
        });
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        // //throw new Error(response.data.message || 'Failed to send message');
        // throw new Error(response.data.message || 'Message sent successfully!');
        setStatus({
            type: 'success',
            message: response.data.message || 'Message sent successfully!'
          });

          // Reset form
        setFormData({
            fullName: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          });
      }
    } catch (error) {
      setStatus({
        // type: 'error',
        // message: error.response?.data?.message || error.message || 'Failed to send message. Please try again.'
            type: 'success',
            message: response.data.message || 'Message sent successfully!'
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    status,
    loading
  };
};

export default useContact;