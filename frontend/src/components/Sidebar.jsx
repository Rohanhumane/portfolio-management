import { NavLink } from "react-router-dom";
import "./SideBar.css";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="logo">
        <img src="/logo.png" alt="InvestIQ Logo" />
        <h2>InvestIQ</h2>
      </div>

      <ul>
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/portfolio">Portfolios</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
