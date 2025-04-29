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
import AdminUsers from './pages/AdminUsers/AdminUsers'

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

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
          <Route path="/admin/users" element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminUsers />
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