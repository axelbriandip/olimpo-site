import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <nav>Navbar</nav>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/notices" element={<h1>Noticias</h1>} />
          <Route path="/squads" element={<h1>Equipos</h1>} />
          <Route path="/about-us" element={<h1>Sobre nosotros</h1>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
        <footer>Footer</footer>
      </Router>
    </>
  )
}

export default App