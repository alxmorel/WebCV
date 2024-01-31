import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Profile from './components/Profile/Profile';
// import About from './components/About';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {

  const cookieEnabled = localStorage.getItem('cookieEnabled');

  const [cookieModalShow, setcookieModalShow] = useState(!cookieEnabled);

  const handleCookieAccept = () => {
    if (navigator.cookieEnabled) {
      document.cookie = 'cookieEnabled=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
    }
    localStorage.setItem('cookieEnabled', 'true');
    setcookieModalShow(false);
  };

  const handleCookieRefuse = () => {
    localStorage.setItem('cookieEnabled', 'false');
    setcookieModalShow(false);
  };

  return (
    <div className="App">
      <div className='follower'></div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Profile filterType="global" />} />
          <Route path="/:filterType" element={<Profile filterType="services" />} />
          <Route path="/:filterType" element={<Profile filterType="competences" />} />
          <Route path="/:filterType" element={<Profile filterType="portfolio" />} />
          <Route path="/:filterType" element={<Profile filterType="tarifs" />} />
          <Route path="/:filterType" element={<Profile filterType="a-propos" />} />
          <Route path="/:filterType" element={<Profile filterType="contact" />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
    </div>
  );
}

export default App;
