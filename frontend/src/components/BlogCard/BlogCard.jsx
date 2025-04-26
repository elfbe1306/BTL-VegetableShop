import React from 'react';
import './BlogCard.css';
import { Link } from 'react-router-dom';

const BlogCard = ({ id, image, date, category, author, comments, title, link }) => {
    const { day = '', month = '' } = date;
    return (
      <Link to={`/blog/${id}`} className="blog_card_link">
        <div className="blog_card">
              <div className="blog_card_img">
                <img src={image} alt={title} />
                <div className="blog_date">
                  <span className="day">{date.day}</span>
                  <span className="month">{date.month}</span>
                </div>
              </div>

              <div className="blog_card_content">
                <div className="blog_meta">
                    <div className="tag">
                        <span className="material-symbols-outlined">sell</span>
                        <span>{category}</span>
                    </div>
                    <div className="author">
                        <span className="material-symbols-outlined">person</span>
                        <span>By {author}</span>
                    </div>
                    <div className="cmt">
                        <span className="material-symbols-outlined">chat_bubble</span>
                        <span>{comments} Comments</span>
                    </div>          
              
                </div>

                <div className="blog_title">{title}</div>

                <span className="read_more">
                  Read More 
                  <span className="material-symbols-outlined arrow">arrow_right_alt</span>
                </span>

              </div>
            </div>
      </Link>
    
  );
};

export default BlogCard;
