import styles from "./comment.module.css"
import React, { useEffect, useState } from "react";
import apiService from "../../api";

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
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="form-control"
          placeholder="Write your comment here…"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {error && <div className="text-danger small">{error}</div>}
        <button className={styles.post_button}>Post Comment</button>
      </form>
    </div>
    
  );
};

export default CommentForm;