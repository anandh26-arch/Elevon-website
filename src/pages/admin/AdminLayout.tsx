import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderPlus, Settings } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();
  
  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/new-project', icon: FolderPlus, label: 'New Project' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 min-h-screen glass-nav border-r border-white/10 fixed">
        <div className="p-6">
          <Link to="/" className="text-xl font-bold text-gradient">
            Elevon Admin
          </Link>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-6 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors ${
                location.pathname === item.path ? 'text-white bg-white/10' : ''
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        <Outlet />
      </div>
    </div>
  );
}