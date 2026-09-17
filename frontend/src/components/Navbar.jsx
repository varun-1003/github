import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <NavLink to="/" className="brand" end>
          <span className="brand-mark">MI</span>
          <span>Mini Issue Tracker</span>
        </NavLink>
        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/issues">Issues</NavLink>
          <NavLink to="/issues/new">Add Issue</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
