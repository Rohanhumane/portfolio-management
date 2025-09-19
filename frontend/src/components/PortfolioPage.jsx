import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import "./PortfolioPage.css";
import NavTableOverlay from "./NavTableOverlay";
import {
  calculateDrawdown,
  calculateMonthlyReturns,
  CustomTooltipDrawdown,
  CustomTooltipNav,
} from "../util/helper";

const PortfolioPage = () => {
  const [data, setData] = useState([]);
  const [returnsData, setReturnsData] = useState();
  const [monthlyReturns, setMonthlyReturns] = useState({});
  const [selectedYear, setSelectedYear] = useState("");
  const [showNavTable, setShowNavTable] = useState(false);
  const [navYear, setNavYear] = useState("");
  const [navMonth, setNavMonth] = useState("");

  const years = Object.keys(monthlyReturns).sort((a, b) => b - a);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "/React-Assignment-Historical-NAV-Report.xlsx"
      );
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const worksheet = workbook.Sheets["Mutual Funds India Historical N"];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: ["date", "nav"],
        range: 4,
        defval: null,
      });

      const reversed = [...jsonData].reverse();

      const parsedData = reversed
        .filter((d) => d.date && !isNaN(parseFloat(d.nav)))
        .map((d) => {
          const [day, month, year] = d.date.split("-");
          const isoDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
            2,
            "0"
          )}`;
          return {
            date: isoDate,
            nav: parseFloat(d.nav),
          };
        });

      const dataWithDrawdown = calculateDrawdown(parsedData);
      setData(dataWithDrawdown);

      computeReturns(parsedData);
      setMonthlyReturns(calculateMonthlyReturns(dataWithDrawdown));
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (years.length > 0) {
      if (!selectedYear) setSelectedYear(years[0]);
      if (!navYear) setNavYear(years[0]);
    }
  }, [years, selectedYear, navYear]);

  const computeReturns = (navData) => {
    if (navData.length === 0) return;
    const endDate = new Date(navData[navData.length - 1].date);
    const yearStart = new Date(endDate.getFullYear(), 0, 1);
    const startNav =
      navData.find((d) => new Date(d.date) >= yearStart)?.nav || navData[0].nav;
    const endNav = navData[navData.length - 1].nav;
    const ytdReturn =
      startNav && endNav && startNav !== 0
        ? ((endNav - startNav) / startNav) * 100
        : 0;
    setReturnsData({ name: "YTD", value: ytdReturn.toFixed(2) });
  };

  // Nav Table toggle
  const toggleNavTable = () => setShowNavTable((v) => !v);

  return (
    <div className="portfolio-page">
      <div className="returns-monthly">
        <div className="navBlock">
          <h2>Month-on-Month Trading Returns</h2>
          <div className="button-container">
            <button onClick={toggleNavTable} className="nav-toggle-button">
              {showNavTable ? "Hide NAV Table" : "Show NAV Table"}
            </button>
          </div>
        </div>
        {years.length > 0 && (
          <div>
            <label htmlFor="returns-year" style={{}}>
              Year:
            </label>
            <select
              id="returns-year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map((year) => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        )}
        {selectedYear && (
          <table className="returns-year-block">
            <thead>
              <tr>
                <th key={"month"}>Month</th>
                {Object.keys(monthlyReturns[selectedYear]).map((month) => (
                  <th key={month}>{month}</th>
                ))}
                <th key={returnsData?.name}>{returnsData?.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td key={"returns"}>Returns</td>
                {Object.values(monthlyReturns[selectedYear]).map((ret, idx) => (
                  <td
                    key={idx}
                    style={{
                      color: ret >= 0 ? "#2e7d32" : "#c62828",
                    }}
                  >
                    {ret}
                  </td>
                ))}
                <td
                  key={returnsData?.value}
                  style={{
                    color: "#08a40fff",
                  }}
                >
                  {returnsData?.value}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <NavTableOverlay
        visible={showNavTable}
        onClose={() => setShowNavTable(false)}
        data={data}
        years={Object.keys(monthlyReturns)}
        navYear={navYear}
        setNavYear={setNavYear}
        navMonth={navMonth}
        setNavMonth={setNavMonth}
        monthlyReturns={monthlyReturns}
      />

      <h1>Portfolio Statistics</h1>
      <div className="charts-container" style={{ width: 1000 }}>
        <AreaChart //NAV AreaChart
          width={1000}
          height={320}
          data={data}
          syncId="syncPortfolioCharts"
          margin={{ top: 10, right: 60, left: 30, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(str) => {
              const date = new Date(str);
              return isNaN(date)
                ? ""
                : date.toLocaleDateString("en-IN", {
                    year: "numeric",
                  });
            }}
            tick={({ x, y }) => <text x={x} y={y}></text>}
            minTickGap={55}
          />
          <YAxis domain={["auto", "auto"]} width={60} />
          <Tooltip content={<CustomTooltipNav />} />
          <Legend
            verticalAlign="top"
            wrapperStyle={{ left: 0, top: 500, fontSize: 20 }}
            iconType={"rect"}
            formatter={() => (
              <span style={{ fontWeight: "bold" }}>{"Nav"}</span>
            )}
          />
          <Area
            type="monotone"
            dataKey="nav"
            stroke="darkgreen"
            fill="rgba(0, 168, 125, 0.3)"
          />
        </AreaChart>

        <AreaChart //Drawdown AreaChart
          width={1000}
          height={200}
          data={data}
          syncId="syncPortfolioCharts"
          margin={{ top: 0, right: 60, left: 30, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(str) => {
              const date = new Date(str);
              return isNaN(date)
                ? ""
                : date.toLocaleDateString("en-IN", {
                    year: "numeric",
                  });
            }}
            minTickGap={55}
          />
          <YAxis
            domain={[-100, 0]}
            width={60}
            orientation="left"
            tickFormatter={(tick) => `${tick.toFixed(0)}%`}
          />
          <Tooltip content={<CustomTooltipDrawdown />} />
          <Legend
            verticalAlign="top"
            wrapperStyle={{ left: 100, top: 180, fontSize: 20 }}
            iconType={"rect"}
            formatter={() => (
              <span style={{ fontWeight: "bold" }}>{"Drawdown"}</span>
            )}
          />
          <Area
            type="monotone"
            dataKey="drawdown"
            stroke="darkred"
            fill="rgba(229, 115, 115, 0.6)"
          />
        </AreaChart>
      </div>
    </div>
  );
};

export default PortfolioPage;
