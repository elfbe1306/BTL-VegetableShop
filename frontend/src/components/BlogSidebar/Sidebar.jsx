import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import apiService from '../../api';
import "../BlogSidebar/sidebar.css";




const categories = [
  { name: 'Fresh Fruit', count: 134 },
  { name: 'Vegetables', count: 150 },
  { name: 'Cooking', count: 54 },
  { name: 'Snacks', count: 47 },
  { name: 'Beverages', count: 43 },
  { name: 'Beauty & Health', count: 38 },
  { name: 'Bread & Bakery', count: 15 },
];


const Sidebar = () => {
  const [activeTag, setActiveTag] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [tags, setTags] = useState([]);
  const uploadsBase = apiService.api.defaults.baseURL.replace('api.php', 'uploads');

  useEffect(() => {
    apiService
      .fetchPostList(1, 3)
      .then((data) => setRecentPosts(data))
      .catch((err) => console.error("Failed to load recent posts", err));

    apiService
      .fetchTags()
      .then((data) => setTags(data))
      .catch((err) => console.error("Failed to load tags", err));
  }, []);

  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    navigate(`/blog?query=${encodeURIComponent(searchInput.trim())}`);
  };

  return (
    <div className="sidebar">
      <form className="blog_search_bar" onSubmit={handleSearch}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          className="search_input"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </form>
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
              onClick={() => {
                setActiveTag(tag);
                navigate(`/blog?query=${encodeURIComponent(tag)}`);
              }}
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
              <Link to={`/blog/${post.id}`} className="recent_link">
                <img src={`${uploadsBase}/${post.cover_file}`} alt={post.title} className="recent_img" />
                <div className="recent_text">
                  <p className="recent_title">{post.title}</p>
                  <div className="recent_date">
                      <span className="material-symbols-outlined">calendar_today</span>
                      <span>{new Date(post.created_at).toLocaleDateString("en-US", {month: "short", day: "2-digit", year: "numeric"})}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
