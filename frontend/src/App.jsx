import { Routes, Route } from 'react-router-dom'//levy thêm chữ dom
import 'remixicon/fonts/remixicon.css'
import HomePage from './pages/HomePage/HomePage'
import ListProduct from './pages/ListProduct'

function App() {
  return (
    // <Routes>
    //   {/* <Route index element={<HomePage />}></Route> */}
    //   <Route index element={<ListProduct />}></Route>
    // </Routes>
    <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="/vegetable" element={<ListProduct/>} />
        <Route path="/blog" element={<div>Welcome to the Blog Page</div>} />
        <Route path="/contact" element={<div>Contact Us Here</div>} />
        <Route path="/about" element={<div>Contact Us Here</div>} />
        <Route path="/faqs" element={<div>Contact Us Here</div>} />
        <Route path="/shoppingcart" element={<div>Contact Us Here</div>} />
    </Routes>
  )
}

export default App

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost/BTL-VegetableShop/backend/api.php')
//       .then(response => {
//         setMessage(response.data.message);
//       })
//       .catch(error => {
//         console.error('Error fetching from PHP:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>React + PHP + Axios + Ngrok</h1>
//       <p>Message from backend: {message}</p>
//     </div>
//   );
// }

// export default App;

