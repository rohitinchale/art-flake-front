import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import 'bootstrap/dist/css/bootstrap.min.css';
import ManageVisitors from './components/ManageVisitors';
import ManageArtists from './components/ManageArtists';
import ManageArtworks from './components/ManageArtworks';

const AdminPage = () => {
  const [currentSection, setCurrentSection] = useState(''); // Default to empty string for welcome message

  const userJson = localStorage.getItem("user");
  const user = JSON.parse(userJson);


  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark position-fixed"
        style={{ width: "280px", height: "100vh" }}
      >
        <Link to="/admin" className="text-center mb-3">
          <img
            src="https://via.placeholder.com/150" // Replace with actual image URL if needed
            alt="Admin"
            width="80"
            height="80"
            className="rounded-circle"
          />
        </Link>
        <hr />
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link" href="#manageVisitors" onClick={() => setCurrentSection('visitors')}>Manage Visitors</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#manageArtists" onClick={() => setCurrentSection('artists')}>Manage Artists</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#manageArtworks" onClick={() => setCurrentSection('artworks')}>Manage Artworks</a>
          </li>
        </ul>
        <div className="mt-auto">
          <hr />
          <h4 className="text-center">{user.username}</h4> {/* Replace with dynamic admin name if needed */}
          <h6 className="text-center">{user.email}</h6>
        </div>
      </div>

      {/* Main Content */}
      <div className="col" style={{ marginLeft: "280px" }}>
        <div className="container mt-5">
          {currentSection === '' && <h1 className="text-center">Welcome to admin functionalities</h1>}
          {currentSection === 'visitors' && <ManageVisitors />}
          {currentSection === 'artists' && <ManageArtists />}
          {currentSection === 'artworks' && <ManageArtworks />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
