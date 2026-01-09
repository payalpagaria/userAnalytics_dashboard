import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Sessions from "./pages/sessions/Sessions.jsx";
import SessionDetail from "./pages/SessionDetails/SessionDetail.jsx";
import Heatmap from "./pages/Heatmap/Heatmap.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter basename="/">
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/sessions/:id" element={<SessionDetail />} />
            <Route path="/heatmap" element={<Heatmap />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
