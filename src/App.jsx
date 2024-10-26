import './App.css';
import "./styles/main.scss";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import Homepage from './pages/Homepage';
import WorkDetail from './pages/WorkDetail';
export const Context = React.createContext();

function App() {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <BrowserRouter>
    <ScrollToTop />
    <Context.Provider value={[menuActive, setMenuActive]}>
      <a href="#skip-to-content" className="screen-reader-text">Skip To Content</a>
      <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/:work" element={<WorkDetail />} />
        </Routes>  
    </Context.Provider>
    </BrowserRouter>
  ) 

}

export default App;
