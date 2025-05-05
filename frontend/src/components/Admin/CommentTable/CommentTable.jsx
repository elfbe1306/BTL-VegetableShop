import React, { useEffect, useState } from 'react';
import apiService from '../../../api';
import './commenttable.css';

function CommentsTable() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const loadComments = () => {
    apiService.fetchAllComments()
      .then(data => setComments(data))
      .catch(err => {
        console.error(err);
        setError('Failed to load comments');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadComments();
  }, []);

  const confirmDelete = async () => {
    try {
      await apiService.deleteComment(selectedId);
      setSelectedId(null);
      setShowModal(false);
      loadComments();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  const filteredComments = comments.filter((cmt) =>
    `${cmt.user_name} ${cmt.post_title} ${cmt.message}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) return <p>Loading comments…</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="card">
        <div className="card-body">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by user, post, or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="table-responsive">
            <table className="table table-striped table-hover table-borderless text-black">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Post</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {filteredComments.map((cmt) => (
                  <tr key={cmt.id}>
                    <td>{cmt.id}</td>
                    <td>{cmt.user_name} (#{cmt.user_id})</td>
                    <td>{cmt.post_title} (#{cmt.post_id})</td>
                    <td>{cmt.message}</td>
                    <td>{new Date(cmt.created_at).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => {
                          setSelectedId(cmt.id);
                          setShowModal(true);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredComments.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">No comments found.</td>
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
              Are you sure you want to delete this comment?
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

      <div className={`toast-container position-fixed bottom-0 end-0 p-3`} style={{ zIndex: 1055 }}>
        <div
          className={`toast align-items-center text-bg-success border-0 ${showToast ? "show" : ""}`}
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body">Comment deleted successfully.</div>
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

export default CommentsTable;
