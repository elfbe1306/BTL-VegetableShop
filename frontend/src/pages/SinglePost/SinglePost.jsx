import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../api';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/BlogSidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import Comment from '../../components/Comment/Comment'
import '../SinglePost/singlepost.css';


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
        <div className="single_post_page">
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
        <div className="single_post_page">
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
        <div className="single_post_page">
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

      <div className="single_post_page">
        <div className="post">
            {post.cover_file && (
            <div className="post_featured">
                <img
                src={`${uploadsBase}/${post.cover_file}`}
                alt={post.title}
                className="post_featured_img"
                />
            </div>
            )}
            <div className="blog_meta">
                <div className="tag">
                    <span className="material-symbols-outlined">sell</span>
                    <span>Food</span>
                </div>
                <div className="author">
                    <span className="material-symbols-outlined">person</span>
                    <span>By {post.author_name}</span>
                </div>
                <div className="cmt">
                    <span className="material-symbols-outlined">chat_bubble</span>
                    <span>65 Comments</span>
                </div>          
            
            </div>

            <div className="post_title">{post.title}</div>

            <div className="post_meta_row">
                <div className="post_author">
                    <img
                    src={post.author_avatar || '/images/default-avatar.jpg'}
                    alt={post.author_name}
                    className="post_author_avatar"
                    />
                    <div className="post_author_text">
                    <span className="post_author_name">{post.author_name}</span>
                    <span className="post_author_meta">
                        {formattedDate} • {readTime} min read
                    </span>
                    </div>
                </div>
            </div>

            <div className="post_content" dangerouslySetInnerHTML={{ __html: post.content }}/>

            <Comment/>
          
        </div>
                <Sidebar />
      </div>

      <Footer />
    </>
  );
}
