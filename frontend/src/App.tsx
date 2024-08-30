import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import 'primereact/resources/themes/soho-light/theme.css';
// primereact/resources/themes/md-dark-indigo/theme.css
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './index.css';
import MenuBar from './components/MenuBar';
import Categorias from './components/Categorias';
import Productos from './components/Productos';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <MenuBar />
        <div className="content" style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} /> {/* Redirige raíz a /home */}
            <Route path="/home" element={<Home />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/productos" element={<Productos />} />
            {/* Agrega más rutas aquí si tienes otros componentes */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
