import React from "react";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="app-container">
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/spell-grammar" 
              className={`nav-link ${location.pathname === '/spell-grammar' ? 'active' : ''}`}
            >
              Spell & Grammar
            </Link>
          </li>
          <li>
            <Link 
              to="/translation" 
              className={`nav-link ${location.pathname === '/translation' ? 'active' : ''}`}
            >
              Translation
            </Link>
          </li>
        </ul>
      </nav>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
