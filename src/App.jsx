// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import NoticesPage from "./pages/NoticesPage";
import SquadsPage from "./pages/SquadsPage";
import AboutUsPage from "./pages/AboutUsPage";
import MatchesPage from "./pages/MatchesPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import ScrollToTop from "./components/ScrollToTop";
import LoginPage from './pages/LoginPage';
import './styles/index.css';

// Futuro: Componente para las rutas protegidas (lo crearemos después)
// import PrivateRoute from './components/PrivateRoute'; 
// import AdminDashboard from './pages/AdminDashboard'; // Futura página del panel

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* Se monta una vez y escucha los cambios de ruta */}
      <div className="layout">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/notices" element={<NoticesPage />} />
            <Route path="/notices/:id" element={<NewsDetailPage />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/squads" element={<SquadsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* Futuras Rutas Protegidas del Panel de Administración */}
            {/* <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} /> */}
            {/* <Route path="/admin/news" element={<PrivateRoute><AdminNewsManager /></PrivateRoute>} /> */}
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
