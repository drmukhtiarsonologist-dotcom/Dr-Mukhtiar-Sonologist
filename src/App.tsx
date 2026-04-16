import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { BookingProvider } from './context/BookingContext';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import TestDetailPage from './pages/TestDetailPage';
import CartPage from './pages/CartPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<TestDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BookingProvider>
      <SpeedInsights />
    </BrowserRouter>
  );
}

export default App;
