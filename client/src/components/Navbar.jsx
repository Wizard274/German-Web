import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Headphones, PlusCircle } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand-logo">
          <div style={{ background: 'var(--accent-gold-light)', padding: '0.4rem', borderRadius: '10px', display: 'flex' }}>
            <Headphones size={24} color="var(--accent-gold)" />
          </div>
          <span>Lingua<span className="brand-badge">AI</span> <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-gold)', marginLeft: '4px' }}>DE 🇩🇪</span></span>
        </Link>

        <div className="nav-links">
          <Link to="/create" className={`nav-link ${isActive('/create') ? 'active' : ''}`}>
            <PlusCircle size={18} />
            <span>Generate Lesson</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
