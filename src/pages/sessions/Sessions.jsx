import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSessions } from "../../features/sessions/sessionsSlice";
import SessionTable from "../../components/SessionTable";
import "./Sessions.css";

export default function Sessions() {
  const dispatch = useDispatch();
  const sessions = useSelector((s) => s.sessions.list);

  useEffect(() => {
    dispatch(getSessions());
  }, [dispatch]);

  return (
    <div className="sessions-page">
      <header className="page-header">
        <h1 className="page-title">Sessions</h1>
        <p className="page-subtitle">View and manage all user sessions.</p>
      </header>
      <SessionTable sessions={sessions} />
    </div>
  );
}
