import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SessionTable.css';

export default function SessionTable({ sessions, showHeader = true }) {
  const navigate = useNavigate();

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

  return (
    <div className="session-table-container">
      {showHeader && (
        <div className="session-table-header">
          <h2>All Sessions</h2>
        </div>
      )}

      <table className="session-full-table">
        <thead>
          <tr>
            <th>Session ID</th>
            <th>Start Time</th>
            <th>Duration</th>
            <th>Total Events</th>
            <th>Last Activity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => {
            return (
              <tr
                key={session.session_id}
                onClick={() => navigate(`/sessions/${session.session_id}`)}
              >
                <td>
                  <span className="session-id">{session.session_id}</span>
                </td>
                <td>{formatDateTime(session.start_time)}</td>
                <td> {formatDuration(session.duration)}</td>
                <td>
                  <div className="event-info">
                    <span className="event-count">{session.eventCount}</span>
                 
                  </div>
                </td>
                <td>{formatDateTime(session.end_time)}</td>
                <td>
                  <span className={`status-badge ${session.status.toLowerCase()}`}>
                    {session.status}
                  </span>
                </td>
                <td>
                  <button
                    className="view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/sessions/${session.session_id}`);
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}