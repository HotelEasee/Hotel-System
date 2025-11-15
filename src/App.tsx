// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

import { store } from './store/'
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import HotelsPage from './pages/HotelsPage';
import HotelDetailsPage from './pages/HotelDetailsPage';
import BookingPage from './pages/BookingPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import FavoritesPage from './pages/FavoritesPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';
import PaymentMethodPage from './pages/PaymentMethodPage';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import GuestList from './pages/Admin/GuestList';
import RoomList from './pages/Admin/RoomList';
import EmployeeList from './pages/Admin/EmployeeList';
import Settings from './pages/Admin/Settings';
import Profile from './pages/Admin/Profile';
import Help from './pages/Admin/help';

const stripePromise = loadStripe('sk_test_51SO4cKPSjLvEVB5rUkKzkbCkzhP5Zm2FGpgHr4buynluXJiXdeAvXa3HePClfTPR23FPGd17sd6srLSgWxh8dIKh00DgzVvrxA');


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <Elements stripe={stripePromise}>
      <HelmetProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Router>
              <div className="App">
                <Routes>
                  {/* Client Side Routes */}
                  <Route path="/" element={<Layout />}>
                    <Route index element={<LandingPage />} />
                    <Route path="hotels" element={<HotelsPage />} />
                    <Route path="hotels/:hotelId" element={<HotelDetailsPage />} />
                    <Route path="booking/:hotelId" element={<BookingPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="favorites" element={<FavoritesPage />} />
                    <Route path='payment/:hotelId' element={<PaymentMethodPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>

                  {/* Admin side Routes */}
                  <Route path="/" element={<AdminLayout />}>
                     <Route path='admin/*' element={<AdminDashboard/>}/>
                     <Route path='guests' element={<GuestList/>} />
                     <Route path='rooms' element={<RoomList/>} />
                     <Route path='employees' element={<EmployeeList/>} />
                     <Route path='settings' element={<Settings/>} />
                     <Route path='profile' element={<Profile/>} />
                     <Route path='help' element={<Help/>} />
                  </Route>

                </Routes>
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                  }}
                />
              </div>
            </Router>
          </QueryClientProvider>
        </Provider>
      </HelmetProvider>
    </Elements>
  );
}

export default App;

