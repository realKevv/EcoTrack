import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* TODO: Add Calculator Route */}
            {/* <Route path="/calculator" element={<Calculator />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App;