import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import { WalletProvider } from './context/WalletContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import NewProject from './pages/admin/NewProject';

export default function App() {
  return (
    <WalletProvider>
      <ProjectProvider>
        <Router>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="new-project" element={<NewProject />} />
            </Route>

            {/* Public Routes */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <main>
                    <Routes>
                      <Route index element={<HomePage />} />
                      <Route path="projects" element={<ProjectsPage />} />
                      <Route path="project/:id" element={<ProjectDetailPage />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </Router>
      </ProjectProvider>
    </WalletProvider>
  );
}