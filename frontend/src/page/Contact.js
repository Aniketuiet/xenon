// Contact.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/send-message', formData);
      console.log(response.data);

      // Show success toast
      toast.success('Message sent successfully!');

      // Clear the form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error.message);
      // Handle the error, show an error message to the user, etc.
      toast.error('Error sending message. Please try again.');
    }
  };

  return (
    <div className='contact-container'>
      <h1 className='contact-heading'>Contact Us</h1>
      <form className='contact-form' onSubmit={handleSubmit}>
        <div className='contact-item'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='contact-item'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='contact-item'>
          <label htmlFor='message'>Message:</label>
          <textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            rows='4'
            required
          ></textarea>
        </div>
        <button type='submit' className='contact-button'>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
