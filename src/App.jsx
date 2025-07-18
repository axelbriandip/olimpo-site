// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.css';
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
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './pages/AdminDashboard';
// NUEVA IMPORTACIÓN
import AdminPlayersPage from './pages/AdminPlayersPage'; // <--- Importa la nueva página

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="layout">
        <Navbar />
        <main>
          <Routes>
            {/* publics */}
            <Route path="/" element={<HomePage />} />
            <Route path="/notices" element={<NoticesPage />} />
            <Route path="/notices/:id" element={<NewsDetailPage />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/squads" element={<SquadsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />

            {/* Ruta para el Login del Panel de Administración */}
            <Route path="/login" element={<LoginPage />} />

            {/* RUTAS PROTEGIDAS DEL PANEL DE ADMINISTRACIÓN */}
            {/* La ruta /admin es para el dashboard principal */}
            <Route path="/admin" element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            } />

            {/* Nueva ruta protegida para la gestión de jugadores */}
            <Route path="/admin/players" element={
              <PrivateRoute>
                <AdminPlayersPage /> {/* <--- NUEVA RUTA PROTEGIDA */}
              </PrivateRoute>
            } />

            {/* page not found */}
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;