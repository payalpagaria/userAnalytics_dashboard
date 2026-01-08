import axios from "axios";

export const fetchHeatmap = async (pageUrl) => {
  const res = await axios.get(`/api/events/clicks/heatmap?pageUrl=${pageUrl}`);
  return res.data;
};
