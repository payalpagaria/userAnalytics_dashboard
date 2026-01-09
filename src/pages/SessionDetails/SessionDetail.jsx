import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionEvents } from '../../features/events/eventsSlice';
import "./SessionDetail.css";

export default function SessionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const events = useSelector((s) => s.events.list);
  const sessionInfo = useSelector((s) => s.events.sessionDetails);
  const loading = useSelector((s) => s.events.loading);

  useEffect(() => {
    dispatch(getSessionEvents(id));
  }, [id, dispatch]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleRefresh = () => {
    dispatch(getSessionEvents(id));
  };

  if (loading || !sessionInfo) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="session-detail-container">
      <div>
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span 
            onClick={() => navigate('/sessions')}
            className="breadcrumb-item">
            Sessions
          </span>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{id}</span>
        </div>

        {/* Header */}
        <div className="session-header">
          <div className="header-row">
            <div className="header-left">
              <button 
                onClick={() => navigate('/sessions')}
                className="back-btn">
                ←
              </button>
              <h1 className="page-title">Session Details</h1>
            </div>
            <button 
              onClick={handleRefresh}
              className="refresh-btn">
              <span>🔄</span>
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="session-content">
          {/* Session Info Card */}
          <div className="session-info-card">
            <div className="card-header">
              <h2>Session Info</h2>
              <span className="status-badge">
                {sessionInfo.status}
              </span>
            </div>

            <div className="info-section">
              <div className="info-label">Session ID</div>
              <div className="info-value session-id">{sessionInfo.session_id}</div>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">⏱️</div>
                <div>
                  <div className="info-label">Duration</div>
                  <div className="info-value">{formatDuration(sessionInfo.duration)}</div>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">👁️</div>
                <div>
                  <div className="info-label">Page Views</div>
                  <div className="info-value">{sessionInfo.page_views}</div>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">🖱️</div>
                <div>
                  <div className="info-label">Clicks</div>
                  <div className="info-value">{sessionInfo.clicks}</div>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">💻</div>
                <div>
                  <div className="info-label">Device</div>
                  <div className="info-value">Desktop</div>
                </div>
              </div>
            </div>

            <div className="info-section">
              <span className="info-icon">📅</span>
              <div>
                <div className="info-label">Started</div>
                <div className="info-value">{formatDate(sessionInfo.start_time)}</div>
              </div>
            </div>

            <div className="info-section">
              <span className="info-icon">⏰</span>
              <div>
                <div className="info-label">Last Activity</div>
                <div className="info-value">{formatDate(sessionInfo.end_time)}</div>
              </div>
            </div>

        
          </div>

          {/* Event Timeline Card */}
          <div className="event-timeline-card">
            <div className="card-header">
              <h2>Event Timeline</h2>
              <span className="event-count">{sessionInfo.total_events} events</span>
            </div>

            <div className="timeline">
              {events.map((event, index) => (
                <div key={event._id} className="timeline-item">
                  <div className="timeline-icon-wrapper">
                    <div className={`timeline-icon ${event.event_type}`}>
                      {event.event_type === 'click' ? '🖱️' : '👁️'}
                    </div>
                    {index < events.length - 1 && <div className="timeline-line"></div>}
                  </div>

                  <div className="timeline-content">
                    <div className="timeline-header">
                      <span className={`event-type-badge ${event.event_type}`}>
                        {event.event_type === 'click' ? 'Click' : 'Page View'}
                      </span>
                      <span className="event-time">{formatTime(event.timestamp)}</span>
                    </div>

                    <div className="event-url">{event.page_url}</div>

                    {event.event_type === 'click' && event.click_coordinates && (
                      <div className="event-details">
                        <span>Coordinates: ({event.click_coordinates.x}, {event.click_coordinates.y})</span>
                        <span className="detail-separator">•</span>
                        <span>Element: button.cta</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}