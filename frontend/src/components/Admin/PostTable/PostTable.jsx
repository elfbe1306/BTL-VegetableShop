import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiService from "../../../api";
import "./posttable.css"; 

export default function AdminPostTable() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    apiService
      .fetchPostList(1, 100)
      .then((data) => setPosts(data.posts))
      .catch((err) => console.error("Failed to load posts", err));
  };

  const confirmDelete = async () => {
    try {
      await apiService.deletePost(selectedPostId);
      setSelectedPostId(null);
      setShowModal(false);
      loadPosts();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <Link to="/admin/posts/create" className="btn btn-success">
            + Add New Post
          </Link>
        </div>

        <div className="card-body">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control mb-4"
          />

          <div className="table-responsive">
            <table className="table table-striped table-hover table-borderless">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Author</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {filteredPosts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.slug}</td>
                    <td>{post.author_name}</td>
                    <td>{new Date(post.created_at).toLocaleDateString()}</td>
                    <td>
                      <Link
                        to={`/admin/posts/edit/${post.id}`}
                        className="btn btn-sm btn-outline-success me-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => {
                          setSelectedPostId(post.id);
                          setShowModal(true);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredPosts.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No posts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="custom-modal-backdrop">
          <div className="custom-modal">
            <div className="custom-modal-header">
              <h5>Confirm Delete</h5>
              <button className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="custom-modal-body">
              Are you sure you want to delete this post?
            </div>
            <div className="custom-modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={`toast-container position-fixed bottom-0 end-0 p-3`}
        style={{ zIndex: 1055 }}
      >
        <div
          className={`toast align-items-center text-bg-success border-0 ${showToast ? "show" : ""}`}
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body">Post deleted successfully.</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
        </div>
      </div>
    </>
  );
}
