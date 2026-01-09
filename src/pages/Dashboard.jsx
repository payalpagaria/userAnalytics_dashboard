import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSessions } from '../features/sessions/sessionsSlice';
import SessionTable from '../components/SessionTable';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessions = useSelector((s) => s.sessions.list);

  useEffect(() => {
    dispatch(getSessions());
  }, [dispatch]);

  const totalSessions = sessions.length;
  const totalEvents = sessions.reduce((sum, s) => sum + s.eventCount, 0);
  const avgEvents = totalSessions > 0 ? Math.round(totalEvents / totalSessions) : 0;
  const activeSessions = sessions.filter(s => s.status === 'Active').length;

  const handleViewAll = () => {
    navigate('/sessions');
  };

  return (
    <div className="dashboard-content">
      {/* Header */}
      <header className="header">
        <h1 className="title">Dashboard</h1>
        <p className="subtitle">Welcome back! Here's an overview of your analytics.</p>
      </header>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div>
              <p className="stat-label">Total Sessions</p>
              <p className="stat-value">{totalSessions}</p>
            </div>
            <div className="stat-icon blue">👥</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div>
              <p className="stat-label">Total Events</p>
              <p className="stat-value">{totalEvents}</p>
            </div>
            <div className="stat-icon purple">📊</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div>
              <p className="stat-label">Active Sessions</p>
              <p className="stat-value">{activeSessions}</p>
            </div>
            <div className="stat-icon green">⚡</div>
          </div>
          <p className="stat-change neutral">Currently active</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div>
              <p className="stat-label">Avg Events/Session</p>
              <p className="stat-value">{avgEvents}</p>
            </div>
            <div className="stat-icon orange">📈</div>
          </div>
        </div>
      </div>

      {/* Recent Sessions Table */}
      <div className="table-container">
        <div className="table-header">
          <h2 className="table-title">Recent Sessions</h2>
          <button className="view-all-btn" onClick={handleViewAll}>View all →</button>
        </div>
        
        <SessionTable sessions={sessions.slice(0, 5)} showHeader={false} />
      </div>
    </div>
  );
};

export default Dashboard;
