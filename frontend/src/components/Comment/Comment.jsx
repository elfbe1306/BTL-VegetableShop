import React, { useState } from 'react';
import '../Comment/comment.css'

const CommentForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
    saveInfo: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName) tempErrors.fullName = 'Full Name is required';
    if (!formData.email) tempErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is invalid';
    if (!formData.message) tempErrors.message = 'Message is required';
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('server.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (result.success) {
          alert('Comment posted successfully');
        } else {
          alert('Error posting comment');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="comment_section">
      <div className="section_title">Comments</div>
      <form onSubmit={handleSubmit}>
        <div className='comment_box'>
          <textarea
            name="message"
            placeholder='Write your comment'
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && <p>{errors.message}</p>}
        </div>
        <button className="subscribe_button" type='submit'>Post Comments</button>
      </form>
    </div>
    
  );
};

export default CommentForm;