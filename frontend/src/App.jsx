import { Routes, Route } from 'react-router-dom'//levy thêm chữ dom
import 'remixicon/fonts/remixicon.css'
import HomePage from './pages/HomePage/HomePage'
import ListProduct from './pages/ListProduct/ListProduct'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Checkout from './pages/Checkout/Checkout'

function App() {
  return (
    <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="/vegetable" element={<ListProduct/>} />
        <Route path="/vegetable/:productName" element={<ProductDetail/>} />
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/blog" element={<div>Welcome to the Blog Page</div>} />
        <Route path="/contact" element={<div>Contact Us Here</div>} />
        <Route path="/about" element={<div>Contact Us Here</div>} />
        <Route path="/faqs" element={<div>Contact Us Here</div>} />
        <Route path="/shoppingcart" element={<div>Contact Us Here</div>} />
    </Routes>
  )
}

export default App