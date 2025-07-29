import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'motion/react';

import { Home, Cart, Checkout, Success, Error } from './pages';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation/success" element={<Success />} />
            <Route path="/confirmation/error" element={<Error />} />
          </Routes>
        </AnimatePresence>
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#4ade80',
                color: '#fff',
              },
            },
            error: {
              style: {
                background: '#ef4444',
                color: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;