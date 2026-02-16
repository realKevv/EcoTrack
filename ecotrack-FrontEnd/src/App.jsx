import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Conoscici from './pages/Conoscici';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/conoscici" element={<Conoscici />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App;