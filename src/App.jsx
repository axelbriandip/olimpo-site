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
import AdminPlayersPage from './pages/AdminPlayersPage';
import AdminNewsPage from './pages/AdminNewsPage';
import AdminMatchesPage from './pages/AdminMatchesPage';
import AdminHistoryPage from './pages/AdminHistoryPage';
import AdminHomePage from './pages/AdminHomePage';

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
            <Route path="/admin" element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            } />

            {/* Ruta protegida para la gestión de la página de inicio */}
            <Route path="/admin/home" element={
              <PrivateRoute>
                <AdminHomePage />
              </PrivateRoute>
            } />

            {/* Ruta protegida para la gestión de jugadores */}
            <Route path="/admin/players" element={
              <PrivateRoute>
                <AdminPlayersPage />
              </PrivateRoute>
            } />

            {/* Ruta protegida para la gestión de NOTICIAS */}
            <Route path="/admin/news-manager" element={
              <PrivateRoute>
                <AdminNewsPage />
              </PrivateRoute>
            } />

            {/* NUEVA RUTA PROTEGIDA para la gestión de PARTIDOS */}
            <Route path="/admin/matches" element={
              <PrivateRoute>
                <AdminMatchesPage />
              </PrivateRoute>
            } />

            {/* NUEVA RUTA PROTEGIDA para la gestión de HISTORIA */}
            <Route path="/admin/history" element={
              <PrivateRoute>
                <AdminHistoryPage />
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
