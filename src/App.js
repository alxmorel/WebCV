import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Profile from './components/Profile/Profile';
import Modal from './components/Modal/Modal';

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
      {(cookieModalShow) &&
        <Modal
          show={cookieModalShow}
          setModalShow={setcookieModalShow}
          confirmAction={handleCookieAccept}
          leaveAction={handleCookieRefuse}
          description={"Alexandre Morel cv uses cookies to deliver and enhance the quality of its services and to analyze traffic. If you agree, cookies are also used to serve advertising and to personalize the content and advertisements that you see. Learn more."}
          accept={"AGREE"}
          refused={"NO THANKS"}
          cookieModal={true}
        />
      }
    </div>
  );
}

export default App;
