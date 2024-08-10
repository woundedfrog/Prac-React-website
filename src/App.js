import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './components/pages/Products';
import Ytplaylist from './components/pages/Playlist';
import {MouseEvent} from 'react';import {
  useState,
  useEffect
} from "react";

function App() {

  const [showButton,setShowButton] = useState(false);
  const handleScrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      window.scrollY > 300 ? setShowButton(true) : setShowButton(false);

    };
    window.addEventListener('scroll', handleScrollButtonVisibility);
    return () => {
      window.removeEventListener('scroll', handleScrollButtonVisibility);
    };
  }, []);


    return ( <
        >
        <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={ <Home />}/>
          <Route path='/products' element={<Products/>} />
          <Route path='/playlist' element={<Ytplaylist/>} />
        </Routes>
      </Router> 
      {showButton && (
      <div className={'scrollToTop'}>
        <button
        id='to_top'
        role="button" 
        onClick={handleScrollToTop }>To Top
        </button>
        </div>
    )}
        </>
    );
}

export default App;