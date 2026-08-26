function Navbar() {
  return (
    <nav className="navbar">

      <div className="nav-container">

        <div className="logo">
          <div className="logo-icon">J</div>

          <div>
            <h2>JobTracker</h2>
            <span>Student Career Dashboard</span>
          </div>
        </div>

        <div className="nav-links">
          <a href="#dashboard">Dashboard</a>
          <a href="#applications">Applications</a>
        </div>

      </div>

    </nav>
  );
}

export default Navbar;