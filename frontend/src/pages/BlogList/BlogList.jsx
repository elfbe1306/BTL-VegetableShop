import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Filter from '../../components/Filter'
import Pagination from '../../components/Pagination'
import "../BlogList/bloglist.css";
import BlogCard from '../../components/BlogCard/BlogCard'
import cover from '../../assets/images/blogImg/cover.png';


function BlogList(){
    return(
        <div>
            <Header/>
            <div className="container">
                <Filter/>
                <div className="blog_layout">
                    <aside className="blog_filter">
                        
                    </aside>

                    <main className="blog_content">
                    <BlogCard
                        image={cover}
                        date={{ day: '18', month: 'Nov' }}
                        category="Food"
                        author="Admin"
                        comments={65}
                        title="Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum."
                        link="#"
                    />
                    <BlogCard
                        image={cover}
                        date={{ day: '18', month: 'Nov' }}
                        category="Food"
                        author="Admin"
                        comments={65}
                        title="Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum."
                        link="#"
                    />
                    <BlogCard
                        image={cover}
                        date={{ day: '18', month: 'Nov' }}
                        category="Food"
                        author="Admin"
                        comments={65}
                        title="Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum."
                        link="#"
                    />
                    <BlogCard
                        image={cover}
                        date={{ day: '18', month: 'Nov' }}
                        category="Food"
                        author="Admin"
                        comments={65}
                        title="Curabitur porttitor orci eget neque accumsan venenatis. Nunc fermentum."
                        link="#"
                    />
                    </main>
                </div>

            </div>
            <Footer/>
        </div>
    )
}
export default BlogList