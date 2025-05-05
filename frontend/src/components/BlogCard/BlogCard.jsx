import React from 'react';
import styles from './blogcard.module.css';
import { Link } from 'react-router-dom';

const BlogCard = ({ id, image, date, category, author, comments, title, slug }) => {
    const { day = '', month = '' } = date;
    return (
      <Link to={`/blog/${id}/${slug}`} className={styles.blog_card_link}>
        <div className={styles.blog_card}>
          <div className={styles.blog_card_img}>
            <img src={image} alt={title} />
            <div className={styles.blog_date}>
              <span className={styles.day}>{day}</span>
              <span className={styles.month}>{month}</span>
            </div>
          </div>

          <div className={styles.blog_card_content}>
            <div className={styles.blog_meta}>
              <div className={styles.tag}>
                <span className={`material-symbols-outlined ${styles.customIconStyle}`}>sell</span>
                <span>{category}</span>
              </div>
              <div className={styles.author}>
                <span className={`material-symbols-outlined ${styles.customIconStyle}`}>person</span>
                <span>By {author}</span>
              </div>
              <div className={styles.cmt}>
                <span className={`material-symbols-outlined ${styles.customIconStyle}`}>chat_bubble</span>
                <span>{comments} Comments</span>
              </div>
            </div>

            <div className={styles.blog_title}>{title}</div>

            <span className={styles.read_more}>
              Read More
              <span className={`material-symbols-outlined ${styles.customIconStyle} ${styles.arrow}`}>arrow_right_alt</span>
            </span>
          </div>
        </div>
      </Link>
    );
};

export default BlogCard;
