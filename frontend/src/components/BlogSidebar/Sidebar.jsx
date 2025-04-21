import React, { useState } from 'react';
import "../BlogSidebar/sidebar.css";
import mango from '../../assets/images/blogImg/mango.png';



const categories = [
  { name: 'Fresh Fruit', count: 134 },
  { name: 'Vegetables', count: 150 },
  { name: 'Cooking', count: 54 },
  { name: 'Snacks', count: 47 },
  { name: 'Beverages', count: 43 },
  { name: 'Beauty & Health', count: 38 },
  { name: 'Bread & Bakery', count: 15 },
];

const tags = [
  'Healthy', 'Low fat', 'Bread', 'Vegetarian', 'Kid foods',
  'Vitamins', 'Snacks', 'Tiffin', 'Meat', 'Launch', 'Dinner'
];

const recentPosts = [
    {
      id: 1,
      img: mango,
      title: 'Curabitur porttitor orci eget nequ accumsan.',
      date: 'Apr 25, 2021',
    },
    {
      id: 2,
      img: mango,
      title: 'Donec mattis arcu faucibus suscipit viverra.',
      date: 'Apr 25, 2021',
    },
    {
      id: 3,
      img: mango,
      title: 'Quisque posuere tempus rutrum. Integer velit ex.',
      date: 'Apr 25, 2021',
    },
];
const Sidebar = () => {
  const [activeTag, setActiveTag] = useState(null);

  return (
    <div className="sidebar">
      <div className="category_section">
        <h3 className="section_title">Top Categories</h3>
        <ul className="category_list">
          {categories.map((cat, idx) => (
            <li key={idx}>
              <span>{cat.name}</span>
              <span className="category_count">({cat.count})</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="tag_section">
        <h3 className="section_title">Popular Tag</h3>
        <div className="tag_list">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className={`tag_item ${activeTag === tag ? 'active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="recently_added">
        <h3 className="section_title">Recently Added</h3>
        <ul className="recent_list">
          {recentPosts.map((post) => (
            <li className="recent_item" key={post.id}>
              <img src={post.img} alt={post.title} className="recent_img" />
              <div className="recent_text">
                <p className="recent_title">{post.title}</p>
                <div className="recent_date">
                    <span className="material-symbols-outlined">calendar_today</span>
                    <span>{post.date}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
