import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../api';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/BlogSidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
// import '../SinglePost/singlepost.css';
import CommentSection from '../../components/Comment/Comment';
import styles from "./singlepost.module.css";


export default function SinglePost() {
  const { postId } = useParams();

  const [post, setPost]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    apiService
      .fetchPostById(postId)
      .then(data => setPost(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.single_post_page}>
          <p>Loading…</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className={styles.single_post_page}>
          <p>Error: {error}</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <div className={styles.single_post_page}>
          <p>Post not found.</p>
        </div>
        <Footer />
      </>
    );
  }

  const bodyText = post.content ?? '';
  const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  
  const uploadsBase = apiService.api.defaults.baseURL.replace('api.php', 'uploads');
  const formattedDate = new Date(post.created_at)
    .toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });


  return (
    <>
      <Header />

      <div className={styles.single_post_page}>
        <button className={styles.filter_toggle_btn} onClick={toggleSidebar}>
          Filters
        </button>
        <div className={styles.post}>
            {post.cover_file && (
            <div className={styles.post_featured}>
                <img
                src={`${uploadsBase}/${post.cover_file}`}
                alt={post.title}
                className={styles.post_featured_img}
                />
            </div>
            )}
            <div className={styles.blog_meta}>
                <div className={styles.tag}>
                    <span className="material-symbols-outlined">sell</span>
                    <span>Food</span>
                </div>
                <div className={styles.author}>
                    <span className="material-symbols-outlined">person</span>
                    <span>By {post.author_name}</span>
                </div>
                <div className={styles.cmt}>
                    <span className="material-symbols-outlined">chat_bubble</span>
                    <span>65 Comments</span>
                </div>          
            
            </div>

            <div className={styles.post_title}>{post.title}</div>

            <div className={styles.post_meta_row}>
                <div className={styles.post_author}>
                    <img
                    src={post.author_avatar || '/images/default-avatar.jpg'}
                    alt={post.author_name}
                    className={styles.post_author_avatar}
                    />
                    <div className={styles.post_author_text}>
                    <span className={styles.post_author_name}>{post.author_name}</span>
                    <span className={styles.post_author_meta}>
                        {formattedDate} • {readTime} min read
                    </span>
                    </div>
                </div>
            </div>

            <div className={styles.post_content} dangerouslySetInnerHTML={{ __html: post.content }}/>

            <Comment/>
          
        </div>
        <div className={styles.sidebar_drawer}>
            <div
              className={`${styles.sidebar_backdrop} ${isSidebarOpen ? styles.show : ''}`}
              onClick={() => setSidebarOpen(false)}
            ></div>
            <div className={`${styles.sidebar_slide} ${isSidebarOpen ? styles.open : ''}`}>
            <Sidebar />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
