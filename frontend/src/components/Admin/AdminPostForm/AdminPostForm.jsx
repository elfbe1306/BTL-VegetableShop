import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../../../api';

export default function AdminPostForm({ mode }) {
  const isEdit = mode === 'edit';
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    tag: '',
    author_id: 1 
  });
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      apiService.fetchPostById(id)
        .then(data => setForm(data))
        .catch(() => setError("Could not load post"));
    }
  }, [id, isEdit]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = e => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (coverImage) {
      formData.append('cover_image', coverImage);
    }
    try {
      if (isEdit) {
        await apiService.updatePost(id, formData);
      } else {
        await apiService.createPost(formData);
      }
      navigate('/admin/blog');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="card bg-success m-5 bg-opacity-10">
      <div className="card-header">
        <h4>{isEdit ? 'Edit Post' : 'Create New Post'}</h4>
      </div>
      <div className="card-body">
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Title<span className="text-danger">*</span></label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Slug</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Content<span className="text-danger">*</span></label>
            <textarea
              name="content"
              rows="6"
              value={form.content}
              onChange={handleChange}
              className="form-control"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Tag</label>
            <input
              type="text"
              name="tag"
              value={form.tag}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Cover Image</label>
            <input
              type="file"
              name="cover_image"
              onChange={handleImageChange}
              className="form-control"
              accept="image/*"
            />
          </div>

          <button className="btn btn-success" type="submit">
            {isEdit ? 'Update' : 'Create'} Post
          </button>
        </form>
      </div>
    </div>
  );
}
