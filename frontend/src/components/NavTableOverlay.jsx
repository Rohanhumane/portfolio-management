import { useEffect } from "react";
import "./NavTableOverlay.css";

const NavTableOverlay = ({
  visible,
  onClose,
  data,
  years,
  navYear,
  setNavYear,
  navMonth,
  setNavMonth,
  monthlyReturns,
}) => {
  
  useEffect(() => {
    if (visible) {
      document.body.classList.add("nav-overlay-open");
    } else {
      document.body.classList.remove("nav-overlay-open");
    }
    return () => {
      document.body.classList.remove("nav-overlay-open");
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        <div className="overlay-header">
          <h3>NAV Values Table</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="nav-table-filters">
          <label>
            Year:
            <select
              value={navYear}
              onChange={(e) => {
                setNavYear(e.target.value);
                setNavMonth("");
              }}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
          <label>
            Month:
            <select
              value={navMonth}
              onChange={(e) => setNavMonth(e.target.value)}
            >
              <option value="">All</option>
              {navYear &&
                Object.keys(monthlyReturns[navYear] || {}).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div className="nav-table-scroll">
          <table className="all-nav-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>NAV</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((d) => {
                  const dateObj = new Date(d.date);
                  const year = dateObj.getFullYear().toString();
                  const month = dateObj.toLocaleString("default", {
                    month: "short",
                  });
                  return (
                    year === navYear && (navMonth === "" || month === navMonth)
                  );
                })
                .map((d, idx) => (
                  <tr key={idx}>
                    <td>
                      {new Date(d.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </td>
                    <td>{d.nav.toFixed(4)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NavTableOverlay;
