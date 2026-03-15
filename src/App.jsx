import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import TemplateManager from './pages/TemplateManager';
import CreateReport from './pages/CreateReport';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/templates" element={<TemplateManager />} />
            <Route path="/create-report" element={<CreateReport />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
