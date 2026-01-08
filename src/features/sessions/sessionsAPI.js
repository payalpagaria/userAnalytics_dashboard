
import axios from "axios";

export const fetchSessions = async () => {
  const res = await axios.get("/api/events/sessions");
 return res.data.data;
  
};
