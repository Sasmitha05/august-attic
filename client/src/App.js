import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Songs from './pages/Songs';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Shopping from './pages/Shopping';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

const Layout = ({ children }) => {
  const location = useLocation(); // Now inside a valid Router context

  // List of paths where Navbar and Footer should not appear
  const hideNavbarFooter = ["/login", "/signup"];

  return (
    <>
      {!hideNavbarFooter.includes(location.pathname) && <Navbar />}
      {children}
      {!hideNavbarFooter.includes(location.pathname) && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/songs/:era" element={<Songs />} />

            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </Layout>
    </Router>
  );
}

export default App;
