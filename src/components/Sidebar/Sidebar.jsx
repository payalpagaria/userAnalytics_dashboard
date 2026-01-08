import { Link } from "react-router-dom";

export default function Sidebar() {
  return (<>
   <nav className="Sidebar">
     
    
       <aside className="sidebar">
        <nav className="nav">
          <button className="nav-btn active">
            <span className="nav-icon">📈</span>
            <Link to="/">Dashboard</Link>
          </button>
          <button className="nav-btn" onClick={() => navigate('/sessions')}>
            <span className="nav-icon">📋</span>
                 <Link to="/sessions">Sessions</Link>

          </button>
          <button className="nav-btn">
            <span className="nav-icon">🗺️</span>
           <Link to="/heatmap">Heatmap</Link>
          </button>
          
        </nav>
      </aside>
    </nav>
  </>
   
  );
}
