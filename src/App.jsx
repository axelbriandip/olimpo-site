import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './styles/index.css'

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/notices" element={<h1>Noticias</h1>} />
          <Route path="/squads" element={<h1>Equipos</h1>} />
          <Route path="/about-us" element={<h1>Sobre nosotros</h1>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App