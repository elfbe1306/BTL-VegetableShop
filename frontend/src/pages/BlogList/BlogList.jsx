import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Pagination from '../../components/Pagination/Pagination'
import "../BlogList/bloglist.css";
import BlogCard from '../../components/BlogCard/BlogCard'
import Sidebar from '../../components/BlogSidebar/Sidebar'
import apiService from '../../api';


function BlogList() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [posts, setPosts]     = useState([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [page, setPage]       = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState("");
    const uploadsBase = apiService.api.defaults.baseURL.replace('api.php', 'uploads');
  
    useEffect(() => {
        setLoading(true);
        const fetch = query
          ? apiService.searchPosts(query)
          : apiService.fetchPostList(page, 8);
      
        fetch
          .then((data) => {
            if (query) {
              setPosts(data);        
              setTotalPosts(data.length);
            } else {
              setPosts(data.posts);  
              setTotalPosts(data.totalPosts); 
            }
            setError("");
          })
          .catch(err => {
            console.error(err);
            setError("Could not load posts.");
          })
          .finally(() => setLoading(false));
    }, [page, query]);

    const postsPerPage = 8;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    
    return(
        <div>
            <Header/>
            <div className="container">
                <div className="blog_layout">
                    <Sidebar/>
                    <main className="blog_content">
                        <div className="blog_post">
                            {!loading && !error && posts.length === 0 && (
                            <p>No posts found for "{query}"</p>
                            )}
                            {posts.map(p => (
                                <BlogCard
                                    key={p.id}
                                    id={p.id}
                                    image={`${uploadsBase}/${p.cover_file}`}
                                    date={p.date}
                                    category={p.tag}               
                                    author={p.author_name}
                                    comments={p.comments || 0}     
                                    title={p.title}
                            />
                            ))}
                        </div>
                        {!query && (
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages || 1}          
                            onPageChange={(newPage) => setPage(newPage)}
                        />
                        )}
                    </main>
                </div>

            </div>
            <Footer/>
        </div>
    )
}
export default BlogList