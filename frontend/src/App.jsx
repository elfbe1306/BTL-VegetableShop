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
import Checkout from './pages/Checkout/Checkout'
import ContactPage from './pages/ContactPage/ContactPage'
import InfoPage from './pages/InfoPage/InfoPage'
import Question from './pages/Question/Question'

import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import AdminUsers from './pages/AdminAccount/AdminAccount'
import AdminFAQs from './pages/AdminFAQs/AdminFAQs'
import AdminAbout from './pages/AdminAbout/AdminAbout'

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AdminBlog from './pages/AdminBlog/AdminBlog'
import AdminCreatePost from './pages/AdminBlog/AdminCreatePost'
import AdminEditPost from './pages/AdminBlog/AdminEditPost'

function App() {
  return (
    <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }/>
        <Route path="/admin/account" element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminUsers />
          </ProtectedRoute>
        }/>
        <Route path="/admin/faqs" element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminFAQs />
          </ProtectedRoute>
        }/>
        <Route path="/admin/about" element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminAbout />
          </ProtectedRoute>
        }/>
        <Route path="/admin/blog" element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminBlog />
          </ProtectedRoute>
        }/>
        <Route path="/admin/posts/create" element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminCreatePost />
          </ProtectedRoute>
        }/>

        <Route path="/admin/posts/edit/:id" element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminEditPost />
          </ProtectedRoute>
        }/>
        <Route path="/admin/comment" element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminAbout />
          </ProtectedRoute>
        }/>
        <Route path="/vegetable" element={<ListProduct/>}/>
        <Route path="/blog" element={<BlogList/>} />
        <Route path="/blog/:postId" element={<SinglePost />} />
        <Route path="/vegetable/:productName" element={<ProductDetail/>} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/about" element={<InfoPage/>} />
        <Route path="/faqs" element={<Question/>} />
    </Routes>
  )
}

export default App