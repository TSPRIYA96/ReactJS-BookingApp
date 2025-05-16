import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AuthForm from './components/AuthForm';
import Booking from './components/Booking';
import SeatSelection from './components/SeatSelection';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import Contact from './components/Contact';
import MyBooking from './components/MyBooking';
import PaymentPage from './components/PaymentPage';
function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthForm isLogin={true} />} />
            <Route path="/signup" element={<AuthForm isLogin={false} />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/seats" element={<SeatSelection />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/my-bookings" element={<MyBooking />} />
            <Route path="/payment" element={<PaymentPage />} />
            </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;