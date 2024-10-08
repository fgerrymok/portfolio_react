import './App.css';
import "./styles/main.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Homepage from './pages/Homepage';
import WorkDetail from './pages/WorkDetail';

function App() {

  return (
    <BrowserRouter>
    <ScrollToTop />
    <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:work" element={<WorkDetail />} />
      </Routes>
    <Footer />
    </BrowserRouter>
  ) 

}

export default App;
