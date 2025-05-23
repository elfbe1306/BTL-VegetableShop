import { Routes, Route } from 'react-router-dom'//levy thêm chữ dom
import 'remixicon/fonts/remixicon.css'
import HomePage from './pages/HomePage/HomePage'
import ListProduct from './pages/ListProduct/ListProduct'
import BlogList from './pages/BlogList/BlogList'
import SinglePost from './pages/SinglePost/SinglePost'
import Login from './pages/LoginSignup/Login'
import SignUp from './pages/LoginSignup/Signup'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Cart from './pages/Cart/Cart'
import ContactPage from './pages/ContactPage/ContactPage'
import InfoPage from './pages/InfoPage/InfoPage'
import Question from './pages/Question/Question'

function App() {
  return (
    <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/vegetable" element={<ListProduct/>} />
        <Route path="/blog" element={<BlogList/>} />
        <Route path="/blog/:postId" element={<SinglePost />} />
        <Route path="/contact" element={<div>Contact Us Here</div>} />
        <Route path="/about" element={<div>Contact Us Here</div>} />
        <Route path="/faqs" element={<div>Contact Us Here</div>} />
        <Route path="/vegetable/:productName" element={<ProductDetail/>} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/blog" element={<div>Welcome to the Blog Page</div>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/about" element={<InfoPage/>} />
        <Route path="/faqs" element={<Question/>} />
        <Route path="/shoppingcart" element={<div>Contact Us Here</div>} />
    </Routes>
  )
}

export default App