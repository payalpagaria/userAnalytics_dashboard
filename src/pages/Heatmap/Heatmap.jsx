import { useDispatch, useSelector } from "react-redux";
import { getHeatmap } from "../../features/heatmap/heatmapSlice";
export default function Heatmap() {
  const dispatch = useDispatch();
  const points = useSelector((s) => s.heatmap.points);

  return (
    <div className="Dashboard">
      <button onClick={() => dispatch(getHeatmap("/"))}>
        Load Heatmap
      </button>

      <div style={{ position: "relative", height: 400 }}>
        {points.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "red",
              opacity: 0.6
            }}
          />
        ))}
      </div>
    </div>
  );
}
