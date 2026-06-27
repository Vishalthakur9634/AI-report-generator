import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import TemplateManager from './pages/TemplateManager';
import CreateReport from './pages/CreateReport';

// Layout for all users (open access)
const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        } />
        
        <Route path="/templates" element={
          <MainLayout>
            <TemplateManager />
          </MainLayout>
        } />
        
        <Route path="/create-report" element={
          <MainLayout>
            <CreateReport />
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
