import styles from "./comment.module.css"
import React, { useEffect, useState } from "react";
import apiService from "../../api";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [message, setMessage]   = useState("");
  const [error, setError]       = useState("");
  const token = localStorage.getItem("userID");
  const loadComments = async () => {
    try {
      const data = await apiService.fetchComments(postId);
      setComments(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError("Comment cannot be empty.");
      return;
    }
    try {
      await apiService.postComment(postId, token, message.trim());
      setMessage("");
      loadComments();
    } catch (e) {
      setError(e.response?.data?.error || e.message);
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

      <h5>Comments</h5>
      <div>
        {comments.length === 0 && (
          <p className="text-muted">No comments yet.</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="border-bottom py-2">
            <strong>{c.user_name}</strong>{" "}
            <small className="text-muted">
              • {new Date(c.created_at).toLocaleDateString()}
            </small>
            <p className="mb-1">{c.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

