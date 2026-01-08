import axios from "axios";

export const fetchSessionEvents = async (sessionId) => {
  const res = await axios.get(`/api/events/sessions/${sessionId}`);
  return res.data;
};
