import axios from "axios";

// Fetch all pages with their click counts
export const fetchHeatmapPages = async () => {
  const res = await axios.get("/api/events/heatmap/pages");
  return res.data;
};

// Fetch detailed heatmap points for a specific page
export const fetchHeatmapPoints = async (pageUrl) => {
  const res = await axios.get("/api/events/clicks/heatmap", {
    params: { pageUrl }
  });
  return res.data;
};
