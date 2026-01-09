import axios from "axios";

export const fetchHeatmapPages = async () => {
  const res = await axios.get("/api/events/heatmap/pages");
  return res.data;
};

export const fetchHeatmapPoints = async (page_url) => {
  const res = await axios.get("/api/events/clicks/heatmap", {
    params: { page_url }
  });
  return res.data;
};
