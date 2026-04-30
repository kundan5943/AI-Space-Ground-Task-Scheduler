import { NavLink } from "react-router-dom";
import { FaTasks, FaPlusCircle, FaChartLine, FaBrain, FaBroadcastTower } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar glass-strong">
      <div className="sidebar-top">
        
        <div className="logo">
          <div className="logo-icon">AI</div>
          <div className="logo-text">
            AI TASK<br/>SCHEDULAR
          </div>
        </div>

        <nav className="nav-links">
          <NavLink to="/" end>
            <FaTasks size={18}/> Dashboard
          </NavLink>

          <NavLink to="/submit">
            <FaPlusCircle size={18}/> Submit Task
          </NavLink>

          <NavLink to="/monitor">
            <FaBroadcastTower size={18}/> Live Monitor
          </NavLink>

          <NavLink to="/decisions">
            <FaBrain size={18}/> AI Decisions
          </NavLink>

          <NavLink to="/analytics">
            <FaChartLine size={18}/> Analytics
          </NavLink>
        </nav>

      </div>

      <div className="sidebar-bottom">
        Intelligent Task Orchestration System
      </div>
    </aside>
  );
}