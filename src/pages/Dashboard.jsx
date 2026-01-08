import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSessions } from '../features/sessions/sessionsSlice';
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

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleViewAll = () => {
    navigate('/sessions');
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">📊</div>
          <span className="brand">CausalFunnel</span>
        </div>
        
        <nav className="nav">
          <button className="nav-btn active">
            <span className="nav-icon">📈</span>
            <span>Dashboard</span>
          </button>
          <button className="nav-btn" onClick={() => navigate('/sessions')}>
            <span className="nav-icon">📋</span>
            <span>Sessions</span>
          </button>
          <button className="nav-btn">
            <span className="nav-icon">🗺️</span>
            <span>Heatmap</span>
          </button>
          <button className="nav-btn">
            <span className="nav-icon">📊</span>
            <span>Analytics</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
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
              <p className="stat-change positive">↗ 12.5% vs last week</p>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div>
                  <p className="stat-label">Total Events</p>
                  <p className="stat-value">{totalEvents}</p>
                </div>
                <div className="stat-icon purple">📊</div>
              </div>
              <p className="stat-change positive">↗ 8.2% vs last week</p>
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
              <p className="stat-change positive">↗ 5.8% vs last week</p>
            </div>
          </div>

          {/* Recent Sessions Table */}
          <div className="table-container">
            <div className="table-header">
              <h2 className="table-title">Recent Sessions</h2>
              <button className="view-all-btn" onClick={handleViewAll}>View all →</button>
            </div>
            
            <table className="sessions-table">
              <thead>
                <tr>
                  <th>Session ID</th>
                  <th>Start Time</th>
                  <th>Duration</th>
                  <th>Events</th>
                  <th>Last Activity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sessions.slice(0, 5).map((session) => {
                  return (
                    <tr key={session.session_id}>
                      <td>
                        <span className="session-id">{session.session_id}</span>
                      </td>
                      <td>{formatDateTime(session.start_time)}</td>
                      <td>⏱ {formatDuration(session.duration)}</td>
                      <td>
                        <div className="event-info">
                          <span className="event-count">{session.eventCount}</span>
                          <span className="event-details">
                            ({session.views || 0} views, {session.clicks || 0} clicks)
                          </span>
                        </div>
                      </td>
                      <td>{formatDateTime(session.end_time)}</td>
                      <td>
                        <span className={`status-badge ${session.status.toLowerCase()}`}>
                          {session.status}
                        </span>
                      </td>
                      <td>
                        <div className="actions">
                          <button 
                            className="view-btn"
                            onClick={() => navigate(`/sessions/${session.session_id}`)}
                          >
                            👁️ View
                          </button>
                          <button className="more-btn">⋯</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;