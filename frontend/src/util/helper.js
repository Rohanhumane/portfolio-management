export const calculateDrawdown = (data) => {
  let peak = data.length > 0 ? data[0].nav : 0;
  return data.map(({ date, nav }) => {
    if (nav > peak) peak = nav;
    const drawdown = ((nav - peak) / peak) * 100;
    return { date, nav, drawdown };
  });
};

export const calculateMonthlyReturns = (data) => {
  const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  const returnsByYear = {};
  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1];
    const curr = sorted[i];
    const prevMonth = new Date(prev.date).getMonth();
    const currMonth = new Date(curr.date).getMonth();
    const prevYear = new Date(prev.date).getFullYear();
    const currYear = new Date(curr.date).getFullYear();
    if (currMonth !== prevMonth || currYear !== prevYear) {
      const returnPct = ((curr.nav - prev.nav) / prev.nav) * 100;
      if (!returnsByYear[currYear]) returnsByYear[currYear] = {};
      const monthName = new Date(curr.date).toLocaleString("default", {
        month: "short",
      });
      returnsByYear[currYear][monthName] = returnPct.toFixed(2);
    }
  }
  return returnsByYear;
};

export const CustomTooltipNav = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const date = new Date(label).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    const nav = payload.find((p) => p.dataKey === "nav")?.value;

    return (
      <div className="tooltip">
        <p className="navDate">
          <span>{date}</span>
        </p>
        <span className="nav">Nav:</span>{" "}
        {nav !== undefined
          ? nav.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : ""}
      </div>
    );
  }
  return null;
};

export const CustomTooltipDrawdown = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const date = new Date(label).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    const drawdown = payload.find((p) => p.dataKey === "drawdown")?.value;
    return (
      <div className="tooltip2">
        <p className="navDate">
          <span>{date}</span>
        </p>
        <span className="drawdown">Drawdown:</span>{" "}
        {drawdown !== undefined ? drawdown.toFixed(2) + "%" : ""}
      </div>
    );
  }
  return null;
};
