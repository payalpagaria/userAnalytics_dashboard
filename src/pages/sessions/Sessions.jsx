
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSessions } from "../../features/sessions/sessionsSlice";
import SessionTable from "../../components/SessionTable";

export default function Sessions() {
  const dispatch = useDispatch();
  const sessions = useSelector((s) => s.sessions.list);

  useEffect(() => {
    dispatch(getSessions());
  }, [dispatch]);

  return (
    <div className="Dashboard">
      <h2>Sessions</h2>
      <SessionTable sessions={sessions} />
    </div>
  );
}