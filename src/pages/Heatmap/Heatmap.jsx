import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHeatmapPages, getHeatmapPoints, setSelectedPage } from "../../features/heatmap/heatmapSlice";
import "./Heatmap.css";

// Helper to get page display name
const getPageName = (url) => {
  if (url === "/") return "Homepage";
  return url.replace(/^\//, "").replace(/\//g, " / ");
};

// Generate mock heatmap points for visualization
const generateMockPoints = (clickCount, seed = 0) => {
  const points = [];
  const clusters = Math.min(Math.ceil(clickCount / 3), 8);
  
  for (let c = 0; c < clusters; c++) {
    const centerX = 100 + ((c * 137 + seed) % 600);
    const centerY = 80 + ((c * 89 + seed) % 350);
    const pointsInCluster = Math.ceil(clickCount / clusters);
    
    for (let i = 0; i < pointsInCluster && points.length < clickCount; i++) {
      const angle = (i / pointsInCluster) * Math.PI * 2;
      const radius = 20 + (i % 3) * 15;
      points.push({
        x: centerX + Math.cos(angle) * radius + (Math.sin(i * 7) * 10),
        y: centerY + Math.sin(angle) * radius + (Math.cos(i * 11) * 10),
        intensity: 0.3 + Math.random() * 0.7,
      });
    }
  }
  return points;
};

export default function Heatmap() {
  const dispatch = useDispatch();
  const { pages, selectedPage, loading } = useSelector((s) => s.heatmap);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    dispatch(getHeatmapPages());
  }, [dispatch]);

  useEffect(() => {
    if (selectedPage) {
      dispatch(getHeatmapPoints(selectedPage.page_url));
    }
  }, [selectedPage, dispatch]);

  const handlePageSelect = (page) => {
    dispatch(setSelectedPage(page));
    setDropdownOpen(false);
  };

  const handleRefresh = () => {
    dispatch(getHeatmapPages());
    if (selectedPage) {
      dispatch(getHeatmapPoints(selectedPage.page_url));
    }
  };

  // Generate visualization points based on click count
  const visualPoints = useMemo(() => {
    if (!selectedPage) return [];
    return generateMockPoints(selectedPage.click_count * 8, selectedPage.page_url.length);
  }, [selectedPage]);

  // Calculate top click areas (mock data based on total clicks)
  const topClickAreas = useMemo(() => {
    if (!selectedPage) return [];
    const areas = [];
    const count = Math.min(5, Math.ceil(selectedPage.click_count / 3));
    for (let i = 0; i < count; i++) {
      areas.push({
        rank: i + 1,
        x: 100 + ((i * 137) % 500),
        y: 100 + ((i * 89) % 400),
        clicks: Math.ceil(selectedPage.click_count / (i + 1)),
      });
    }
    return areas;
  }, [selectedPage]);

  const totalClicks = selectedPage?.click_count || 0;
  const clickPoints = topClickAreas.length;
  const avgPerPoint = clickPoints > 0 ? Math.round(totalClicks / clickPoints) : 0;

  // Date range for display
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const formatDate = (d) => d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

  return (
    <div className="heatmap-page">
      {/* Header */}
      <header className="heatmap-header">
        <div className="header-left">
          <h1 className="page-title">Click Heatmap</h1>
          <p className="page-subtitle">Visualize user click patterns across your pages</p>
        </div>
        <div className="header-actions">
          <button className="date-picker-btn">
            <span className="date-icon">📅</span>
            <span>{formatDate(weekAgo)} - {formatDate(today)}</span>
            <span className="chevron">▾</span>
          </button>
          <button className="icon-btn" onClick={handleRefresh} title="Refresh">
            🔄
          </button>
          <button className="export-btn">
            <span>⬇</span> Export
          </button>
        </div>
      </header>

      <div className="heatmap-content">
        {/* Left Panel */}
        <div className="heatmap-sidebar">
          {/* Page Selector */}
          <div className="card">
            <h3 className="card-title">Select Page</h3>
            <div className="page-selector">
              <button 
                className="selector-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="page-name">{selectedPage ? getPageName(selectedPage.page_url) : "Select a page"}</span>
                {selectedPage && (
                  <span className="click-badge">{selectedPage.click_count} clicks</span>
                )}
                <span className="chevron">▾</span>
              </button>
              
              {dropdownOpen && (
                <div className="dropdown-menu">
                  {pages.map((page) => (
                    <button
                      key={page.page_url}
                      className={`dropdown-item ${selectedPage?.page_url === page.page_url ? 'active' : ''}`}
                      onClick={() => handlePageSelect(page)}
                    >
                      <span className="page-name">{getPageName(page.page_url)}</span>
                      <span className="click-count">{page.click_count} clicks</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {selectedPage && (
              <div className="url-display">
                <span className="url-text">{selectedPage.page_url}</span>
                <a href={selectedPage.page_url} target="_blank" rel="noopener noreferrer" className="external-link">
                  ↗
                </a>
              </div>
            )}
          </div>

          {/* Page Statistics */}
          <div className="card">
            <h3 className="card-title">Page Statistics</h3>
            <div className="stats-list">
              <div className="stat-row">
                <span className="stat-label">Total Clicks</span>
                <span className="stat-value">{totalClicks}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Click Points</span>
                <span className="stat-value">{clickPoints}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Avg per Point</span>
                <span className="stat-value">{avgPerPoint}</span>
              </div>
            </div>
          </div>

          {/* Top Click Areas */}
          <div className="card">
            <h3 className="card-title">
              <span className="sparkle">✨</span> Top Click Areas
            </h3>
            <div className="click-areas-list">
              {topClickAreas.map((area) => (
                <div key={area.rank} className="click-area-row">
                  <span className="area-rank">{area.rank}</span>
                  <span className="area-coords">({area.x}, {area.y})</span>
                  <span className="area-clicks">{area.clicks} clicks</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Heatmap Visualization */}
        <div className="heatmap-visualization">
          <div className="viz-header">
            <h3 className="viz-title">
              {selectedPage ? `${getPageName(selectedPage.page_url)} Heatmap` : "Heatmap"}
            </h3>
            <span className="viz-dimensions">1200 × 800</span>
          </div>
          
          <div className="browser-frame">
            <div className="browser-toolbar">
              <div className="browser-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="browser-address">
                {selectedPage ? selectedPage.page_url : ""}
              </div>
            </div>
            
            <div className="heatmap-canvas">
              {loading ? (
                <div className="loading-state">Loading heatmap data...</div>
              ) : visualPoints.length === 0 ? (
                <div className="empty-state">Select a page to view heatmap</div>
              ) : (
                visualPoints.map((point, i) => (
                  <div
                    key={i}
                    className="heat-point"
                    style={{
                      left: point.x,
                      top: point.y,
                      opacity: point.intensity,
                      backgroundColor: point.intensity > 0.7 ? '#ef4444' : point.intensity > 0.4 ? '#f97316' : '#3b82f6',
                      transform: `scale(${0.8 + point.intensity * 0.6})`,
                    }}
                  />
                ))
              )}
              
              {/* Legend */}
              <div className="heatmap-legend">
                <span className="legend-title">Click Density</span>
                <div className="legend-items">
                  <span className="legend-item">
                    <span className="legend-dot low"></span> Low
                  </span>
                  <span className="legend-item">
                    <span className="legend-dot medium"></span> Medium
                  </span>
                  <span className="legend-item">
                    <span className="legend-dot high"></span> High
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
