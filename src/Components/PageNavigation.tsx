import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';

const pages = [
  { path: '', name: 'Properties' },
  { path: '/display', name: 'Display' },
  // Add more pages as needed
];

function Navigation() {
  const location = useLocation();
  const currentPageIndex = pages.findIndex(page => page.path === location.pathname);

  const previousPage = pages[currentPageIndex - 1];
  const nextPage = pages[currentPageIndex + 1];

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem',
      borderTop: '1px solid grey'
    }}>
      {previousPage ? (
        <Link to={previousPage.path}>
          <span>&lt; {previousPage.name}</span>
        </Link>
      ) : (
        <span />
      )}

      {nextPage ? (
        <Link to={nextPage.path}>
          <span>{nextPage.name} &gt;</span>
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}


export default function PageNavigation() {
  return (
    <>
      <Routes>
        <Route path="/properties" />
        <Route path="/display" />
        {/* Add more routes as needed */}
      </Routes>

      {/* Navigation Links */}
      <Navigation />

    </> 
  );
}
