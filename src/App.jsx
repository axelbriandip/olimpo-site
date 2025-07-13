import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import NoticesPage from "./pages/NoticesPage";
import SquadsPage from "./pages/SquadsPage";
import AboutUsPage from "./pages/AboutUsPage";
import MatchesPage from "./pages/MatchesPage";
import './styles/index.css'

function App() {
  return (
    <Router>
      <div className="layout">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/notices" element={<NoticesPage />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/squads" element={<SquadsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App