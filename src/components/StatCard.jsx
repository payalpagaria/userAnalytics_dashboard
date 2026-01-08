// src/components/StatCard.jsx
export default function StatCard({ title, value }) {
  return (
    <div className="StatCard">
      <p className="StatTitle">{title}</p>
      <h3 className="StatValue">{value}</h3>
    </div>
  );
}
