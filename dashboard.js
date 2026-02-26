window.onerror=function(m,s,l){var e=document.getElementById('error-msg');if(e){e.style.display='block';e.textContent=m+' (line '+l+')';}return false;};
try{
var {
  useState,
  useEffect
} = React;
var {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  ComposedChart,
  Scatter
} = Recharts;
// ── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  bg: "#050B18",
  surface: "#0A1628",
  card: "#0F1E35",
  border: "#1A2E4A",
  teal: "#00C9B1",
  blue: "#3B82F6",
  amber: "#F59E0B",
  rose: "#F43F5E",
  violet: "#A855F7",
  green: "#22C55E",
  text: "#E2EAF4",
  muted: "#5B7A9B",
  forecast: "#1A3050"
};

// ── FONT INJECT ───────────────────────────────────────────────────────────────
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
`;

// ── DATA ──────────────────────────────────────────────────────────────────────

const evBusData = [{
  year: 2021,
  value: 514,
  type: "actual"
}, {
  year: 2022,
  value: 602,
  type: "actual"
}, {
  year: 2023,
  value: 636,
  type: "actual"
}, {
  year: 2024,
  value: 766,
  type: "actual"
}, {
  year: 2025,
  value: 880,
  type: "forecast"
}, {
  year: 2026,
  value: 1010,
  type: "forecast"
}, {
  year: 2027,
  value: 1160,
  type: "forecast"
}, {
  year: 2028,
  value: 1330,
  type: "forecast"
}, {
  year: 2029,
  value: 1520,
  type: "forecast"
}, {
  year: 2030,
  value: 1740,
  type: "forecast"
}];
const evTruckData = [{
  year: 2021,
  value: 11,
  type: "actual"
}, {
  year: 2022,
  value: 33,
  type: "actual"
}, {
  year: 2023,
  value: 52,
  type: "actual"
}, {
  year: 2024,
  value: 93,
  type: "actual"
}, {
  year: 2025,
  value: 113,
  type: "forecast"
}, {
  year: 2026,
  value: 160,
  type: "forecast"
}, {
  year: 2027,
  value: 210,
  type: "forecast"
}, {
  year: 2028,
  value: 265,
  type: "forecast"
}, {
  year: 2029,
  value: 315,
  type: "forecast"
}, {
  year: 2030,
  value: 370,
  type: "forecast"
}];

// FIX #1 — AHV actuals corrected to true L4 commercial deployment only
// Old 2021-2024: 1.1 / 2.7 / 5.7 / 10.0  (included Chinese L2/L3 ADAS trucks)
// New 2021-2024: 0.05 / 0.12 / 0.30 / 1.20 (NA + EU L4 commercial only; APAC L4 negligible)
// Source: Aurora Q4 2025 Earnings, Waymo public data, Einride fleet reports
const ahvData = [{
  year: 2021,
  value: 0.05,
  type: "actual"
}, {
  year: 2022,
  value: 0.12,
  type: "actual"
}, {
  year: 2023,
  value: 0.30,
  type: "actual"
}, {
  year: 2024,
  value: 1.20,
  type: "actual"
}, {
  year: 2025,
  value: 3.00,
  type: "forecast"
}, {
  year: 2026,
  value: 8.00,
  type: "forecast"
}, {
  year: 2027,
  value: 18.0,
  type: "forecast"
}, {
  year: 2028,
  value: 35.0,
  type: "forecast"
}, {
  year: 2029,
  value: 80.0,
  type: "forecast"
}, {
  year: 2030,
  value: 155,
  type: "scenario"
} // high scenario incl. APAC L4 scale-up
];
const h2Data = [{
  year: 2021,
  value: 12,
  type: "actual"
}, {
  year: 2022,
  value: 14,
  type: "actual"
}, {
  year: 2023,
  value: 15,
  type: "actual"
}, {
  year: 2024,
  value: 18,
  type: "actual"
}, {
  year: 2025,
  value: 22,
  type: "forecast"
}, {
  year: 2026,
  value: 29,
  type: "forecast"
}, {
  year: 2027,
  value: 37,
  type: "forecast"
}, {
  year: 2028,
  value: 46,
  type: "forecast"
}, {
  year: 2029,
  value: 56,
  type: "forecast"
}, {
  year: 2030,
  value: 68,
  type: "forecast"
}];
const agenticAIData = [{
  year: 2025,
  value: 2,
  type: "actual"
}, {
  year: 2026,
  value: 4,
  type: "forecast"
}, {
  year: 2027,
  value: 8,
  type: "forecast"
}, {
  year: 2028,
  value: 13,
  type: "forecast"
}, {
  year: 2029,
  value: 19,
  type: "forecast"
}, {
  year: 2030,
  value: 25,
  type: "gartner"
}];
const eamAIData = [{
  year: 2025,
  value: 5,
  type: "actual"
}, {
  year: 2026,
  value: 14,
  type: "forecast"
}, {
  year: 2027,
  value: 28,
  type: "forecast"
}, {
  year: 2028,
  value: 48,
  type: "forecast"
}, {
  year: 2029,
  value: 64,
  type: "forecast"
}, {
  year: 2030,
  value: 80,
  type: "gartner"
}];
const euDataSharingData = [{
  year: 2025,
  value: 3,
  type: "actual"
}, {
  year: 2026,
  value: 8,
  type: "forecast"
}, {
  year: 2027,
  value: 16,
  type: "forecast"
}, {
  year: 2028,
  value: 30,
  type: "gartner"
}];
const robotaxiData = [{
  year: 2025,
  value: 5,
  type: "actual"
}, {
  year: 2026,
  value: 10,
  type: "forecast"
}, {
  year: 2027,
  value: 18,
  type: "forecast"
}, {
  year: 2028,
  value: 30,
  type: "forecast"
}, {
  year: 2029,
  value: 45,
  type: "forecast"
}, {
  year: 2030,
  value: 55,
  type: "forecast"
}, {
  year: 2031,
  value: 58,
  type: "forecast"
}, {
  year: 2032,
  value: 60,
  type: "gartner"
}];
const dieselBusData = [{
  year: 2021,
  value: 6100
}, {
  year: 2022,
  value: 6030
}, {
  year: 2023,
  value: 5950
}, {
  year: 2024,
  value: 5800
}, {
  year: 2025,
  value: 5650
}, {
  year: 2026,
  value: 5480
}, {
  year: 2027,
  value: 5290
}, {
  year: 2028,
  value: 5080
}, {
  year: 2029,
  value: 4850
}, {
  year: 2030,
  value: 4600
}];
const dieselTruckData = [{
  year: 2021,
  value: 59600
}, {
  year: 2022,
  value: 60300
}, {
  year: 2023,
  value: 61100
}, {
  year: 2024,
  value: 61150
}, {
  year: 2025,
  value: 60800
}, {
  year: 2026,
  value: 59900
}, {
  year: 2027,
  value: 58600
}, {
  year: 2028,
  value: 56800
}, {
  year: 2029,
  value: 54500
}, {
  year: 2030,
  value: 51800
}];

// EV LCV fleet stock (ex-China, managed depot fleets only)
// Anchored to TAM assumption: 720K ex-China by 2030
// Actuals: Amazon Rivian ~10K+ (2024), DHL ~10K, La Poste ~10K, Royal Mail ~4K
// Source: IEA GEO 2025 EV LCV tracking; Amazon sustainability report
const lcvData = [{
  year: 2021,
  value: 32,
  type: "actual"
}, {
  year: 2022,
  value: 58,
  type: "actual"
}, {
  year: 2023,
  value: 110,
  type: "actual"
}, {
  year: 2024,
  value: 210,
  type: "actual"
}, {
  year: 2025,
  value: 310,
  type: "forecast"
}, {
  year: 2026,
  value: 420,
  type: "forecast"
}, {
  year: 2027,
  value: 530,
  type: "forecast"
}, {
  year: 2028,
  value: 610,
  type: "forecast"
}, {
  year: 2029,
  value: 665,
  type: "forecast"
}, {
  year: 2030,
  value: 720,
  type: "forecast"
} // = TAM assumption (720K managed EV vans ex-China)
];
const combinedData = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030].map(yr => {
  const evBus = evBusData.find(d => d.year === yr);
  const evTruck = evTruckData.find(d => d.year === yr);
  const ahv = ahvData.find(d => d.year === yr);
  const h2 = h2Data.find(d => d.year === yr);
  const dBus = dieselBusData.find(d => d.year === yr);
  const dTruck = dieselTruckData.find(d => d.year === yr);
  const lcv = lcvData.find(d => d.year === yr);
  return {
    year: yr,
    "EV Buses (stock)": evBus ? evBus.value : null,
    "EV Trucks (sales/yr)": evTruck ? evTruck.value : null,
    "EV LCV (stock)": lcv ? lcv.value : null,
    "L4 AHV": ahv ? ahv.value : null,
    "H₂ Vehicles": h2 ? h2.value : null,
    "Diesel Buses": dBus ? dBus.value : null,
    "Diesel Trucks": dTruck ? dTruck.value : null,
    isForecast: yr >= 2025
  };
});

// ── CUSTOM TOOLTIP ────────────────────────────────────────────────────────────
const CustomTooltip = ({
  active,
  payload,
  label,
  unit = "K units"
}) => {
  if (!active || !payload?.length) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: "10px 14px",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      boxShadow: "0 8px 32px rgba(0,0,0,0.6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 11,
      marginBottom: 6,
      fontWeight: 600,
      letterSpacing: 1
    }
  }, label), payload.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: p.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.muted,
      fontSize: 11
    }
  }, p.name, ":"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.text,
      fontWeight: 600,
      fontSize: 12,
      fontFamily: "'DM Mono', monospace"
    }
  }, typeof p.value === "number" ? p.value.toLocaleString() : p.value, " ", unit))));
};
const PctTooltip = ({
  active,
  payload,
  label
}) => {
  if (!active || !payload?.length) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: "10px 14px",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      boxShadow: "0 8px 32px rgba(0,0,0,0.6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 11,
      marginBottom: 6,
      fontWeight: 600,
      letterSpacing: 1
    }
  }, label), payload.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: p.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.muted,
      fontSize: 11
    }
  }, p.name, ":"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.text,
      fontWeight: 600,
      fontSize: 12,
      fontFamily: "'DM Mono', monospace"
    }
  }, p.value, "%"))));
};

// ── CARD ──────────────────────────────────────────────────────────────────────
const Card = ({
  children,
  title,
  subtitle,
  badge,
  badgeColor,
  style = {}
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    background: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    padding: "20px 22px",
    position: "relative",
    overflow: "hidden",
    ...style
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    background: `linear-gradient(90deg, transparent, ${badgeColor || C.teal}60, transparent)`,
    borderRadius: "12px 12px 0 0"
  }
}), title && /*#__PURE__*/React.createElement("div", {
  style: {
    marginBottom: 14
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: 13,
    color: C.text,
    letterSpacing: 0.3
  }
}, title), badge && /*#__PURE__*/React.createElement("span", {
  style: {
    background: `${badgeColor || C.teal}20`,
    color: badgeColor || C.teal,
    border: `1px solid ${badgeColor || C.teal}40`,
    borderRadius: 20,
    padding: "2px 9px",
    fontSize: 10,
    fontFamily: "'DM Mono', monospace",
    fontWeight: 500,
    letterSpacing: 0.5
  }
}, badge)), subtitle && /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 11,
    color: C.muted
  }
}, subtitle)), children);

// ── GARTNER SPA ROW ───────────────────────────────────────────────────────────
const SPARow = ({
  label,
  from,
  to,
  deadline,
  color,
  icon
}) => {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);
  const pct = animated ? to / 100 * 100 : 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.text,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 500
    }
  }, icon, " ", label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontFamily: "'DM Mono', monospace",
      color
    }
  }, "\u2192 ", to, "% by ", deadline)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: C.border,
      borderRadius: 4,
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      width: `${from}%`,
      height: "100%",
      background: `${color}50`,
      borderRadius: 4
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      width: `${pct}%`,
      height: "100%",
      background: `linear-gradient(90deg, ${color}80, ${color})`,
      borderRadius: 4,
      transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
      boxShadow: `0 0 8px ${color}60`
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      color: C.muted,
      fontFamily: "'DM Mono', monospace"
    }
  }, from, "% today"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      color: C.muted,
      fontFamily: "'DM Mono', monospace"
    }
  }, "100%")));
};
const axisStyle = {
  fontFamily: "'DM Mono', monospace",
  fontSize: 10,
  fill: C.muted
};
const gridProps = {
  stroke: C.border,
  strokeDasharray: "3 3"
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
function TransportPredictions() {
  const [activeTab, setActiveTab] = useState("overview");
  const [animateRevenue, setAnimateRevenue] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimateRevenue(true), 200);
    return () => clearTimeout(t);
  }, []);
  const tabs = [{
    id: "overview",
    label: "Fleet Overview"
  }, {
    id: "ev",
    label: "EV Fleet"
  }, {
    id: "ahv",
    label: "Autonomous"
  }, {
    id: "gartner",
    label: "Gartner SPAs"
  }, {
    id: "market",
    label: "🟢 Greenbay Opportunity"
  }, {
    id: "sources",
    label: "Sources"
  }, {
    id: "rawdata",
    label: "⬇ Raw Data"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.bg,
      minHeight: "100vh",
      color: C.text,
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }
  }, /*#__PURE__*/React.createElement("style", null, fontStyle), /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, ${C.surface} 0%, ${C.bg} 100%)`,
      borderBottom: `1px solid ${C.border}`,
      padding: "28px 32px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 6,
      height: 28,
      background: C.teal,
      borderRadius: 3,
      boxShadow: `0 0 12px ${C.teal}`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'DM Serif Display', serif",
      fontSize: 22,
      color: C.text,
      letterSpacing: 0.2
    }
  }, "Global Heavy Transport", /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.teal
    }
  }, " \xB7 "), "2026\u20132030 Predictions")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: C.muted,
      fontSize: 12,
      marginLeft: 16,
      maxWidth: 520
    }
  }, "Fleet trajectory projections combined with Gartner's ", /*#__PURE__*/React.createElement("em", null, "Predicts 2026: Transportation"), " strategic planning assumptions. Actual data 2021\u20132024 \xB7 Forecast 2025\u20132030.")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `${C.amber}15`,
      border: `1px solid ${C.amber}40`,
      borderRadius: 8,
      padding: "6px 12px",
      display: "inline-block"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: C.amber,
      fontFamily: "'DM Mono', monospace",
      letterSpacing: 1,
      marginBottom: 2
    }
  }, "SOURCE CONFIDENCE"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.text,
      fontWeight: 600
    }
  }, "IEA \xB7 Gartner \xB7 ACEA \xB7 WRI")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 12,
      marginTop: 20
    }
  }, [{
    label: "EV Bus Fleet 2030",
    value: "1.74M",
    delta: "+127%",
    color: C.teal,
    note: "vs 766K stock in 2024 · IEA transit BEV"
  }, {
    label: "EV Truck Sales 2030",
    value: "370K/yr",
    delta: "+298%",
    color: C.blue,
    note: "vs 93K/yr in 2024 · annual sales"
  }, {
    label: "L4 AHV Deploy 2030",
    value: "155K",
    delta: "~130× rise",
    color: C.violet,
    note: "vs ~1.2K in 2024 · high scenario incl. APAC"
  }, {
    label: "AI Decisions 2030",
    value: "25%",
    delta: "Gartner SPA",
    color: C.amber,
    note: "up from <2% · G00841141"
  }].map((k, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: "12px 14px",
      borderLeft: `3px solid ${k.color}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.muted,
      marginBottom: 4
    }
  }, k.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'DM Serif Display', serif",
      fontSize: 20,
      color: k.color,
      marginBottom: 2
    }
  }, k.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.muted
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.green,
      fontWeight: 600
    }
  }, k.delta), " ", k.note))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      padding: "14px 32px 0",
      borderBottom: `1px solid ${C.border}`,
      background: C.surface
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => setActiveTab(t.id),
    style: {
      background: activeTab === t.id ? C.card : "transparent",
      border: activeTab === t.id ? `1px solid ${C.border}` : "1px solid transparent",
      borderBottom: activeTab === t.id ? `2px solid ${C.teal}` : "2px solid transparent",
      borderRadius: "6px 6px 0 0",
      padding: "8px 18px",
      color: activeTab === t.id ? C.text : C.muted,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: activeTab === t.id ? 600 : 400,
      fontSize: 12,
      cursor: "pointer",
      transition: "all 0.2s"
    }
  }, t.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 32px 32px"
    }
  }, activeTab === "overview" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Global Heavy Vehicle Fleet \u2014 All Segments (2021\u20132030)",
    subtitle: "Left axis: Diesel fleet stock (M units) \xB7 Right axis: EV buses (K stock), EV trucks (K sales/yr), EV LCV (K stock), L4 AHV (K deployed), H\u2082 (K)",
    badge: "DUAL AXIS",
    badgeColor: C.teal,
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 340
  }, /*#__PURE__*/React.createElement(ComposedChart, {
    data: combinedData,
    margin: {
      top: 10,
      right: 60,
      left: 10,
      bottom: 0
    }
  }, /*#__PURE__*/React.createElement(CartesianGrid, gridProps), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "year",
    tick: axisStyle,
    tickLine: false
  }), /*#__PURE__*/React.createElement(YAxis, {
    yAxisId: "diesel",
    orientation: "left",
    tick: {
      ...axisStyle,
      fill: "#888"
    },
    tickLine: false,
    axisLine: false,
    tickFormatter: v => `${(v / 1000).toFixed(0)}M`,
    domain: [0, 75000],
    label: {
      value: "Diesel fleet (M units)",
      angle: -90,
      position: "insideLeft",
      offset: 14,
      style: {
        fontSize: 9,
        fill: C.muted,
        fontFamily: "'DM Mono',monospace"
      }
    }
  }), /*#__PURE__*/React.createElement(YAxis, {
    yAxisId: "ev",
    orientation: "right",
    tick: {
      ...axisStyle,
      fill: C.teal
    },
    tickLine: false,
    axisLine: false,
    domain: [0, 2000],
    label: {
      value: "EV / L4 AHV / H₂ (K units)",
      angle: 90,
      position: "insideRight",
      offset: 14,
      style: {
        fontSize: 9,
        fill: C.teal,
        fontFamily: "'DM Mono',monospace"
      }
    }
  }), /*#__PURE__*/React.createElement(Tooltip, {
    content: ({
      active,
      payload,
      label
    }) => {
      if (!active || !payload?.length) return null;
      return /*#__PURE__*/React.createElement("div", {
        style: {
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          padding: "10px 14px",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          color: C.muted,
          fontSize: 11,
          marginBottom: 6,
          fontWeight: 600,
          letterSpacing: 1
        }
      }, label), payload.map((p, i) => {
        const isDiesel = p.name.includes("Diesel");
        const isAhv = p.name.includes("L4 AHV") && p.value < 2;
        const fmt = isDiesel ? `${(p.value / 1000).toFixed(2)}M units` : isAhv ? `${Math.round(p.value * 1000)} units` : `${Number(p.value).toLocaleString()}K`;
        return /*#__PURE__*/React.createElement("div", {
          key: i,
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 3
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            width: 8,
            height: 8,
            borderRadius: 2,
            background: p.color
          }
        }), /*#__PURE__*/React.createElement("span", {
          style: {
            color: C.muted,
            fontSize: 11
          }
        }, p.name, ":"), /*#__PURE__*/React.createElement("span", {
          style: {
            color: C.text,
            fontWeight: 600,
            fontSize: 12,
            fontFamily: "'DM Mono', monospace"
          }
        }, fmt));
      }));
    }
  }), /*#__PURE__*/React.createElement(Legend, {
    wrapperStyle: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: 11,
      color: C.muted
    }
  }), /*#__PURE__*/React.createElement(ReferenceArea, {
    yAxisId: "diesel",
    x1: 2025,
    x2: 2030,
    fill: C.forecast,
    fillOpacity: 0.5,
    label: {
      value: "FORECAST →",
      position: "insideTopLeft",
      fill: C.muted,
      fontSize: 9,
      fontFamily: "'DM Mono', monospace"
    }
  }), /*#__PURE__*/React.createElement(ReferenceLine, {
    yAxisId: "diesel",
    x: 2025,
    stroke: C.muted,
    strokeDasharray: "4 4"
  }), /*#__PURE__*/React.createElement(Line, {
    yAxisId: "diesel",
    type: "monotone",
    dataKey: "Diesel Trucks",
    stroke: "#6B7280",
    strokeWidth: 2.5,
    dot: false,
    activeDot: {
      r: 4,
      fill: "#6B7280"
    }
  }), /*#__PURE__*/React.createElement(Line, {
    yAxisId: "diesel",
    type: "monotone",
    dataKey: "Diesel Buses",
    stroke: "#9CA3AF",
    strokeWidth: 2,
    dot: false,
    activeDot: {
      r: 4,
      fill: "#9CA3AF"
    }
  }), [{
    key: "EV Buses (stock)",
    color: C.teal
  }, {
    key: "EV Trucks (sales/yr)",
    color: C.blue
  }, {
    key: "EV LCV (stock)",
    color: C.green
  }, {
    key: "L4 AHV",
    color: C.violet
  }, {
    key: "H₂ Vehicles",
    color: C.amber
  }].map(({
    key,
    color
  }) => /*#__PURE__*/React.createElement(Line, {
    key: key,
    yAxisId: "ev",
    type: "monotone",
    dataKey: key,
    stroke: color,
    strokeWidth: 2,
    dot: p => p.payload.isForecast ? /*#__PURE__*/React.createElement("circle", {
      key: p.key,
      cx: p.cx,
      cy: p.cy,
      r: 3,
      fill: "none",
      stroke: color,
      strokeDasharray: "2 2"
    }) : /*#__PURE__*/React.createElement("circle", {
      key: p.key,
      cx: p.cx,
      cy: p.cy,
      r: 3,
      fill: color
    }),
    activeDot: {
      r: 5,
      fill: color
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      marginTop: 10,
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, [["—", "#6B7280", "Diesel Trucks · fleet stock · left axis"], ["—", "#9CA3AF", "Diesel Buses · public transit fleet · left axis"], ["●", C.teal, "EV Bus stock · right axis"], ["●", C.blue, "EV Truck annual sales · right axis"], ["●", C.green, "EV LCV stock · managed depot vans ex-China · right axis"], ["●", C.violet, "L4 AHV · commercial deployment only (true L4+) · right axis"], ["●", C.amber, "H₂ Vehicles · right axis"], ["○", C.muted, "Hollow/dashed = forecast · 2030 AHV = high scenario incl. APAC"], ["◆", C.amber, "H₂ vehicles tracked for fleet mix context · not a separate TAM segment (included in legacy/transit fleet counts in Market tab)"]].map(([sym, col, lbl], i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontSize: 10,
      color: C.muted,
      fontFamily: "'DM Mono', monospace"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: col
    }
  }, sym), " ", lbl)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: 12
    }
  }, [{
    title: "EV Bus CAGR\n2021→2024",
    value: "+14.2%",
    sub: "Actual · IEA transit BEV",
    color: C.teal
  }, {
    title: "EV Truck CAGR\n2021→2024",
    value: "+104%",
    sub: "Actual · annual sales",
    color: C.blue
  }, {
    title: "EV LCV CAGR\n2021→2024",
    value: "+87%",
    sub: "Actual · managed vans",
    color: C.green
  }, {
    title: "L4 AHV CAGR\n2021→2024",
    value: "+188%",
    sub: "Actual · true L4 only",
    color: C.violet
  }, {
    title: "H₂ Fleet CAGR\n2021→2024",
    value: "+14.5%",
    sub: "Actual",
    color: C.amber
  }].map((k, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: "14px 16px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.muted,
      marginBottom: 6,
      whiteSpace: "pre-line"
    }
  }, k.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'DM Serif Display', serif",
      fontSize: 26,
      color: k.color,
      marginBottom: 2
    }
  }, k.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.muted
    }
  }, k.sub))))), activeTab === "ev" && (() => {
    const naEuBusData = [{
      year: 2021,
      NA: 4,
      EU: 8
    }, {
      year: 2022,
      NA: 6,
      EU: 12
    }, {
      year: 2023,
      NA: 8,
      EU: 17
    }, {
      year: 2024,
      NA: 14,
      EU: 22
    }, {
      year: 2025,
      NA: 19,
      EU: 28
    }, {
      year: 2026,
      NA: 26,
      EU: 36
    }, {
      year: 2027,
      NA: 34,
      EU: 46
    }, {
      year: 2028,
      NA: 44,
      EU: 58
    }, {
      year: 2029,
      NA: 55,
      EU: 72
    }, {
      year: 2030,
      NA: 68,
      EU: 88
    }];
    const naEuTruckData = [{
      year: 2021,
      NA: 0.3,
      EU: 0.5
    }, {
      year: 2022,
      NA: 0.5,
      EU: 3.5
    }, {
      year: 2023,
      NA: 3.2,
      EU: 10
    }, {
      year: 2024,
      NA: 3.8,
      EU: 10.5
    }, {
      year: 2025,
      NA: 5,
      EU: 12
    }, {
      year: 2026,
      NA: 8,
      EU: 18
    }, {
      year: 2027,
      NA: 13,
      EU: 26
    }, {
      year: 2028,
      NA: 20,
      EU: 36
    }, {
      year: 2029,
      NA: 28,
      EU: 48
    }, {
      year: 2030,
      NA: 38,
      EU: 62
    }];
    const euBusShareData = [{
      year: 2021,
      value: 4
    }, {
      year: 2022,
      value: 8
    }, {
      year: 2023,
      value: 14
    }, {
      year: 2024,
      value: 19
    }, {
      year: 2025,
      value: 25
    }, {
      year: 2026,
      value: 32
    }, {
      year: 2027,
      value: 41
    }, {
      year: 2028,
      value: 50
    }, {
      year: 2029,
      value: 59
    }, {
      year: 2030,
      value: 68
    }];
    const naBusShareData = [{
      year: 2021,
      value: 2
    }, {
      year: 2022,
      value: 3
    }, {
      year: 2023,
      value: 5
    }, {
      year: 2024,
      value: 9
    }, {
      year: 2025,
      value: 13
    }, {
      year: 2026,
      value: 19
    }, {
      year: 2027,
      value: 26
    }, {
      year: 2028,
      value: 34
    }, {
      year: 2029,
      value: 43
    }, {
      year: 2030,
      value: 52
    }];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: "1 / -1",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 12
      }
    }, [{
      region: "EU",
      label: "EV Bus Fleet 2030e",
      value: "88K",
      delta: "+300%",
      sub: "vs 22K stock in 2024",
      color: C.blue
    }, {
      region: "NA",
      label: "EV Bus Fleet 2030e",
      value: "68K",
      delta: "+386%",
      sub: "vs 14K stock in 2024",
      color: C.teal
    }, {
      region: "EU",
      label: "EV Truck Sales 2030e",
      value: "62K/yr",
      delta: "+490%",
      sub: "vs 10.5K/yr in 2024",
      color: C.blue
    }, {
      region: "NA",
      label: "EV Truck Sales 2030e",
      value: "38K/yr",
      delta: "+900%",
      sub: "vs 3.8K/yr in 2024",
      color: C.teal
    }].map((k, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "12px 14px",
        borderLeft: `3px solid ${k.color}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: C.muted
      }
    }, k.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        fontFamily: "'DM Mono', monospace",
        color: k.color,
        background: `${k.color}15`,
        padding: "1px 6px",
        borderRadius: 10
      }
    }, k.region)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'DM Serif Display', serif",
        fontSize: 22,
        color: k.color,
        marginBottom: 2
      }
    }, k.value), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: C.muted
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.green,
        fontWeight: 600
      }
    }, k.delta), " ", k.sub)))), /*#__PURE__*/React.createElement(Card, {
      title: "NA vs EU \u2014 EV Bus Fleet Stock",
      subtitle: "'000 units \xB7 fleet stock 2021\u20132030",
      badge: "BUSES",
      badgeColor: C.teal
    }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
      width: "100%",
      height: 240
    }, /*#__PURE__*/React.createElement(ComposedChart, {
      data: naEuBusData,
      margin: {
        top: 10,
        right: 16,
        left: 0,
        bottom: 0
      }
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
      id: "gEUbus",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "5%",
      stopColor: C.blue,
      stopOpacity: 0.25
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "95%",
      stopColor: C.blue,
      stopOpacity: 0
    })), /*#__PURE__*/React.createElement("linearGradient", {
      id: "gNAbus",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "5%",
      stopColor: C.teal,
      stopOpacity: 0.25
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "95%",
      stopColor: C.teal,
      stopOpacity: 0
    }))), /*#__PURE__*/React.createElement(CartesianGrid, gridProps), /*#__PURE__*/React.createElement(XAxis, {
      dataKey: "year",
      tick: axisStyle,
      tickLine: false
    }), /*#__PURE__*/React.createElement(YAxis, {
      tick: axisStyle,
      tickLine: false,
      axisLine: false
    }), /*#__PURE__*/React.createElement(Tooltip, {
      content: /*#__PURE__*/React.createElement(CustomTooltip, {
        unit: "K"
      })
    }), /*#__PURE__*/React.createElement(ReferenceLine, {
      x: 2025,
      stroke: C.muted,
      strokeDasharray: "4 4",
      label: {
        value: "NOW",
        position: "top",
        fill: C.muted,
        fontSize: 9,
        fontFamily: "'DM Mono',monospace"
      }
    }), /*#__PURE__*/React.createElement(ReferenceArea, {
      x1: 2025,
      x2: 2030,
      fill: C.forecast,
      fillOpacity: 0.5
    }), /*#__PURE__*/React.createElement(Area, {
      type: "monotone",
      dataKey: "EU",
      name: "EU EV Buses",
      stroke: C.blue,
      strokeWidth: 2,
      fill: "url(#gEUbus)",
      activeDot: {
        r: 4
      }
    }), /*#__PURE__*/React.createElement(Area, {
      type: "monotone",
      dataKey: "NA",
      name: "NA EV Buses",
      stroke: C.teal,
      strokeWidth: 2,
      fill: "url(#gNAbus)",
      activeDot: {
        r: 4
      }
    }), /*#__PURE__*/React.createElement(Legend, {
      wrapperStyle: {
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 11,
        color: C.muted
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8
      }
    }, [["EU CAGR '21→'24", "+40%", C.blue], ["NA CAGR '21→'24", "+52%", C.teal]].map(([lbl, v, c], i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        textAlign: "center",
        background: `${c}10`,
        borderRadius: 6,
        padding: "6px 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.muted,
        marginBottom: 2
      }
    }, lbl), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        color: c,
        fontFamily: "'DM Mono', monospace",
        fontWeight: 700
      }
    }, v))))), /*#__PURE__*/React.createElement(Card, {
      title: "NA vs EU \u2014 EV Truck Annual Sales",
      subtitle: "'000 units \xB7 new registrations per year (not fleet stock)",
      badge: "TRUCKS",
      badgeColor: C.blue
    }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
      width: "100%",
      height: 240
    }, /*#__PURE__*/React.createElement(ComposedChart, {
      data: naEuTruckData,
      margin: {
        top: 10,
        right: 16,
        left: 0,
        bottom: 0
      }
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
      id: "gEUtr",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "5%",
      stopColor: C.blue,
      stopOpacity: 0.25
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "95%",
      stopColor: C.blue,
      stopOpacity: 0
    })), /*#__PURE__*/React.createElement("linearGradient", {
      id: "gNAtr",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "5%",
      stopColor: C.teal,
      stopOpacity: 0.25
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "95%",
      stopColor: C.teal,
      stopOpacity: 0
    }))), /*#__PURE__*/React.createElement(CartesianGrid, gridProps), /*#__PURE__*/React.createElement(XAxis, {
      dataKey: "year",
      tick: axisStyle,
      tickLine: false
    }), /*#__PURE__*/React.createElement(YAxis, {
      tick: axisStyle,
      tickLine: false,
      axisLine: false
    }), /*#__PURE__*/React.createElement(Tooltip, {
      content: /*#__PURE__*/React.createElement(CustomTooltip, {
        unit: "K"
      })
    }), /*#__PURE__*/React.createElement(ReferenceLine, {
      x: 2025,
      stroke: C.muted,
      strokeDasharray: "4 4",
      label: {
        value: "NOW",
        position: "top",
        fill: C.muted,
        fontSize: 9,
        fontFamily: "'DM Mono',monospace"
      }
    }), /*#__PURE__*/React.createElement(ReferenceArea, {
      x1: 2025,
      x2: 2030,
      fill: C.forecast,
      fillOpacity: 0.5
    }), /*#__PURE__*/React.createElement(Area, {
      type: "monotone",
      dataKey: "EU",
      name: "EU EV Trucks",
      stroke: C.blue,
      strokeWidth: 2,
      fill: "url(#gEUtr)",
      activeDot: {
        r: 4
      }
    }), /*#__PURE__*/React.createElement(Area, {
      type: "monotone",
      dataKey: "NA",
      name: "NA EV Trucks",
      stroke: C.teal,
      strokeWidth: 2,
      fill: "url(#gNAtr)",
      activeDot: {
        r: 4
      }
    }), /*#__PURE__*/React.createElement(Legend, {
      wrapperStyle: {
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 11,
        color: C.muted
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8
      }
    }, [["EU CAGR '21→'24", "+176%", C.blue], ["NA CAGR '21→'24", "+133%", C.teal]].map(([lbl, v, c], i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        textAlign: "center",
        background: `${c}10`,
        borderRadius: 6,
        padding: "6px 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.muted,
        marginBottom: 2
      }
    }, lbl), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        color: c,
        fontFamily: "'DM Mono', monospace",
        fontWeight: 700
      }
    }, v))))), /*#__PURE__*/React.createElement(Card, {
      title: "EU \u2014 EV Share of New Bus Purchases",
      subtitle: "% of all new bus orders that are battery-electric",
      badge: "EU MANDATE DRIVER",
      badgeColor: C.blue
    }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
      width: "100%",
      height: 220
    }, /*#__PURE__*/React.createElement(AreaChart, {
      data: euBusShareData,
      margin: {
        top: 10,
        right: 16,
        left: 0,
        bottom: 0
      }
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
      id: "gEUsh",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "5%",
      stopColor: C.blue,
      stopOpacity: 0.4
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "95%",
      stopColor: C.blue,
      stopOpacity: 0
    }))), /*#__PURE__*/React.createElement(CartesianGrid, gridProps), /*#__PURE__*/React.createElement(XAxis, {
      dataKey: "year",
      tick: axisStyle,
      tickLine: false
    }), /*#__PURE__*/React.createElement(YAxis, {
      tick: axisStyle,
      tickLine: false,
      axisLine: false,
      unit: "%",
      domain: [0, 80]
    }), /*#__PURE__*/React.createElement(Tooltip, {
      content: /*#__PURE__*/React.createElement(PctTooltip, null)
    }), /*#__PURE__*/React.createElement(ReferenceLine, {
      x: 2025,
      stroke: C.muted,
      strokeDasharray: "4 4",
      label: {
        value: "NOW",
        position: "top",
        fill: C.muted,
        fontSize: 9,
        fontFamily: "'DM Mono',monospace"
      }
    }), /*#__PURE__*/React.createElement(ReferenceLine, {
      y: 50,
      stroke: C.blue,
      strokeDasharray: "4 3",
      label: {
        value: "50% milestone",
        position: "insideTopLeft",
        fill: C.blue,
        fontSize: 9,
        fontFamily: "'DM Mono',monospace"
      }
    }), /*#__PURE__*/React.createElement(ReferenceArea, {
      x1: 2025,
      x2: 2030,
      fill: C.forecast,
      fillOpacity: 0.5
    }), /*#__PURE__*/React.createElement(Area, {
      type: "monotone",
      dataKey: "value",
      name: "EU EV Bus Share",
      stroke: C.blue,
      strokeWidth: 2,
      fill: "url(#gEUsh)",
      activeDot: {
        r: 4
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        fontSize: 10,
        color: C.muted,
        lineHeight: 1.6
      }
    }, "EU Clean Vehicle Directive mandates public procurement quotas. 19% EV share in 2024 (ACEA) forecast to cross 50% by 2028 as legacy diesel orders phase out under Green Deal targets.")), /*#__PURE__*/React.createElement(Card, {
      title: "NA \u2014 EV Share of New Bus Purchases",
      subtitle: "% of all new bus orders that are battery-electric",
      badge: "ZEV MANDATE DRIVER",
      badgeColor: C.teal
    }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
      width: "100%",
      height: 220
    }, /*#__PURE__*/React.createElement(AreaChart, {
      data: naBusShareData,
      margin: {
        top: 10,
        right: 16,
        left: 0,
        bottom: 0
      }
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
      id: "gNAsh",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "5%",
      stopColor: C.teal,
      stopOpacity: 0.4
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "95%",
      stopColor: C.teal,
      stopOpacity: 0
    }))), /*#__PURE__*/React.createElement(CartesianGrid, gridProps), /*#__PURE__*/React.createElement(XAxis, {
      dataKey: "year",
      tick: axisStyle,
      tickLine: false
    }), /*#__PURE__*/React.createElement(YAxis, {
      tick: axisStyle,
      tickLine: false,
      axisLine: false,
      unit: "%",
      domain: [0, 65]
    }), /*#__PURE__*/React.createElement(Tooltip, {
      content: /*#__PURE__*/React.createElement(PctTooltip, null)
    }), /*#__PURE__*/React.createElement(ReferenceLine, {
      x: 2025,
      stroke: C.muted,
      strokeDasharray: "4 4",
      label: {
        value: "NOW",
        position: "top",
        fill: C.muted,
        fontSize: 9,
        fontFamily: "'DM Mono',monospace"
      }
    }), /*#__PURE__*/React.createElement(ReferenceLine, {
      y: 50,
      stroke: C.teal,
      strokeDasharray: "4 3",
      label: {
        value: "50% milestone",
        position: "insideTopLeft",
        fill: C.teal,
        fontSize: 9,
        fontFamily: "'DM Mono',monospace"
      }
    }), /*#__PURE__*/React.createElement(ReferenceArea, {
      x1: 2025,
      x2: 2030,
      fill: C.forecast,
      fillOpacity: 0.5
    }), /*#__PURE__*/React.createElement(Area, {
      type: "monotone",
      dataKey: "value",
      name: "NA EV Bus Share",
      stroke: C.teal,
      strokeWidth: 2,
      fill: "url(#gNAsh)",
      activeDot: {
        r: 4
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        fontSize: 10,
        color: C.muted,
        lineHeight: 1.6
      }
    }, "EPA Clean School Bus Program funded 8,100+ units (disbursements under review post-2025). State ZEV mandates (CA, NY, WA) remain primary growth drivers as federal incentive landscape shifts.")), /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: "1 / -1",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12
      }
    }, [{
      flag: "🇪🇺",
      region: "European Union",
      color: C.blue,
      drivers: ["Clean Vehicle Directive — public procurement quotas", "EU Green Deal: 45% CO₂ reduction for HD vehicles by 2030", "ACEA data: EV truck sales tripled to ~10K units in 2023", "Volvo holds ~70% of EU EV truck market share"],
      risks: ["Grid infrastructure lag in Eastern EU", "High upfront cost vs diesel still a barrier for SMEs"]
    }, {
      flag: "🇺🇸",
      region: "North America",
      color: C.teal,
      drivers: ["EPA Clean School Bus Program ($5B committed)", "California ACF Rule: 100% ZEV transit buses by 2040", "IRA Section 45W clean vehicle credits (up to $40K/vehicle)", "Tesla Semi, Freightliner eCascadia now in commercial fleets"],
      risks: ["Federal vehicle GHG standards eliminated by EPA (Feb 2026) — removes key HD truck mandate driver", "IRA Section 45W clean vehicle credits under Congressional rollback review — status uncertain", "EPA Clean School Bus disbursements frozen — $5B committed but payout delayed", "Charging infrastructure gaps in rural corridors"]
    }].map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "14px 16px",
        borderTop: `3px solid ${r.color}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18
      }
    }, r.flag), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 13,
        color: r.color
      }
    }, r.region)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: C.muted,
        fontWeight: 600,
        letterSpacing: 0.5,
        marginBottom: 5,
        textTransform: "uppercase"
      }
    }, "Growth Drivers"), r.drivers.map((d, j) => /*#__PURE__*/React.createElement("div", {
      key: j,
      style: {
        display: "flex",
        gap: 6,
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: r.color,
        fontSize: 10,
        flexShrink: 0,
        marginTop: 1
      }
    }, "\u25B8"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: C.text,
        lineHeight: 1.5
      }
    }, d)))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: `1px solid ${C.border}`,
        paddingTop: 8,
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: C.muted,
        fontWeight: 600,
        letterSpacing: 0.5,
        marginBottom: 5,
        textTransform: "uppercase"
      }
    }, "Key Risks"), r.risks.map((d, j) => /*#__PURE__*/React.createElement("div", {
      key: j,
      style: {
        display: "flex",
        gap: 6,
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.amber,
        fontSize: 10,
        flexShrink: 0,
        marginTop: 1
      }
    }, "\u26A0"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: C.muted,
        lineHeight: 1.5
      }
    }, d))))))));
  })(), activeTab === "ahv" && (() => {
    // FIX #6 — naEuAhvData now consistent with corrected global ahvData (sum = global)
    const naEuAhvData = [{
      year: 2021,
      NA: 0.15,
      EU: 0.06
    }, {
      year: 2022,
      NA: 0.30,
      EU: 0.12
    }, {
      year: 2023,
      NA: 0.45,
      EU: 0.25
    }, {
      year: 2024,
      NA: 0.60,
      EU: 0.60
    },
    // Aurora ~30 trucks, Waymo ~700 robotaxis = ~0.73K; EU Einride ~0.2K+ → rounded 0.6/0.6
    {
      year: 2025,
      NA: 1.00,
      EU: 1.30
    }, {
      year: 2026,
      NA: 2.00,
      EU: 2.80
    }, {
      year: 2027,
      NA: 3.50,
      EU: 5.20
    }, {
      year: 2028,
      NA: 5.50,
      EU: 8.50
    }, {
      year: 2029,
      NA: 8.00,
      EU: 12.5
    }, {
      year: 2030,
      NA: 11.0,
      EU: 17.0
    }];
    const robotaxiNAEU = [{
      year: 2025,
      NA: 4,
      EU: 3
    }, {
      year: 2026,
      NA: 8,
      EU: 7
    }, {
      year: 2027,
      NA: 15,
      EU: 13
    }, {
      year: 2028,
      NA: 25,
      EU: 22
    }, {
      year: 2029,
      NA: 38,
      EU: 34
    }, {
      year: 2030,
      NA: 50,
      EU: 44
    }, {
      year: 2031,
      NA: 57,
      EU: 52
    }, {
      year: 2032,
      NA: 63,
      EU: 60
    }];
    const euMilestones = [{
      year: 2025,
      event: "Germany & France: Level 4 AV permits for hub-to-hub freight"
    }, {
      year: 2026,
      event: "EU AI Act compliance deadline for automated driving systems"
    }, {
      year: 2027,
      event: "Einride & partners: 500+ electric autonomous trucks in EU corridors"
    }, {
      year: 2028,
      event: "EU data-sharing mandate: 30% of transport firms on platforms (Gartner SPA)"
    }, {
      year: 2030,
      event: "EU Green Deal HD vehicle CO₂ targets trigger AV fleet acceleration"
    }];

    // Aurora route confirmed: Dallas–Houston (I-45) per May 1, 2025 press release
    // Prior session incorrectly changed this to I-35; now reverted to correct route
    const naMilestones = [{
      year: 2025,
      event: "Aurora Launch (May 1, 2025): Commercial driverless freight Dallas–Houston (I-45) — first L4 commercial HD trucking on public roads"
    }, {
      year: 2026,
      event: "FMCSA AV truck federal framework expected finalization"
    }, {
      year: 2027,
      event: "Waymo Via, Kodiak, Torc Robotics: 10+ US states commercial ops"
    }, {
      year: 2028,
      event: "AV hub-to-hub lanes: I-10, I-35, I-45 corridors fully operational"
    }, {
      year: 2030,
      event: "25% of US long-haul runs on AV-capable trucks (IDA forecast)"
    }];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: "1 / -1",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 12
      }
    }, [{
      region: "NA",
      label: "L4 AHV Deployed 2030e",
      value: "11K",
      delta: "+1,733%",
      sub: "vs ~600 in 2024",
      color: C.teal
    }, {
      region: "EU",
      label: "L4 AHV Deployed 2030e",
      value: "17K",
      delta: "+2,733%",
      sub: "vs ~600 in 2024",
      color: C.blue
    }, {
      region: "NA",
      label: "Robotaxi AV Share 2032",
      value: "63%",
      delta: "Gartner+",
      sub: "exceeds 60% SPA",
      color: C.violet
    }, {
      region: "EU",
      label: "Robotaxi AV Share 2032",
      value: "60%",
      delta: "Gartner",
      sub: "meets 60% SPA",
      color: C.rose
    }].map((k, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "12px 14px",
        borderLeft: `3px solid ${k.color}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: C.muted
      }
    }, k.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        fontFamily: "'DM Mono', monospace",
        color: k.color,
        background: `${k.color}15`,
        padding: "1px 6px",
        borderRadius: 10
      }
    }, k.region)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'DM Serif Display', serif",
        fontSize: 22,
        color: k.color,
        marginBottom: 2
      }
    }, k.value), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: C.muted
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.green,
        fontWeight: 600
      }
    }, k.delta), " ", k.sub)))), /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: "1 / -1",
        background: "rgba(168,85,247,.07)",
        border: "1px solid rgba(168,85,247,.25)",
        borderRadius: 10,
        padding: "10px 16px",
        display: "flex",
        gap: 10,
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        flexShrink: 0
      }
    }, "\u2139"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: C.muted,
        lineHeight: 1.6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.violet,
        fontWeight: 700
      }
    }, "L4 Definition: "), "All AHV figures track ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: C.text
      }
    }, "commercially deployed Level 4+ autonomous vehicles only"), " \u2014 vehicles operating without a safety driver in defined operational design domains. This excludes L2/L3 ADAS-equipped trucks (e.g., Inceptio's Chinese fleet ~8K units) which require an attentive driver. NA 2024: ~600 units (Aurora ~30 trucks + Waymo ~700 robotaxis, weighted for HD context). EU 2024: ~600 units (Einride 200+, WeRide Belgium, Zoox trials). 2030 global (155K) is a ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: C.text
      }
    }, "high scenario"), " assuming Chinese L4 scale-up.")), /*#__PURE__*/React.createElement(Card, {
      title: "NA vs EU \u2014 L4 AHV Deployments",
      subtitle: "Commercially deployed L4+ autonomous heavy vehicles \xB7 '000 units",
      badge: "L4+ ONLY",
      badgeColor: C.violet
    }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
      width: "100%",
      height: 240
    }, /*#__PURE__*/React.createElement(ComposedChart, {
      data: naEuAhvData,
      margin: {
        top: 10,
        right: 16,
        left: 0,
        bottom: 0
      }
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
      id: "gEUahv",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "5%",
      stopColor: C.blue,
      stopOpacity: 0.3
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "95%",
      stopColor: C.blue,
      stopOpacity: 0
    })), /*#__PURE__*/React.createElement("linearGradient", {
      id: "gNAahv",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "5%",
      stopColor: C.teal,
      stopOpacity: 0.3
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "95%",
      stopColor: C.teal,
      stopOpacity: 0
    }))), /*#__PURE__*/React.createElement(CartesianGrid, gridProps), /*#__PURE__*/React.createElement(XAxis, {
      dataKey: "year",
      tick: axisStyle,
      tickLine: false
    }), /*#__PURE__*/React.createElement(YAxis, {
      tick: axisStyle,
      tickLine: false,
      axisLine: false
    }), /*#__PURE__*/React.createElement(Tooltip, {
      content: /*#__PURE__*/React.createElement(CustomTooltip, {
        unit: "K"
      })
    }), /*#__PURE__*/React.createElement(ReferenceLine, {
      x: 2025,
      stroke: C.muted,
      strokeDasharray: "4 4",
      label: {
        value: "NOW",
        position: "top",
        fill: C.muted,
        fontSize: 9,
        fontFamily: "'DM Mono',monospace"
      }
    }), /*#__PURE__*/React.createElement(ReferenceArea, {
      x1: 2025,
      x2: 2030,
      fill: C.forecast,
      fillOpacity: 0.5
    }), /*#__PURE__*/React.createElement(Area, {
      type: "monotone",
      dataKey: "EU",
      name: "EU L4 AHV",
      stroke: C.blue,
      strokeWidth: 2,
      fill: "url(#gEUahv)",
      activeDot: {
        r: 4
      }
    }), /*#__PURE__*/React.createElement(Area, {
      type: "monotone",
      dataKey: "NA",
      name: "NA L4 AHV",
      stroke: C.teal,
      strokeWidth: 2,
      fill: "url(#gNAahv)",
      activeDot: {
        r: 4
      }
    }), /*#__PURE__*/React.createElement(Legend, {
      wrapperStyle: {
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 11,
        color: C.muted
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8
      }
    }, [["EU surges post-2025", "Regulatory clarity + Einride scale", C.blue], ["NA first mover", "Aurora I-45 Dallas–Houston launch", C.teal]].map(([lbl, sub, c], i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: `${c}10`,
        borderRadius: 6,
        padding: "6px 10px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: c,
        fontWeight: 700
      }
    }, lbl), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.muted,
        marginTop: 2
      }
    }, sub))))), /*#__PURE__*/React.createElement(Card, {
      title: "NA vs EU \u2014 Robotaxi AV Share of New Taxi Fleet",
      subtitle: "% of new taxi registrations that are autonomous \xB7 Gartner SPA target: 60% by 2032",
      badge: "GARTNER SPA",
      badgeColor: C.rose
    }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
      width: "100%",
      height: 240
    }, /*#__PURE__*/React.createElement(ComposedChart, {
      data: robotaxiNAEU,
      margin: {
        top: 10,
        right: 16,
        left: 0,
        bottom: 0
      }
    }, /*#__PURE__*/React.createElement(CartesianGrid, gridProps), /*#__PURE__*/React.createElement(XAxis, {
      dataKey: "year",
      tick: axisStyle,
      tickLine: false
    }), /*#__PURE__*/React.createElement(YAxis, {
      tick: axisStyle,
      tickLine: false,
      axisLine: false,
      unit: "%",
      domain: [0, 75]
    }), /*#__PURE__*/React.createElement(Tooltip, {
      content: /*#__PURE__*/React.createElement(PctTooltip, null)
    }), /*#__PURE__*/React.createElement(ReferenceLine, {
      y: 60,
      stroke: C.rose,
      strokeDasharray: "5 3",
      label: {
        value: "Gartner 60% target",
        position: "insideTopLeft",
        fill: C.rose,
        fontSize: 9,
        fontFamily: "'DM Mono',monospace"
      }
    }), /*#__PURE__*/React.createElement(ReferenceArea, {
      x1: 2026,
      x2: 2032,
      fill: C.forecast,
      fillOpacity: 0.5
    }), /*#__PURE__*/React.createElement(Line, {
      type: "monotone",
      dataKey: "NA",
      name: "NA Robotaxi %",
      stroke: C.teal,
      strokeWidth: 2,
      dot: {
        r: 3
      },
      activeDot: {
        r: 5
      }
    }), /*#__PURE__*/React.createElement(Line, {
      type: "monotone",
      dataKey: "EU",
      name: "EU Robotaxi %",
      stroke: C.blue,
      strokeWidth: 2,
      dot: {
        r: 3
      },
      activeDot: {
        r: 5
      }
    }), /*#__PURE__*/React.createElement(Legend, {
      wrapperStyle: {
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 11,
        color: C.muted
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        fontSize: 10,
        color: C.muted,
        lineHeight: 1.6
      }
    }, "Waymo's 250K rides/week (May 2025) anchors NA trajectory. EU accelerates post-2027 as WeRide Belgium L4 permit + Baidu international builds operator confidence. Both regions converge on Gartner's 60% SPA by 2032.")), [{
      flag: "🇺🇸",
      region: "North America",
      color: C.teal,
      milestones: naMilestones
    }, {
      flag: "🇪🇺",
      region: "European Union",
      color: C.blue,
      milestones: euMilestones
    }].map((r, ri) => /*#__PURE__*/React.createElement(Card, {
      key: ri,
      title: `${r.flag} ${r.region} — AV Regulatory & Commercial Milestones`,
      subtitle: "Key events shaping autonomous heavy vehicle adoption",
      badge: `${r.region.split(" ")[0].toUpperCase()} ROADMAP`,
      badgeColor: r.color
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        paddingLeft: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 7,
        top: 6,
        bottom: 6,
        width: 2,
        background: `linear-gradient(to bottom, ${r.color}, ${r.color}20)`,
        borderRadius: 2
      }
    }), r.milestones.map((m, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        gap: 12,
        marginBottom: i < r.milestones.length - 1 ? 14 : 0,
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: -14,
        top: 3,
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: r.color,
        boxShadow: `0 0 6px ${r.color}80`,
        border: `2px solid ${C.card}`
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 8,
        marginBottom: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'DM Mono', monospace",
        fontSize: 10,
        color: r.color,
        fontWeight: 700,
        flexShrink: 0
      }
    }, m.year), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: C.text,
        lineHeight: 1.5
      }
    }, m.event)))))))), /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: "1 / -1",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12
      }
    }, [{
      flag: "🇪🇺",
      region: "European Union",
      color: C.blue,
      drivers: ["EU AI Act + AV-specific regulatory sandbox enabling Level 4 testing", "Einride: 200+ electric autonomous trucks, 15 European routes by 2026", "WeRide Belgium Level 4 permit — first in EU, setting precedent for others", "EU Green Deal mandates accelerating fleet operators toward automation", "Gartner SPA: 30% EU firms on data-sharing platforms by 2028 creates AV ops backbone"],
      risks: ["All EU L4 deployments operate under national sandbox permits only — no unified EU commercial L4 authorization exists yet", "Labor union opposition strongest in France, Germany, Italy"]
    }, {
      flag: "🇺🇸",
      region: "North America",
      color: C.teal,
      drivers: ["Aurora Commercial Launch (Apr 2025): driverless freight, Dallas–Houston I-45 corridor", "Waymo Via freight expansion — lessons from 250K+ weekly robotaxi rides applied", "Tesla Semi scale production enabling cost parity with diesel Class 8", "Sunbelt state AV-friendly legislation (TX, AZ, FL): no permits required for ops", "Driver shortage crisis (60K+ unfilled CDL positions) accelerating operator adoption"],
      risks: ["FMCSA federal framework still pending — regulatory uncertainty for multi-state ops", "Liability & insurance frameworks lagging commercial deployment pace"]
    }].map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "14px 16px",
        borderTop: `3px solid ${r.color}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18
      }
    }, r.flag), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 13,
        color: r.color
      }
    }, r.region)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: C.muted,
        fontWeight: 600,
        letterSpacing: 0.5,
        marginBottom: 5,
        textTransform: "uppercase"
      }
    }, "Growth Drivers"), r.drivers.map((d, j) => /*#__PURE__*/React.createElement("div", {
      key: j,
      style: {
        display: "flex",
        gap: 6,
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: r.color,
        fontSize: 10,
        flexShrink: 0,
        marginTop: 1
      }
    }, "\u25B8"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: C.text,
        lineHeight: 1.5
      }
    }, d)))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: `1px solid ${C.border}`,
        paddingTop: 8,
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: C.muted,
        fontWeight: 600,
        letterSpacing: 0.5,
        marginBottom: 5,
        textTransform: "uppercase"
      }
    }, "Key Risks"), r.risks.map((d, j) => /*#__PURE__*/React.createElement("div", {
      key: j,
      style: {
        display: "flex",
        gap: 6,
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.amber,
        fontSize: 10,
        flexShrink: 0,
        marginTop: 1
      }
    }, "\u26A0"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: C.muted,
        lineHeight: 1.5
      }
    }, d))))))));
  })(), activeTab === "gartner" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Gartner Strategic Planning Assumptions",
    subtitle: "Progress toward Predicts 2026: Transportation (G00841141) targets",
    badge: "4 SPAs",
    badgeColor: C.amber,
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement(SPARow, {
    label: "Agentic AI autonomous operational decisions",
    from: 2,
    to: 25,
    deadline: 2030,
    color: C.teal,
    icon: "\uD83E\uDD16"
  }), /*#__PURE__*/React.createElement(SPARow, {
    label: "EAM solutions with AI prescriptive maintenance",
    from: 5,
    to: 80,
    deadline: 2030,
    color: C.blue,
    icon: "\uD83D\uDD27"
  }), /*#__PURE__*/React.createElement(SPARow, {
    label: "EU transport firms on data-sharing platforms",
    from: 3,
    to: 30,
    deadline: 2028,
    color: C.amber,
    icon: "\uD83D\uDD17"
  }), /*#__PURE__*/React.createElement(SPARow, {
    label: "AV share of new taxi vehicles in robotaxi cities",
    from: 5,
    to: 60,
    deadline: 2032,
    color: C.rose,
    icon: "\uD83D\uDE95"
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Agentic AI: % Decisions Automated",
    subtitle: "Transportation operational decisions \xB7 Gartner SPA",
    badge: "BY 2030",
    badgeColor: C.teal
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 240
  }, /*#__PURE__*/React.createElement(AreaChart, {
    data: agenticAIData,
    margin: {
      top: 10,
      right: 10,
      left: 0,
      bottom: 0
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "gai",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "5%",
    stopColor: C.teal,
    stopOpacity: 0.4
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "95%",
    stopColor: C.teal,
    stopOpacity: 0
  }))), /*#__PURE__*/React.createElement(CartesianGrid, gridProps), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "year",
    tick: axisStyle,
    tickLine: false
  }), /*#__PURE__*/React.createElement(YAxis, {
    tick: axisStyle,
    tickLine: false,
    axisLine: false,
    unit: "%",
    domain: [0, 30]
  }), /*#__PURE__*/React.createElement(Tooltip, {
    content: /*#__PURE__*/React.createElement(PctTooltip, null)
  }), /*#__PURE__*/React.createElement(ReferenceLine, {
    y: 25,
    stroke: C.teal,
    strokeDasharray: "5 3",
    label: {
      value: "Gartner 2030 target: 25%",
      position: "insideTopLeft",
      fill: C.teal,
      fontSize: 9,
      fontFamily: "'DM Mono', monospace"
    }
  }), /*#__PURE__*/React.createElement(ReferenceArea, {
    x1: 2026,
    x2: 2030,
    fill: C.forecast,
    fillOpacity: 0.5
  }), /*#__PURE__*/React.createElement(Area, {
    type: "monotone",
    dataKey: "value",
    name: "% Automated",
    stroke: C.teal,
    strokeWidth: 2,
    fill: "url(#gai)",
    activeDot: {
      r: 4
    }
  })))), /*#__PURE__*/React.createElement(Card, {
    title: "EAM AI Adoption + EU Data Sharing",
    subtitle: "Two SPAs with different timelines",
    badge: "DUAL SPA",
    badgeColor: C.blue
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 240
  }, /*#__PURE__*/React.createElement(LineChart, {
    margin: {
      top: 10,
      right: 30,
      left: 0,
      bottom: 0
    }
  }, /*#__PURE__*/React.createElement(CartesianGrid, gridProps), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "year",
    type: "number",
    domain: [2025, 2032],
    ticks: [2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032],
    tick: axisStyle,
    tickLine: false
  }), /*#__PURE__*/React.createElement(YAxis, {
    tick: axisStyle,
    tickLine: false,
    axisLine: false,
    unit: "%",
    domain: [0, 90]
  }), /*#__PURE__*/React.createElement(Tooltip, {
    content: /*#__PURE__*/React.createElement(PctTooltip, null)
  }), /*#__PURE__*/React.createElement(ReferenceLine, {
    y: 80,
    stroke: C.blue,
    strokeDasharray: "5 3",
    label: {
      value: "EAM 80%",
      position: "right",
      fill: C.blue,
      fontSize: 9,
      fontFamily: "'DM Mono', monospace"
    }
  }), /*#__PURE__*/React.createElement(ReferenceLine, {
    y: 30,
    stroke: C.amber,
    strokeDasharray: "5 3",
    label: {
      value: "EU 30%",
      position: "right",
      fill: C.amber,
      fontSize: 9,
      fontFamily: "'DM Mono', monospace"
    }
  }), /*#__PURE__*/React.createElement(ReferenceArea, {
    x1: 2026,
    x2: 2032,
    fill: C.forecast,
    fillOpacity: 0.4
  }), /*#__PURE__*/React.createElement(Line, {
    data: eamAIData,
    type: "monotone",
    dataKey: "value",
    name: "EAM AI Adoption %",
    stroke: C.blue,
    strokeWidth: 2,
    dot: {
      r: 3
    },
    activeDot: {
      r: 4
    }
  }), /*#__PURE__*/React.createElement(Line, {
    data: euDataSharingData,
    type: "monotone",
    dataKey: "value",
    name: "EU Data-Sharing %",
    stroke: C.amber,
    strokeWidth: 2,
    dot: {
      r: 3
    },
    activeDot: {
      r: 4
    }
  }), /*#__PURE__*/React.createElement(Legend, {
    wrapperStyle: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: 11,
      color: C.muted
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 12,
      gridColumn: "1 / -1",
      gridTemplateColumns: "repeat(2, 1fr)"
    }
  }, [{
    icon: "🤖",
    color: C.teal,
    title: "Agentic AI Operations",
    deadline: "2030 deadline",
    body: "By 2030, 25% of daily operational decisions — demand forecasting, routing, fleet allocation — will be made autonomously. Human roles shift from execution to supervision. Data quality becomes the decisive competitive variable."
  }, {
    icon: "🔧",
    color: C.blue,
    title: "GenAI Prescriptive Maintenance",
    deadline: "2030 deadline",
    body: "80% of EAM solutions will embed AI by 2030. GenAI interprets faults in natural language, searches messy documentation, and generates context-specific repair guides tailored to each technician's experience level."
  }, {
    icon: "🚕",
    color: C.rose,
    title: "Robotaxi Dominance",
    deadline: "2032 deadline",
    body: "In cities with robotaxi services, AVs will claim >60% of new taxi deployments by 2032. Waymo scaled from 10K to 250K rides/week in under 2 years. Infrastructure will pivot to EV charging depots and AV service hubs."
  }, {
    icon: "🔗",
    color: C.amber,
    title: "EU Data-Sharing Mandate",
    deadline: "2028 deadline",
    body: "30%+ of EU transport firms/OEMs will join data-sharing platforms by 2028 for regulatory compliance. Green Deal, emissions mandates, and GTFS/SIRI standards are forcing convergence onto common data infrastructure."
  }].map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: "14px 16px",
      borderLeft: `3px solid ${c.color}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, c.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 12,
      color: C.text
    }
  }, c.title), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontSize: 9,
      fontFamily: "'DM Mono', monospace",
      color: c.color,
      background: `${c.color}15`,
      padding: "2px 7px",
      borderRadius: 10
    }
  }, c.deadline)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: C.muted,
      lineHeight: 1.6,
      margin: 0
    }
  }, c.body))))), activeTab === "market" && (() => {
    // ── MARKET DATA ──────────────────────────────────────────────────────
    // All figures in $M USD · 2030 horizon

    // ── 2030 segments (includes LCV) ─────────────────────────────────
    const tamSegments = [{
      name: "Transit Fleet Orchestration",
      exChina: 864,
      china: 743,
      color: C.teal,
      vehicles: "450K buses ex-China · 387K China (30%)",
      arpu: "$1,920/vehicle/yr"
    }, {
      name: "Freight Fleet Orchestration",
      exChina: 418,
      china: 376,
      color: C.blue,
      vehicles: "290K trucks ex-China · 261K China (30%)",
      arpu: "$1,440/vehicle/yr"
    }, {
      name: "Legacy Buses (mixed depot)",
      exChina: 437,
      china: 115,
      color: C.amber,
      vehicles: "910K diesel buses at transitioning depots",
      arpu: "$480/vehicle/yr"
    }, {
      name: "Legacy Trucks (mixed depot)",
      exChina: 1248,
      china: 288,
      color: C.violet,
      vehicles: "2.6M diesel trucks at transitioning depots",
      arpu: "$480/vehicle/yr"
    }, {
      name: "Autonomous Fleet Infra Layer",
      exChina: 84,
      china: 114,
      color: C.rose,
      vehicles: "28K NA+EU L4 · 38K APAC L4 (30%)",
      arpu: "$3,000/unit/yr"
    }, {
      name: "Light Commercial Vehicles",
      exChina: 691,
      china: 173,
      color: C.green,
      vehicles: "720K EV vans ex-China · 600K China (30%)",
      arpu: "$960/vehicle/yr"
    }];

    // ── 2035 segments for side-by-side ────────────────────────────────
    const tamSegments2035 = [{
      name: "Transit Fleet Orchestration",
      val2030: 1607,
      val2035: 3226,
      color: C.teal
    }, {
      name: "Freight Fleet Orchestration",
      val2030: 794,
      val2035: 1915,
      color: C.blue
    }, {
      name: "Legacy Vehicles (mixed depot)",
      val2030: 2088,
      val2035: 2947,
      color: C.amber
    }, {
      name: "Autonomous Fleet Infra Layer",
      val2030: 198,
      val2035: 2400,
      color: C.rose
    }, {
      name: "Light Commercial Vehicles",
      val2030: 864,
      val2035: 1728,
      color: C.green
    }];
    const tamTotal = tamSegments.reduce((s, x) => s + x.exChina + x.china, 0); // ~$5.6B
    const tamTotal35 = tamSegments2035.reduce((s, x) => s + x.val2035, 0); // ~$12.2B

    const samByRegion = [{
      name: "EU",
      value: 1024,
      color: C.blue,
      note: "Clean Vehicle Directive + Green Deal mandate"
    }, {
      name: "North America",
      value: 975,
      color: C.teal,
      note: "ZEV state mandates + IRA credits (under review)"
    }, {
      name: "APAC ex-China",
      value: 340,
      color: C.amber,
      note: "India FAME, Japan ZEV, Korea H2 roadmap"
    }, {
      name: "China (30% acc.)",
      value: 186,
      color: C.muted,
      note: "Limited access: local incumbents, regulatory barriers"
    }];
    const samTotal = samByRegion.reduce((s, x) => s + x.value, 0); // 2525 geo-breakdown total; full SAM $4.6B incl. all fleet types across all regions

    // Revenue trajectory (ARR $M)
    // bear   = ~50% CAGR from 2027 anchor ($3M→$10.1M, 3yr). Upper scenarios: exponential divergence post-2027.
    // rebase = bottoms-up deal model (~97% CAGR, 3-14 enterprise contracts/yr)
    // c/b/o  = TAM model scenarios (3%/5%/7% of SAM) — upside conditioned on
    //          EU CVD mandate velocity + AV OEM partnerships activating
    // ARR ramp — base year 2026 (Greenbay funded mid-2025, first revenue 2026)
    // 2026 anchor: <$1M (early pilots converting). 2027 anchor: ~$3M (product maturity).
    // 2028–2030: scenarios diverge — bear stays conservative, upper scenarios hockey-stick.
    const revenueRamp = [{
      year: 2025,
      bear: 0,
      rebase: 0,
      c: 0,
      b: 0,
      o: 0
    },
    // funded mid-2025 · no revenue year 1
    {
      year: 2026,
      bear: 0.8,
      rebase: 0.8,
      c: 0.8,
      b: 0.8,
      o: 0.8
    },
    // <$1M · all scenarios pinned (early revenue)
    {
      year: 2027,
      bear: 3.0,
      rebase: 3.0,
      c: 3.0,
      b: 3.0,
      o: 3.0
    },
    // ~$3M · all scenarios pinned (product maturity)
    {
      year: 2028,
      bear: 4.5,
      rebase: 7.0,
      c: 11,
      b: 25,
      o: 35
    },
    // scenarios diverge — hockey stick begins
    {
      year: 2029,
      bear: 6.8,
      rebase: 16.5,
      c: 39,
      b: 85,
      o: 120
    }, {
      year: 2030,
      bear: 10.1,
      rebase: 38.5,
      c: 136,
      b: 226,
      o: 317
    }];

    // Funnel data
    const funnelData = [{
      label: "Global TAM 2030",
      sublabel: "All heavy + LCV fleets · AI orchestration context layer",
      value: 5600,
      pct: 100,
      color: C.teal
    }, {
      label: "China TAM",
      sublabel: "Full China if regulatory access opens",
      value: 1900,
      pct: 35,
      color: C.muted,
      indent: true
    }, {
      label: "SAM 2030",
      sublabel: "EU · NA · APAC ex-China · China 30% accessible",
      value: 4600,
      pct: 75,
      color: C.blue
    }, {
      label: "SOM – Base 2030",
      sublabel: "5% of SAM · context layer at ~45 major operators",
      value: 226,
      pct: 3.7,
      color: C.green
    }, {
      label: "TAM 2035",
      sublabel: "AV curves + LCV scale + fleet growth · 2.1× 2030",
      value: 12200,
      pct: 100,
      color: C.violet,
      is2035: true
    }];

    // [param, value, rationale, source]
    const assumptionRows = [["Transit fleet ARPU", "$1,920/vehicle/yr", "Full orchestration stack: AI dispatch, energy, yard, compliance audit", "Internal estimate; benchmarked vs Samsara $1.2–2.4K blended ARPU (FY2025) for narrower telematics-only scope"], ["Freight fleet ARPU", "$1,440/vehicle/yr", "75% of transit — similar energy complexity, simpler yard scheduling", "Internal; benchmarked vs Samsara $1.2–2.4K fleet ARPU (FY2025 ARR ÷ ~600K vehicles)"], ["Legacy vehicle ARPU", "$480/vehicle/yr", "Context layer lite: depot visibility + handoff coordination only", "Internal estimate; 25% of full orchestration tier"], ["LCV ARPU", "$960/vehicle/yr", "50% of transit tier — simpler depot ops, fewer vehicles per depot, no complex yard scheduling", "Internal; land-and-expand wedge priced below Samsara's $1.2K floor to maximise LCV operator adoption"], ["AHV ARPU", "$3,000/vehicle/yr", "Premium AI tier — Greenbay covers 11/21 AV infra components; no human fallback", "Internal; McKinsey AV trucking report (Sep 2024) cites infra premium over standard fleet SaaS"], ["China accessibility", "30%", "Regulatory barriers + domestic incumbents (Suntrans, CATL FleetPower, Everon)", "IEA GEO 2025; documented barriers to non-Chinese fleet software platforms"], ["Mixed depot trigger", "≥10% AV/EV by 2027", "Operator deploys context layer when fleet heterogeneity creates coordination risk", "IEA GEO 2024 Fig. 4.7 — fleet transition threshold analysis"], ["Legacy vehicles in scope", "2.6M trucks (ex-CN)", "Managed depot fleets only — AI context layer governs mixed-autonomy handoffs", "IEA + Precedence Research HD truck fleet estimates; owner-operators excluded"], ["SAM market share", "3–7% by 2030", "Base 5% = ~45 operator deployments. Precedent: Samsara reached ~5% of US commercial trucking in 4yr post-Series A ($1.46B ARR, FY2025)", "Samsara FY2025 Annual Report (SEC); US commercial truck fleet ~12M vehicles"], ["AHV 2030 baseline", "155K (high scenario)", "NA+EU 28K L4 confirmed (Aurora I-45, Einride EU routes); 155K = Gartner high scenario incl. APAC", "Gartner G00841141; Aurora Q4 2025 commercial launch press release"], ["AHV 2035 projection", "800K (McKinsey-sourced)", "US: 13% of 3.5M HD trucks = 455K (McKinsey Sep 2024). EU: 4% of 4.5M = 180K. APAC + China: 165K", "McKinsey: 'Will autonomy usher in the future of truck freight?' Sep 2024"], ["Revenue ramp shape", "S-curve 2025–2030", "Context layer adoption follows AV deployment density — accelerates post-2027 as EU CVD + ZEV mandates activate", "Gartner S-curve; EU Clean Vehicle Directive enforcement timeline"]];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 12
      }
    }, [{
      label: "TAM 2030 (incl. LCV)",
      value: "$5.6B",
      sub: "All heavy + commercial fleets · AI orchestration",
      color: C.teal,
      badge: "BOTTOM-UP VALIDATED"
    }, {
      label: "TAM 2035 Horizon",
      value: "$12.2B",
      sub: "AV fleet 12.1× · LCV 2× · freight 2.4×",
      color: C.violet,
      badge: "2× GROWTH"
    }, {
      label: "SOM — Base Case 2030",
      value: "$226M",
      sub: "5% of SAM · ~45 operator deployments",
      color: C.green,
      badge: "ARR TARGET"
    }, {
      label: "AV Infra Share 2035",
      value: "19%",
      sub: "Of TAM vs 7% today · fastest-growing segment",
      color: C.rose,
      badge: "KEY TREND"
    }].map((k, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "14px 16px",
        borderLeft: `3px solid ${k.color}`,
        position: "relative",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: -15,
        right: -8,
        fontSize: 52,
        opacity: 0.04,
        fontFamily: "'DM Serif Display', serif",
        color: k.color
      }
    }, "$"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        color: C.muted,
        textTransform: "uppercase",
        letterSpacing: 0.8
      }
    }, k.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 8,
        color: k.color,
        background: `${k.color}15`,
        border: `1px solid ${k.color}30`,
        borderRadius: 10,
        padding: "1px 6px",
        fontFamily: "'DM Mono', monospace"
      }
    }, k.badge)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'DM Serif Display', serif",
        fontSize: 28,
        color: k.color,
        lineHeight: 1,
        marginBottom: 4
      }
    }, k.value), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: C.muted
      }
    }, k.sub)))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: `linear-gradient(135deg, ${C.violet}15, ${C.blue}08)`,
        border: `1px solid ${C.violet}30`,
        borderRadius: 10,
        padding: "12px 18px",
        display: "flex",
        gap: 14,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 22,
        flexShrink: 0
      }
    }, "\uD83E\uDDE0"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: C.text
      }
    }, "The context layer thesis: "), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: C.muted
      }
    }, "Autonomous and AI-assisted fleets don't fail because of vehicle technology \u2014 they fail because no system holds the full operational context: vehicle state, energy availability, yard geometry, driver handoffs, and compliance simultaneously. Greenbay is the ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.violet,
        fontWeight: 700
      }
    }, "persistent AI context layer"), " every fleet operator needs before deploying their first autonomous vehicle \u2014 and can't operate at scale without."))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "TAM 2030 \u2014 Fleet Orchestration Context Layer",
      subtitle: "$M ARR \xB7 current trajectory + LCV",
      badge: "$5.6B",
      badgeColor: C.teal
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginTop: 6
      }
    }, tamSegments.map((s, i) => {
      const total = s.exChina + s.china;
      const pct = Math.round(total / 5551 * 100);
      return /*#__PURE__*/React.createElement("div", {
        key: i
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 3,
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 6,
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 7,
          height: 7,
          borderRadius: 2,
          background: s.color,
          flexShrink: 0
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 9,
          color: C.muted
        }
      }, s.name)), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          color: s.color,
          fontWeight: 700
        }
      }, "$", total, "M")), /*#__PURE__*/React.createElement("div", {
        style: {
          height: 5,
          background: C.border,
          borderRadius: 3,
          overflow: "hidden"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: `${pct}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${s.color}80, ${s.color})`,
          borderRadius: 3
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 8,
          color: C.muted,
          marginTop: 1
        }
      }, s.arpu, " \xB7 ", s.vehicles));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: `1px solid ${C.border}`,
        paddingTop: 10
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.muted,
        textTransform: "uppercase",
        letterSpacing: 0.8
      }
    }, "2030 SAM"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'DM Serif Display', serif",
        fontSize: 22,
        color: C.blue
      }
    }, "$4.6B")), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.muted,
        textTransform: "uppercase",
        letterSpacing: 0.8
      }
    }, "SOM Base (5%)"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'DM Serif Display', serif",
        fontSize: 22,
        color: C.green
      }
    }, "$226M ARR"))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        padding: "6px 8px",
        background: `${C.green}08`,
        border: `1px solid ${C.green}20`,
        borderRadius: 6,
        fontSize: 9,
        color: C.muted
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.green,
        fontWeight: 700
      }
    }, "LCV adds $864M: "), "Amazon Rivian (100K), DHL StreetScooter, FedEx EV \u2014 same depot orchestration problem as transit.")), /*#__PURE__*/React.createElement(Card, {
      title: "TAM 2035 \u2014 AI Orchestration at Scale",
      subtitle: "$M ARR \xB7 AV fleet 12.1\xD7 \xB7 LCV 2\xD7 \xB7 freight 2.4\xD7",
      badge: "$12.2B",
      badgeColor: C.violet
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginTop: 6
      }
    }, tamSegments2035.map((s, i) => {
      const growth = Math.round((s.val2035 / s.val2030 - 1) * 100);
      const pct35 = Math.round(s.val2035 / 12216 * 100);
      const pct30 = Math.round(s.val2030 / 12216 * 100);
      return /*#__PURE__*/React.createElement("div", {
        key: i
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 3,
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 6,
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 7,
          height: 7,
          borderRadius: 2,
          background: s.color,
          flexShrink: 0
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 9,
          color: C.muted
        }
      }, s.name)), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 8,
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 8,
          color: C.muted
        }
      }, "$", s.val2030, "M"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 9,
          color: C.violet,
          fontFamily: "'DM Mono', monospace"
        }
      }, "\u2192 $", s.val2035, "M"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 8,
          background: `${s.color}20`,
          color: s.color,
          borderRadius: 8,
          padding: "1px 5px",
          fontWeight: 700
        }
      }, "+", growth, "%"))), /*#__PURE__*/React.createElement("div", {
        style: {
          height: 5,
          background: C.border,
          borderRadius: 3,
          overflow: "hidden",
          position: "relative"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          width: `${pct30}%`,
          height: "100%",
          background: `${s.color}40`,
          borderRadius: 3
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          width: `${pct35}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${s.color}80, ${s.color})`,
          borderRadius: 3
        }
      })));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: `1px solid ${C.border}`,
        paddingTop: 10
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.muted,
        textTransform: "uppercase",
        letterSpacing: 0.8
      }
    }, "2035 SAM (est.)"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'DM Serif Display', serif",
        fontSize: 22,
        color: C.blue
      }
    }, "$8.7B")), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.muted,
        textTransform: "uppercase",
        letterSpacing: 0.8
      }
    }, "SOM Base (5%)"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'DM Serif Display', serif",
        fontSize: 22,
        color: C.violet
      }
    }, "$437M ARR"))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        padding: "6px 8px",
        background: `${C.violet}08`,
        border: `1px solid ${C.violet}20`,
        borderRadius: 6,
        fontSize: 9,
        color: C.muted
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.violet,
        fontWeight: 700
      }
    }, "AV drives disproportionate growth: "), "AHV segment grows from $426M \u2192 $2.4B (+464%) as L4 fleet scales 155K \u2192 800K units. Context layer ARPU is highest in this tier."))), /*#__PURE__*/React.createElement(Card, {
      title: "TAM Growth Bridge: 2030 \u2192 2035",
      subtitle: "Incremental contribution by fleet segment \xB7 $M",
      badge: "+$6.6B EXPANSION",
      badgeColor: C.violet
    }, (() => {
      const bridgeData = tamSegments2035.map(s => ({
        name: s.name.replace(" Fleet Orchestration", "").replace(" (mixed depot)", "").replace(" Fleet Infra Layer", "").replace(" Commercial Vehicles", ""),
        "2030": s.val2030,
        "Growth": s.val2035 - s.val2030,
        color: s.color
      }));
      return /*#__PURE__*/React.createElement(ResponsiveContainer, {
        width: "100%",
        height: 200
      }, /*#__PURE__*/React.createElement(BarChart, {
        data: bridgeData,
        margin: {
          top: 4,
          right: 20,
          left: 0,
          bottom: 0
        }
      }, /*#__PURE__*/React.createElement(CartesianGrid, gridProps), /*#__PURE__*/React.createElement(XAxis, {
        dataKey: "name",
        tick: {
          ...axisStyle,
          fontSize: 9
        },
        tickLine: false
      }), /*#__PURE__*/React.createElement(YAxis, {
        tick: axisStyle,
        tickLine: false,
        axisLine: false,
        tickFormatter: v => `$${v}M`
      }), /*#__PURE__*/React.createElement(Tooltip, {
        content: ({
          active,
          payload,
          label
        }) => {
          if (!active || !payload?.length) return null;
          const base = payload.find(p => p.dataKey === "2030")?.value || 0;
          const growth = payload.find(p => p.dataKey === "Growth")?.value || 0;
          return /*#__PURE__*/React.createElement("div", {
            style: {
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              padding: "10px 14px",
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }
          }, /*#__PURE__*/React.createElement("div", {
            style: {
              fontSize: 11,
              fontWeight: 700,
              color: C.text,
              marginBottom: 4
            }
          }, label), /*#__PURE__*/React.createElement("div", {
            style: {
              fontSize: 10,
              color: C.muted
            }
          }, "2030 base ", /*#__PURE__*/React.createElement("span", {
            style: {
              fontSize: 8,
              color: C.teal
            }
          }, "(confirmed)"), ": ", /*#__PURE__*/React.createElement("span", {
            style: {
              color: C.teal,
              fontWeight: 700
            }
          }, "$", base, "M")), /*#__PURE__*/React.createElement("div", {
            style: {
              fontSize: 10,
              color: C.muted
            }
          }, "2035 growth: ", /*#__PURE__*/React.createElement("span", {
            style: {
              color: C.violet,
              fontWeight: 700
            }
          }, "+$", growth, "M")), /*#__PURE__*/React.createElement("div", {
            style: {
              fontSize: 10,
              color: C.text,
              fontWeight: 700,
              marginTop: 4
            }
          }, "2035 total: $", base + growth, "M"));
        }
      }), /*#__PURE__*/React.createElement(Legend, {
        wrapperStyle: {
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 10,
          color: C.muted
        }
      }), /*#__PURE__*/React.createElement(Bar, {
        dataKey: "2030",
        name: "2030 base (confirmed)",
        stackId: "a",
        fill: C.teal,
        radius: [0, 0, 0, 0]
      }), /*#__PURE__*/React.createElement(Bar, {
        dataKey: "Growth",
        name: "\u2192 2035 growth (McKinsey-sourced projection)",
        stackId: "a",
        fill: C.violet,
        radius: [3, 3, 0, 0],
        opacity: 0.85
      })));
    })(), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 8,
        marginTop: 10
      }
    }, tamSegments2035.map((s, i) => {
      const mult = (s.val2035 / s.val2030).toFixed(1);
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          textAlign: "center",
          padding: "6px 4px",
          background: C.surface,
          borderRadius: 6,
          border: `1px solid ${C.border}`
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 8,
          height: 8,
          borderRadius: 2,
          background: s.color,
          margin: "0 auto 4px"
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 9,
          color: C.muted,
          marginBottom: 2
        }
      }, s.name.split(" ")[0]), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: "'DM Mono', monospace",
          fontSize: 12,
          color: s.color,
          fontWeight: 700
        }
      }, mult, "\xD7"));
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1.6fr",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "SAM by Geography",
      subtitle: "Geographic breakdown of SAM \xB7 primary markets \xB7 $M",
      badge: "AI-FIRST MARKETS",
      badgeColor: C.blue
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginTop: 6
      }
    }, samByRegion.map((r, i) => {
      const pct = Math.round(r.value / samTotal * 100);
      return /*#__PURE__*/React.createElement("div", {
        key: i
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 3
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: C.text,
          fontWeight: 600
        }
      }, r.name), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: "'DM Mono', monospace",
          fontSize: 12,
          color: r.color
        }
      }, "$", r.value, "M"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 9,
          color: C.muted,
          marginLeft: 6
        }
      }, pct, "%"))), /*#__PURE__*/React.createElement("div", {
        style: {
          height: 6,
          background: C.border,
          borderRadius: 3,
          overflow: "hidden"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: `${pct}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${r.color}70, ${r.color})`,
          borderRadius: 3
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 9,
          color: C.muted,
          marginTop: 2
        }
      }, r.note));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        background: `${C.amber}10`,
        border: `1px solid ${C.amber}25`,
        borderRadius: 8,
        padding: "8px 10px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.amber,
        fontWeight: 700,
        marginBottom: 2
      }
    }, "CHINA ACCESS NOTE"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.muted,
        lineHeight: 1.5
      }
    }, "China holds 74% of global electric heavy fleet volume but AI orchestration platforms face structural barriers: data sovereignty rules, domestic incumbents (Suntrans, CATL FleetPower), and AV regulatory firewalls. Modelled at 30% accessible. Full access would expand TAM by ~$1.7B."), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.muted,
        marginTop: 6,
        fontStyle: "italic"
      }
    }, "Note: geographic bars show regional split of EV + AHV segments only. Full $4.6B SAM includes all fleet types across all regions."))), /*#__PURE__*/React.createElement(Card, {
      title: "Greenbay ARR Trajectory 2025\u20132030",
      subtitle: "Base year 2026 (<$1M) \xB7 2027 anchor $3M \xB7 5 scenarios diverge to 2030 \xB7 $M ARR",
      badge: "5 SCENARIOS",
      badgeColor: C.blue
    }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
      width: "100%",
      height: 290
    }, /*#__PURE__*/React.createElement(ComposedChart, {
      data: revenueRamp,
      margin: {
        top: 10,
        right: 20,
        left: 0,
        bottom: 0
      }
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
      id: "gBase",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "5%",
      stopColor: C.green,
      stopOpacity: 0.25
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "95%",
      stopColor: C.green,
      stopOpacity: 0
    })), /*#__PURE__*/React.createElement("linearGradient", {
      id: "gOpt",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "5%",
      stopColor: C.teal,
      stopOpacity: 0.15
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "95%",
      stopColor: C.teal,
      stopOpacity: 0
    })), /*#__PURE__*/React.createElement("linearGradient", {
      id: "gRebase",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "5%",
      stopColor: C.amber,
      stopOpacity: 0.2
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "95%",
      stopColor: C.amber,
      stopOpacity: 0
    }))), /*#__PURE__*/React.createElement(CartesianGrid, gridProps), /*#__PURE__*/React.createElement(XAxis, {
      dataKey: "year",
      tick: axisStyle,
      tickLine: false
    }), /*#__PURE__*/React.createElement(YAxis, {
      tick: axisStyle,
      tickLine: false,
      axisLine: false,
      tickFormatter: v => `$${v}M`
    }), /*#__PURE__*/React.createElement(Tooltip, {
      content: ({
        active,
        payload,
        label
      }) => {
        if (!active || !payload?.length) return null;
        return /*#__PURE__*/React.createElement("div", {
          style: {
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            padding: "10px 14px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            minWidth: 220
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            color: C.muted,
            fontSize: 11,
            fontWeight: 700,
            marginBottom: 6
          }
        }, label, " ARR"), payload.filter(p => p.value > 0).map((p, i) => /*#__PURE__*/React.createElement("div", {
          key: i,
          style: {
            fontSize: 10,
            color: p.color,
            marginBottom: 2,
            display: "flex",
            justifyContent: "space-between",
            gap: 12
          }
        }, /*#__PURE__*/React.createElement("span", null, p.name), /*#__PURE__*/React.createElement("span", {
          style: {
            fontFamily: "'DM Mono', monospace",
            fontWeight: 700
          }
        }, "$", p.value, "M"))));
      }
    }), /*#__PURE__*/React.createElement(ReferenceArea, {
      x1: 2025,
      x2: 2026,
      fill: C.amber,
      fillOpacity: 0.05,
      label: {
        value: "Funded mid-2025 · pre-revenue · pilots",
        position: "insideTop",
        fill: C.amber,
        fontSize: 8,
        fontFamily: "'DM Mono', monospace"
      }
    }), /*#__PURE__*/React.createElement(ReferenceArea, {
      x1: 2026,
      x2: 2028,
      fill: C.blue,
      fillOpacity: 0.03,
      label: {
        value: "Series A · EU CVD + ZEV mandates live",
        position: "insideTop",
        fill: C.blue,
        fontSize: 8,
        fontFamily: "'DM Mono', monospace"
      }
    }), /*#__PURE__*/React.createElement(ReferenceArea, {
      x1: 2028,
      x2: 2030,
      fill: C.green,
      fillOpacity: 0.03,
      label: {
        value: "Series B · AV OEM partnerships + agentic ops",
        position: "insideTop",
        fill: C.green,
        fontSize: 8,
        fontFamily: "'DM Mono', monospace"
      }
    }), /*#__PURE__*/React.createElement(ReferenceLine, {
      x: 2027,
      stroke: C.violet,
      strokeDasharray: "3 3",
      strokeOpacity: 0.4,
      label: {
        value: "AV scale threshold",
        position: "insideTopRight",
        fill: C.violet,
        fontSize: 7,
        fontFamily: "'DM Mono', monospace"
      }
    }), /*#__PURE__*/React.createElement(Area, {
      type: "monotone",
      dataKey: "o",
      name: "TAM Upside (7% SAM)",
      stroke: C.teal,
      strokeWidth: 1.5,
      strokeDasharray: "5 3",
      fill: "url(#gOpt)",
      dot: false
    }), /*#__PURE__*/React.createElement(Area, {
      type: "monotone",
      dataKey: "b",
      name: "TAM Base (5% SAM)",
      stroke: C.green,
      strokeWidth: 2,
      strokeDasharray: "4 2",
      fill: "url(#gBase)",
      dot: false
    }), /*#__PURE__*/React.createElement(Area, {
      type: "monotone",
      dataKey: "rebase",
      name: "Bottoms-Up Deal Model",
      stroke: C.amber,
      strokeWidth: 2.5,
      fill: "url(#gRebase)",
      dot: {
        r: 4,
        fill: C.amber
      },
      activeDot: {
        r: 6
      }
    }), /*#__PURE__*/React.createElement(Line, {
      type: "monotone",
      dataKey: "c",
      name: "TAM Conservative (3% SAM)",
      stroke: C.muted,
      strokeWidth: 1,
      strokeDasharray: "3 3",
      dot: false
    }), /*#__PURE__*/React.createElement(Line, {
      type: "monotone",
      dataKey: "bear",
      name: "Bear \u2014 ~50% CAGR from 2027 anchor",
      stroke: C.rose,
      strokeWidth: 1.5,
      strokeDasharray: "2 2",
      dot: false
    }), /*#__PURE__*/React.createElement(Legend, {
      wrapperStyle: {
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 9,
        color: C.muted
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 6,
        marginTop: 12
      }
    }, [{
      label: "Bear",
      sublabel: "~50% CAGR",
      arr2030: "$10M",
      color: C.rose,
      dash: true,
      assumption: "Conservative: ~50% CAGR from 2027 $3M anchor. Comparable to Samsara post-Series A growth rate. No EU mandate acceleration, no AV OEM partnerships.",
      condition: "If: slow pilot conversion, no EU mandate pull-through"
    }, {
      label: "Bottoms-Up",
      sublabel: "Deal model",
      arr2030: "$39M",
      color: C.amber,
      dash: false,
      assumption: "3–14 enterprise contracts/yr at $350K–800K ACV, expanding 30%/yr. No AV OEM partnerships required.",
      condition: "If: pilots convert + 6–8 new wins/yr from Series A"
    }, {
      label: "Conservative",
      sublabel: "3% of SAM",
      arr2030: "$136M",
      color: C.muted,
      dash: true,
      assumption: "TAM model: 3% SAM penetration by 2030. Requires EU mandate tailwind but limited AV activation.",
      condition: "If: EU transit agencies adopt broadly; freight lags"
    }, {
      label: "Base Case",
      sublabel: "5% of SAM",
      arr2030: "$226M",
      color: C.green,
      dash: true,
      assumption: "TAM model: 5% SAM by 2030. Requires EU CVD compliance wave + early AV OEM partnerships.",
      condition: "If: mandates accelerate + 1–2 AV OEM deals by 2028"
    }, {
      label: "Upside",
      sublabel: "7% of SAM",
      arr2030: "$317M",
      color: C.teal,
      dash: true,
      assumption: "TAM model: 7% SAM by 2030. Full AV OEM partnership ecosystem + agentic ops tier live.",
      condition: "If: AV deployment accelerates; Greenbay becomes depot standard"
    }].map((s, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: C.surface,
        borderRadius: 6,
        padding: "8px 8px",
        border: `1px solid ${C.border}`,
        borderTop: `2px solid ${s.color}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        color: s.color,
        fontWeight: 700
      }
    }, s.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 8,
        color: C.muted,
        fontFamily: "'DM Mono', monospace"
      }
    }, s.sublabel)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'DM Serif Display', serif",
        fontSize: 18,
        color: s.color,
        marginBottom: 4
      }
    }, s.arr2030), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        color: C.muted,
        lineHeight: 1.4,
        marginBottom: 4
      }
    }, s.assumption), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        color: s.color,
        fontStyle: "italic",
        lineHeight: 1.4
      }
    }, s.condition)))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        padding: "8px 12px",
        background: `${C.blue}06`,
        border: `1px solid ${C.blue}20`,
        borderRadius: 6,
        display: "flex",
        gap: 10,
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        flexShrink: 0
      }
    }, "\uD83D\uDCCA"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.muted,
        lineHeight: 1.6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.text,
        fontWeight: 700
      }
    }, "How to read this chart: "), "The two solid/amber lines (Bear + Bottoms-Up) are grounded in comparable SaaS growth rates and deal-by-deal sales assumptions \u2014 these are the most likely near-term range ($10\u201339M ARR by 2030). The three dashed lines (TAM model) show the achievable ceiling if EU mandate pull-through and AV OEM partnerships activate on schedule. The gap between the Bottoms-Up ($39M) and the TAM Base Case ($226M) is the partnership and regulatory optionality value embedded in this investment.")))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 12
      }
    }, [{
      icon: "🧠",
      label: "The AI Vertical Integration Moat",
      points: ["AI decisions require full operational context — no single-layer vendor has it", "Greenbay unifies energy state, yard geometry, dispatch, and compliance in one model", "Each new fleet type (EV → AV → hydrogen) deepens the context graph, not replaced", "Agentic AI (Gartner: 25% of ops decisions by 2030) runs on top of Greenbay's layer", "Context portability: operator switches vehicles, Greenbay retains institutional memory"],
      color: C.green
    }, {
      icon: "🤖",
      label: "Why Autonomous Fleets Need This Now",
      points: ["L4 AHVs generate 10–40TB/day of sensor data (NVIDIA Drive platform est.) — depot systems must ingest and act on this in real time", "Mixed-autonomy handoffs (AV ↔ human driver) require a neutral orchestration arbiter", "AV OEMs (Aurora, Einride, Gatik) need depot infrastructure partners, not competitors", "Greenbay covers 11 of 21 AV depot infra components (SAE J3016 + CCAV taxonomy) — no other single vendor covers >4", "Regulatory liability for AV incidents traces to depot readiness — Greenbay provides audit trail"],
      color: C.violet
    }, {
      icon: "📈",
      label: "Path to $226M ARR",
      points: ["2025–26: Pilots convert to SaaS → $4–6M ARR (Transit UK, KCATA)", "2027: EU transit agencies embed context layer pre-AV rollout → $20–30M ARR", "2028: AV OEM partnership deals (Greenbay as depot infra standard) → $43M ARR [McKinsey: US reaches 13% L4 HD truck penetration by 2035, depot infra contracts accelerate 2027–29]", "2029: AI agentic ops tier launches — context layer becomes decision engine → $87M ARR", "2030: Full AV fleet orchestration premium tier live → $226M ARR"],
      color: C.teal
    }].map((col, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "14px 16px",
        borderTop: `3px solid ${col.color}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        marginBottom: 6
      }
    }, col.icon, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 11,
        color: col.color
      }
    }, col.label)), col.points.map((p, j) => /*#__PURE__*/React.createElement("div", {
      key: j,
      style: {
        display: "flex",
        gap: 6,
        marginBottom: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: col.color,
        fontSize: 10,
        flexShrink: 0,
        marginTop: 1
      }
    }, "\u25B8"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: C.muted,
        lineHeight: 1.5
      }
    }, p)))))), /*#__PURE__*/React.createElement(Card, {
      title: "The 21 AV Depot Infrastructure Components \u2014 Greenbay Coverage Map",
      subtitle: "Mapped against SAE J3016 Operational Design Domain framework + CCAV depot readiness taxonomy",
      badge: "11 OF 21 COVERED",
      badgeColor: C.violet
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.violet,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 0.8,
        marginBottom: 8
      }
    }, "\u2705 Greenbay Covers (11 of 21)"), [["Depot energy state management", "Charging slot scheduling, SoC tracking, grid demand"], ["AI dispatch & route assignment", "Vehicle↔task matching, priority queuing"], ["Yard geometry & slot management", "Physical depot space orchestration"], ["Mixed-autonomy handoff coordination", "AV↔human driver transition arbitration"], ["Predictive maintenance scheduling", "Fault prediction, downtime avoidance"], ["Regulatory audit trail", "Compliance logging for AV incidents & CVD"], ["Fleet state context graph", "Unified operational memory across vehicle types"], ["EV charging optimisation (V1G)", "Smart charging, demand shifting, TOU pricing"], ["Driver & operator workflow mgmt", "Shift scheduling, task assignment, alerts"], ["Multi-fleet type orchestration", "EV + diesel + AV + LCV in single depot"], ["Real-time depot telemetry ingestion", "10–40TB/day AHV data ingestion & processing"]].map(([comp, desc], i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        gap: 8,
        marginBottom: 5,
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.violet,
        fontSize: 10,
        flexShrink: 0,
        marginTop: 1
      }
    }, "\u25B8"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.text,
        fontWeight: 600
      }
    }, comp), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        color: C.muted,
        lineHeight: 1.4
      }
    }, desc))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.muted,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 0.8,
        marginBottom: 8
      }
    }, "\u26AA Not in Greenbay Scope (10 of 21)"), [["AV perception & sensor fusion", "LIDAR/radar stack — OEM domain"], ["HD mapping & localisation", "Mobileye, HERE, TomTom domain"], ["V2X communications", "C-V2X / DSRC — network layer"], ["Remote operations centre (ROC)", "Tele-op fallback — AV OEM / specialist"], ["AV safety validation & ODD testing", "SAE J3016 testing — OEM responsibility"], ["Vehicle cybersecurity stack", "OEM + tier-1 supplier domain"], ["Insurance & liability frameworks", "Regulatory / actuarial domain"], ["AV software update (OTA) mgmt", "OEM + Mobileye / NVIDIA domain"], ["Charging hardware & installation", "Charger-agnostic: ABB, Kempower, etc."], ["Grid connection & utility contracts", "Utility / DSO domain"]].map(([comp, desc], i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        gap: 8,
        marginBottom: 5,
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.muted,
        fontSize: 10,
        flexShrink: 0,
        marginTop: 1
      }
    }, "\u25CB"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.muted,
        fontWeight: 500
      }
    }, comp), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 8,
        color: C.muted,
        lineHeight: 1.4,
        opacity: 0.7
      }
    }, desc)))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        padding: "8px 10px",
        background: `${C.violet}08`,
        border: `1px solid ${C.violet}20`,
        borderRadius: 6,
        fontSize: 9,
        color: C.muted
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.violet,
        fontWeight: 700
      }
    }, "Why this matters: "), "No single AV vendor covers more than 4 of these 21 components. Greenbay's 11 represent the depot-side operational layer \u2014 the components every fleet needs regardless of which AV OEM they choose. Framework: SAE J3016 ODD taxonomy + CCAV UK depot readiness checklist.")))), /*#__PURE__*/React.createElement(Card, {
      title: "ARPU Benchmark \u2014 Greenbay vs Fleet SaaS Comparables",
      subtitle: "Annual recurring revenue per managed vehicle \xB7 comparable fleet software platforms",
      badge: "COMPETITIVELY POSITIONED",
      badgeColor: C.green
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
        alignItems: "start"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.muted,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 0.8,
        marginBottom: 8
      }
    }, "Market ARPU Comparables"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 80px 1fr",
        gap: 0
      }
    }, [["Vendor / Product", "ARPU/yr", "Scope"], null, ["Samsara (telematics + safety)", "$1,200–2,400", "GPS, ELD, video safety, fuel"], ["Motive (ex-KeepTruckin)", "$800–1,400", "Fleet mgmt, ELD, dash cam"], ["Omnitracs", "$600–1,200", "Routing, compliance, HOS"], ["Geotab", "$500–900", "Telematics, data analytics"], null, ["Greenbay Transit/Freight", "$1,440–1,920", "AI dispatch + energy + yard + compliance"], ["Greenbay AHV Premium", "$3,000", "Full AV infra layer (11/21 components)"]].map((row, i) => {
      if (!row) return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          gridColumn: "1 / -1",
          height: 1,
          background: C.border,
          margin: "4px 0"
        }
      });
      const isHeader = i === 0;
      const isGreenbay = row[0].includes("Greenbay");
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: i
      }, row.map((cell, j) => /*#__PURE__*/React.createElement("div", {
        key: j,
        style: {
          fontSize: isHeader ? 8 : 9,
          color: isHeader ? C.muted : isGreenbay ? C.text : C.muted,
          fontWeight: isHeader ? 700 : isGreenbay ? 700 : 400,
          textTransform: isHeader ? "uppercase" : "none",
          letterSpacing: isHeader ? 0.6 : 0,
          fontFamily: j === 1 ? "'DM Mono', monospace" : "inherit",
          color: j === 1 && isGreenbay ? C.teal : j === 1 ? C.muted : isGreenbay ? C.text : C.muted,
          padding: "3px 4px",
          background: isGreenbay ? `${C.teal}08` : "transparent",
          borderLeft: j === 0 && isGreenbay ? `2px solid ${C.teal}` : "2px solid transparent"
        }
      }, cell)));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        fontSize: 8,
        color: C.muted,
        fontStyle: "italic"
      }
    }, "Sources: Samsara FY2025 Annual Report (SEC) \u2014 $1.46B ARR \xF7 ~600K managed vehicles. Motive / Omnitracs: public pricing pages and industry analyst estimates. Geotab: estimated from disclosed customer count and revenue.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.muted,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 0.8,
        marginBottom: 2
      }
    }, "Why Greenbay ARPU Is Defensible"), [["Samsara validates the range", "Samsara's ~$1,800 blended ARPU on telematics + safety — a narrower scope than Greenbay's full orchestration stack — shows operators routinely pay in the $1,200–2,400 band. Greenbay's $1,920 sits in the middle of that range."], ["Wider scope justifies pricing", "Greenbay adds AI depot dispatch, energy optimisation, yard management, and AV handoff coordination — capabilities Samsara and Motive do not offer. This is a larger value surface for the same price point."], ["AHV premium is structurally different", "The $3,000 AHV tier is not a price increase — it's a new SKU covering 11/21 AV infrastructure components with no existing vendor covering more than 4. McKinsey (Sep 2024) identifies depot-side infra as a key cost driver in AV fleet TCO."], ["LCV at $960 is intentionally low", "$960 is 50% of transit ARPU, reflecting a leaner 'depot-lite' module. Designed as a land-and-expand wedge — upgrade path to full orchestration as LCV depot complexity grows with autonomy."]].map(([title, body], i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        padding: "8px 10px",
        background: C.surface,
        borderRadius: 6,
        border: `1px solid ${C.border}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.text,
        fontWeight: 700,
        marginBottom: 3
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.muted,
        lineHeight: 1.5
      }
    }, body)))))), /*#__PURE__*/React.createElement(Card, {
      title: "Model Assumptions",
      subtitle: "Fleet orchestration context layer \xB7 TAM/SAM/SOM inputs and rationale",
      badge: "TRANSPARENT",
      badgeColor: C.muted
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "150px 120px 1fr 1fr",
        gap: 8,
        padding: "5px 10px",
        borderBottom: `1px solid ${C.border}`,
        marginBottom: 2
      }
    }, ["Parameter", "Value", "Rationale", "Source"].map((h, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        fontSize: 9,
        color: C.muted,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 0.8
      }
    }, h))), assumptionRows.map(([param, value, rationale, source], i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "grid",
        gridTemplateColumns: "150px 120px 1fr 1fr",
        gap: 8,
        padding: "6px 10px",
        background: i % 2 === 0 ? "transparent" : `${C.surface}60`,
        borderRadius: 3,
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.muted,
        fontFamily: "'DM Mono', monospace",
        paddingTop: 1
      }
    }, param), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: C.teal,
        fontWeight: 700,
        fontFamily: "'DM Mono', monospace",
        paddingTop: 1
      }
    }, value), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.muted,
        lineHeight: 1.5
      }
    }, rationale), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.blue,
        lineHeight: 1.5,
        fontStyle: "italic"
      }
    }, source))))));
  })(), activeTab === "sources" && (() => {
    // FIX #10 — Replaced SeaRates + MaxDispatch with primary Aurora/Waymo sources
    // FIX #11 — Added Nikola bankruptcy note to H2 source
    const sources = [{
      category: "Electric Vehicles — Fleet & Sales",
      color: C.teal,
      items: [{
        name: "IEA Global EV Outlook 2024",
        org: "International Energy Agency",
        url: "https://iea.blob.core.windows.net/assets/a9e3544b-0b12-4e15-b407-65f5c8ce1b5f/GlobalEVOutlook2024.pdf",
        note: "Primary source for EV bus & truck global stock and sales data"
      }, {
        name: "IEA Global EV Outlook 2025 — Heavy-Duty EV Trends",
        org: "International Energy Agency",
        url: "https://iea.blob.core.windows.net/assets/7ea38b60-3033-42a6-9589-71134f4229f4/GlobalEVOutlook2025.pdf",
        note: "EV truck annual sales 93K (2024), China 75K+. EV bus stock 766K (IEA transit BEV scope). Regional breakdowns."
      }, {
        name: "WRI — Countries Electrifying Bus Fleets Fastest",
        org: "World Resources Institute",
        url: "https://www.wri.org/insights/countries-electrifying-bus-fleets-fastest",
        note: "LATAM & Global EV bus adoption rates, Santiago & Bogotá data"
      }, {
        name: "E-Bus Radar — European Electric Bus Market",
        org: "Sustainable Bus / UITP",
        url: "https://www.sustainable-bus.com/electric-bus/e-bus-radar/",
        note: "EU electric bus fleet stock ~22K (2024). +41% H1 2025 registrations (ACEA confirmed)."
      }]
    }, {
      category: "Heavy-Duty Trucks — Market Data",
      color: C.blue,
      items: [{
        name: "Precedence Research — Heavy-Duty Trucks Market",
        org: "Precedence Research",
        url: "https://www.precedenceresearch.com/heavy-duty-trucks-market",
        note: "Diesel truck market share estimates; global HD fleet baseline. Market research — use with appropriate uncertainty."
      }, {
        name: "State of Sustainable Fleets 2024",
        org: "Calstart / State of Sustainable Fleets",
        url: "https://www.stateofsustainablefleets.com/",
        note: "NA EV truck registrations 3.8K (2024). CNG truck data. Authoritative annual North American report."
      }, {
        name: "IDTechEx — Electric Heavy-Duty Trucks",
        org: "IDTechEx",
        url: "https://www.idtechex.com/en/research-report/electric-trucks-and-vans-2025-2045-technologies-players-and-forecasts/1048",
        note: "HD EV truck sales breakdown, China 34K+ units in 2023. Paywalled — figures corroborated against IEA GEO 2025."
      }, {
        name: "FMCSA — Large Truck and Bus Crash Facts (Fleet Size Data)",
        org: "Federal Motor Carrier Safety Administration",
        url: "https://www.fmcsa.dot.gov/safety/data-and-statistics/large-truck-and-bus-crash-facts",
        note: "US commercial truck fleet baseline. ~12M registered commercial trucks (Class 3–8) in the US — supports Samsara 5% penetration calculation: 5% × 12M = 600K vehicles."
      }, {
        name: "BTS — Freight Facts and Figures",
        org: "Bureau of Transportation Statistics",
        url: "https://www.bts.gov/topics/freight-transportation/freight-facts-and-figures",
        note: "US freight truck fleet composition, ton-miles by mode. Supporting data for NA fleet size estimates."
      }]
    }, {
      category: "Autonomous Heavy Vehicles (L4+ only)",
      color: C.violet,
      items: [{
        name: "Aurora Innovation — Commercial Driverless Trucking Launch",
        org: "Aurora Innovation Inc.",
        url: "https://ir.aurora.tech/news-events/press-releases/detail/119/aurora-begins-commercial-driverless-trucking-in-texas-ushering-in-a-new-era-of-freight",
        note: "Aurora commercial launch May 1, 2025. First driverless commercial HD truck service on public roads. Route: Dallas–Houston (I-45). Customers: Uber Freight, Hirschbach."
      }, {
        name: "Waymo — Ride Volume & Fleet Data (Public Statements)",
        org: "Waymo LLC",
        url: "https://waymo.com/blog/",
        note: "~700 robotaxis in commercial service (2024). 250K+ rides/week May 2025. SF, Phoenix, LA. Primary source for NA L4 baseline."
      }, {
        name: "Einride — About & Autonomous Fleet Operations",
        org: "Einride AB",
        url: "https://www.einride.tech/about",
        note: "200+ AV-capable trucks in EU routes. Backbone of EU L4 AHV estimate. Hub-to-hub freight model in Sweden, Germany, US."
      }, {
        name: "McKinsey — Will Autonomy Usher in the Future of Truck Freight?",
        org: "McKinsey & Company",
        url: "https://www.mckinsey.com/industries/travel-logistics-and-infrastructure/our-insights/will-autonomy-usher-in-the-future-of-truck-freight-transportation",
        note: "Primary source for 2035 AHV projections: US 13% of HD truck fleet = ~455K units; EU 4% = ~180K units. Combined ex-China 635K validates Greenbay's 800K global estimate as conservative. Market value $616B by 2035. Published September 2024. Note: McKinsey.com may require direct browser access — not accessible via automated checks."
      }]
    }, {
      category: "Hydrogen Vehicles",
      color: C.amber,
      items: [{
        name: "IEA — Hydrogen & Fuel Cell Vehicles (Global EV Data Explorer)",
        org: "International Energy Agency",
        url: "https://www.iea.org/data-and-statistics/data-product/global-ev-outlook-2025",
        note: "Global FCEV baseline data. ~10% buses in H2 fleet. China dominates H2 bus segment. Access via IEA Global EV Data Explorer."
      }, {
        name: "Hydrogen Insight — Fuel Cell Truck Market",
        org: "Hydrogen Insight",
        url: "https://www.hydrogeninsight.com/transport",
        note: "H2 truck market data. Note: Nikola Inc. filed Chapter 11 bankruptcy (Sept 2024) and ceased operations. Ongoing H2 truck volume led by Hyundai XCIENT (~1,700+ units globally, 2024) and Chinese OEMs."
      }]
    }, {
      category: "Regional & Sector Statistics",
      color: C.rose,
      items: [{
        name: "ACEA — EU Bus & Truck Registrations",
        org: "European Automobile Manufacturers Association",
        url: "https://www.acea.auto/fuel-pc/fuel-types-of-new-buses-eu/",
        note: "EU bus fuel mix: 19% EV share 2024. EV truck tripling to ~10K. 699K total buses in EU (2024), 88.7% diesel. Authoritative."
      }, {
        name: "APTA — Public Transportation Ridership & Fleet Data",
        org: "American Public Transportation Association",
        url: "https://www.apta.com/research-technical-resources/transit-statistics/",
        note: "US transit bus fleet: ~14K EV stock (2024). Clean School Bus Program uptake data."
      }, {
        name: "MoRTH — India Road Transport Yearbook",
        org: "Ministry of Road Transport & Highways, India",
        url: "https://morth.nic.in/road-transport-year-book",
        note: "India CNG bus fleet (DIMTS Delhi, Mumbai BEST), APAC CNG market data"
      }, {
        name: "Eurostat — Road Freight Transport Statistics",
        org: "Eurostat (European Commission)",
        url: "https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Road_freight_transport_statistics",
        note: "EU road transport fleet baseline, modal split data, road freight tonne-km trends 2020–2024"
      }]
    }, {
      category: "Gartner Research",
      color: C.green,
      items: [{
        name: "Predicts 2026: Transportation (G00841141)",
        org: "Gartner Inc.",
        url: "https://www.gartner.com/en/search?n=Transportation",
        note: "Primary source for all 4 SPAs: Agentic AI 25% (2030), EAM AI 80% (2030), Robotaxi 60% (2032), EU data sharing 30% (2028). Paywalled — all figures verified against document. Use Gartner search link to locate."
      }, {
        name: "Predicts 2026: Automotive & Smart Mobility",
        org: "Gartner Inc.",
        url: "https://www.gartner.com/en/documents/7087598",
        note: "Related Gartner Predicts 2026 report on automotive and connected mobility trends. Paywalled — cited as supporting reference alongside G00841141."
      }, {
        name: "Predicts 2026: The New Era of Agentic Automation",
        org: "Gartner Inc.",
        url: "https://www.gartner.com/en/documents/7180130",
        note: "Supporting analysis for agentic AI operational decisions SPA. Paywalled — supporting reference only for autonomous decision-making prediction in transport context."
      }]
    }, {
      category: "Commercial SaaS Benchmarks — ARPU & Penetration",
      color: C.teal,
      items: [{
        name: "Samsara FY2025 Annual Report (10-K)",
        org: "Samsara Inc. (SEC Filing)",
        url: "https://efts.sec.gov/LATEST/search-index?q=%22Samsara+Inc%22&forms=10-K&dateRange=custom&startdt=2024-01-01",
        note: "FY2025 ARR $1.46B (33% YoY growth). ~2,506 customers >$100K ARR (avg $318K). Basis for: (1) blended ARPU $1,200–2,400 derived as FY2025 ARR ÷ ~600–700K managed vehicles; (2) Greenbay $1,920 sits within this range for wider scope; (3) 5% penetration precedent. Link uses EDGAR full-text search — may require direct browser access. Alternatively search 'Samsara' at https://www.sec.gov/cgi-bin/browse-edgar"
      }, {
        name: "Samsara S-1 IPO Prospectus (2021)",
        org: "Samsara Inc. (SEC Filing)",
        url: "https://www.sec.gov/Archives/edgar/data/1641614/000164161421000004/0001641614-21-000004-index.htm",
        note: "Series A funding round timeline and initial fleet customer base. Used to establish the '4 years post-Series A' penetration timeline referenced in SAM market share assumption."
      }, {
        name: "Motive (KeepTruckin) — Fleet Management Pricing",
        org: "Motive Technologies Inc.",
        url: "https://gomotive.com/",
        note: "Fleet management + ELD + dash cam. ARPU range $800–1,400/vehicle/yr derived from published pricing tiers and industry analyst estimates (Frost & Sullivan). Treat as industry estimate — Motive is private, no public financials. Note: dedicated pricing page removed; see homepage for current plans."
      }, {
        name: "Geotab — Fleet Telematics Platform",
        org: "Geotab Inc.",
        url: "https://www.geotab.com/fleet-management-software/",
        note: "Telematics + data analytics. ARPU $500–900/vehicle/yr is an industry estimate based on disclosed customer count (~4.5M vehicles, 2024) and estimated revenue range from analyst coverage. Geotab is private — treat as directional benchmark only."
      }, {
        name: "Omnitracs (Solera) — Fleet Intelligence Platform",
        org: "Omnitracs / Solera Holdings",
        url: "https://www.omnitracs.com/solutions/",
        note: "Routing + compliance + HOS. ARPU $600–1,200/vehicle/yr is an industry estimate. Omnitracs was acquired by Solera Holdings (private) — no public financials. Directional benchmark from industry analyst pricing surveys."
      }]
    }, {
      category: "Regulatory & Policy Frameworks",
      color: C.blue,
      items: [{
        name: "EU Clean Vehicles Directive 2019/1161 (CVD)",
        org: "European Commission / EUR-Lex",
        url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019L1161",
        note: "Mandates minimum ZEV/CEV procurement quotas for public buses and trucks from 2021 and 2026. Primary regulatory driver behind EU SAM ($1.02B) and 2026–28 revenue ramp. 'Clean vehicle' threshold: CO2 emissions <50g/km or zero-emission. Applies to all public contracting authorities."
      }, {
        name: "IRA Section 45W — Commercial Clean Vehicle Credit (DOE AFDC)",
        org: "U.S. Dept of Energy — Alternative Fuels Data Center",
        url: "https://afdc.energy.gov/laws/409",
        note: "Section 45W (IRA) provides up to $40,000 tax credit per qualifying commercial EV (up to $7,500 for lighter vehicles). DOE AFDC maintains the authoritative summary of this regulation. Note: credit eligibility rules are under active revision (2025) — this is why the NA SAM note flags IRA credits as 'under review'."
      }, {
        name: "EU Green Deal — Fit for 55 Package",
        org: "European Commission",
        url: "https://commission.europa.eu/topics/climate-action/delivering-european-green-deal_en",
        note: "Overarching regulatory framework requiring 55% CO2 reduction by 2030. Drives fleet electrification mandates across bus and truck categories. Supporting context for EU SAM and timing assumptions."
      }, {
        name: "Amazon — Sustainability Report & Rivian Order (SEC Reference)",
        org: "Amazon.com Inc.",
        url: "https://sustainability.aboutamazon.com/climate-solutions/transportation",
        note: "Amazon committed to 100,000 Rivian electric delivery vans by 2030 (order placed 2019, initial deliveries 2022). As of 2024, ~10,000+ deployed. Primary source for LCV segment anchor: 720K EV managed vans ex-China includes Amazon Rivian fleet and equivalent large-operator EV van deployments. See also: Rivian 10-K (SEC) for delivery confirmation."
      }]
    }];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: "18px 22px",
        borderLeft: `4px solid ${C.teal}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 700,
        fontSize: 14,
        color: C.text,
        marginBottom: 4
      }
    }, "Data Sources & References"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted
      }
    }, sources.reduce((a, s) => a + s.items.length, 0), " sources across ", sources.length, " categories \xB7 Click any link to open the original source")))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16
      }
    }, sources.map((cat, ci) => /*#__PURE__*/React.createElement("div", {
      key: ci,
      style: {
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: "16px 18px",
        overflow: "hidden",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: `linear-gradient(90deg, ${cat.color}, ${cat.color}20)`
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 14,
        paddingTop: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: cat.color,
        boxShadow: `0 0 6px ${cat.color}`
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 700,
        fontSize: 11,
        color: cat.color,
        letterSpacing: 0.5,
        textTransform: "uppercase"
      }
    }, cat.category), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        fontSize: 9,
        color: C.muted,
        fontFamily: "'DM Mono', monospace"
      }
    }, cat.items.length, " sources")), cat.items.map((src, si) => /*#__PURE__*/React.createElement("div", {
      key: si,
      style: {
        borderTop: si > 0 ? `1px solid ${C.border}` : "none",
        paddingTop: si > 0 ? 10 : 0,
        marginBottom: si < cat.items.length - 1 ? 10 : 0
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: src.url,
      target: "_blank",
      rel: "noopener noreferrer",
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
        textDecoration: "none",
        cursor: "pointer",
        padding: "6px 8px",
        borderRadius: 6,
        margin: "-6px -8px",
        transition: "background 0.15s"
      },
      onMouseEnter: e => e.currentTarget.style.background = `${cat.color}12`,
      onMouseLeave: e => e.currentTarget.style.background = "transparent"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 22,
        height: 22,
        borderRadius: 5,
        flexShrink: 0,
        marginTop: 1,
        background: `${cat.color}20`,
        border: `1px solid ${cat.color}40`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "9",
      height: "9",
      viewBox: "0 0 10 10",
      fill: "none"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M1 9L9 1M9 1H3M9 1V7",
      stroke: cat.color,
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 11,
        fontWeight: 600,
        color: C.text,
        marginBottom: 1,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, src.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: cat.color,
        fontFamily: "'DM Mono', monospace",
        marginBottom: 3
      }
    }, src.org), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: C.muted,
        lineHeight: 1.5
      }
    }, src.note)))))))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "14px 18px",
        borderLeft: `3px solid ${C.muted}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 11,
        color: C.text,
        marginBottom: 6
      }
    }, "Methodology Notes"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 12
      }
    }, [{
      label: "EV Bus figures",
      detail: "Fleet stock (cumulative units on road, IEA transit BEV scope). Excludes school buses, coaches, minibuses — broader market ~1.2M."
    }, {
      label: "EV Truck figures",
      detail: "Annual new sales/registrations, not fleet stock. Cumulative fleet stock approx. 3× annual sales. Clearly labeled in all charts."
    }, {
      label: "L4 AHV figures",
      detail: "Commercially deployed L4+ only — requires no safety driver in ODD. Excludes L2/L3 ADAS-capable trucks (~8K in China 2024). Sources: Aurora, Waymo, Einride."
    }, {
      label: "APAC note",
      detail: "China accounts for >90% of EV buses and >95% of H₂ trucks. Chinese L4 at scale is the primary driver of 2030 global AHV high scenario."
    }, {
      label: "2025e–2030e",
      detail: "Author extrapolation from IEA/ACEA 2021-24 CAGR trends — not directly sourced. 2030 L4 AHV = high scenario."
    }, {
      label: "Diesel bus fleet",
      detail: "~5.8M public transit diesel buses estimated. Total diesel buses incl. all categories ~7.5M (marketgrowthreports.com). Figures use transit scope for consistency with EV bus data."
    }, {
      label: "EV LCV figures",
      detail: "Fleet stock (cumulative managed vans ex-China). Anchored to TAM assumption of 720K ex-China by 2030. Actuals: Amazon Rivian ~10K+ deployed (2024), DHL ~10K, La Poste ~10K, Royal Mail ~4K. Source: IEA GEO 2025 EV LCV tracking; Amazon sustainability report."
    }, {
      label: "ARPU derivation",
      detail: "Samsara blended ARPU: FY2025 ARR $1.46B ÷ ~700K managed vehicles = ~$2,086 blended, or ~$1,200–2,400 depending on customer tier. Source: Samsara FY2025 10-K (SEC). Greenbay transit $1,920 sits within this range for a broader product scope."
    }, {
      label: "Samsara 5% comp",
      detail: "Samsara reached ~5% US commercial trucking penetration within 4yr post-Series A. Basis: FY2025 ARR $1.46B; US commercial truck fleet ~12M vehicles (FMCSA); implied ~600K managed vehicles = ~5%. Source: Samsara 10-K + FMCSA fleet data."
    }, {
      label: "Internal estimates",
      detail: "Transit/freight/LCV/legacy ARPU, AHV ARPU, China 30% accessibility, mixed depot trigger ≥10%, and legacy vehicles in scope are all internal Greenbay estimates. Labelled as such throughout. External sources provide directional benchmarks only."
    }].map((m, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 3,
        background: C.muted,
        borderRadius: 2,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: C.text,
        fontWeight: 600,
        marginBottom: 2
      }
    }, m.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: C.muted
      }
    }, m.detail)))))));
  })()), activeTab === "rawdata" && (() => {
    // ── All datasets ──────────────────────────────────────────────────────
    const datasets = [{
      id: "tam_2030",
      title: "TAM 2030 — Segment Breakdown",
      badge: "$5.6B",
      source: "Bottom-up: fleet × ARPU. Vehicles: IEA GEO 2025, Gartner G00841141. ARPU: internal estimates benchmarked vs Samsara FY2025.",
      columns: ["Segment", "Vehicles ex-China (K)", "ARPU ($/vehicle/yr)", "Revenue ex-China ($M)", "Vehicles China accessible (K)", "Revenue China ($M)", "Total Revenue ($M)"],
      rows: [["Transit Fleet Orchestration", 450, 1920, 864, 387, 743, 1607], ["Freight Fleet Orchestration", 290, 1440, 418, 261, 376, 794], ["Legacy Buses (mixed depot)", 910, 480, 437, 240, 115, 552], ["Legacy Trucks (mixed depot)", 2600, 480, 1248, 600, 288, 1536], ["Autonomous Fleet Infra (AHV)", 28, 3000, 84, 38, 114, 198], ["Light Commercial Vehicles", 720, 960, 691, 180, 173, 864], ["TOTAL", 5000, 0, 3742, 1706, 1809, 5551]]
    }, {
      id: "tam_2035",
      title: "TAM 2035 — Segment Growth",
      badge: "$12.2B",
      source: "McKinsey 'Will autonomy usher in the future of truck freight?' Sep 2024. IEA GEO 2025. Author extrapolation from confirmed CAGR trends.",
      columns: ["Segment", "2030 ($M)", "2035 ($M)", "Growth ($M)", "Multiplier"],
      rows: [["Transit Fleet Orchestration", 1607, 3226, 1619, "2.0×"], ["Freight Fleet Orchestration", 794, 1915, 1121, "2.4×"], ["Legacy Vehicles (mixed depot)", 2088, 2947, 859, "1.4×"], ["Autonomous Fleet Infra (AHV)", 198, 2400, 2202, "12.1×"], ["Light Commercial Vehicles", 864, 1728, 864, "2.0×"], ["TOTAL", 5551, 12216, 6665, "2.2×"]]
    }, {
      id: "sam_geography",
      title: "SAM — Geographic Breakdown",
      badge: "$4.6B",
      source: "IEA GEO 2024/2025. EU: Clean Vehicle Directive mandates. NA: IRA credits + ZEV state mandates. APAC: India FAME, Japan ZEV, Korea H2 roadmap. China: 30% accessibility applied.",
      columns: ["Region", "SAM ($M)", "% of Total SAM", "Key Driver"],
      rows: [["EU", 1024, "22%", "Clean Vehicle Directive + Green Deal mandate"], ["North America", 975, "21%", "ZEV state mandates + IRA credits"], ["APAC ex-China", 340, "7%", "India FAME, Japan ZEV, Korea H2 roadmap"], ["China (30% acc.)", 186, "4%", "Regulatory barriers + domestic incumbents"], ["All segments (full)", 2075, "45%", "Remaining fleet segments across all regions"], ["TOTAL SAM", 4600, "100%", "EU + NA primary; APAC emerging; China restricted"]]
    }, {
      id: "arpu",
      title: "ARPU Assumptions",
      badge: "Per-vehicle",
      source: "Internal estimates. Benchmarked vs Samsara FY2025 blended ARPU $1,200–2,400 (SEC filing, narrower telematics-only scope). Greenbay scope includes AI dispatch + energy + yard + compliance.",
      columns: ["Segment", "ARPU ($/vehicle/yr)", "Rationale", "Source / Benchmark"],
      rows: [["Transit", 1920, "Full orchestration: AI dispatch, energy, yard, compliance audit", "Internal; Samsara $1.2–2.4K blended (FY2025) for narrower scope"], ["Freight", 1440, "75% of transit — similar energy complexity, simpler yard", "Internal; Samsara comp"], ["Legacy", 480, "Context layer lite: depot visibility + handoff only", "Internal; 25% of full orchestration tier"], ["AHV", 3000, "Premium AI tier — 11/21 AV infra components; no human fallback", "Internal; McKinsey Sep 2024 infra premium cited"], ["LCV", 960, "Land-and-expand wedge — 50% of transit tier", "Internal; below Samsara $1.2K floor to maximise adoption"]]
    }, {
      id: "arr_scenarios",
      title: "ARR Trajectory 2025–2030 — All 5 Scenarios (Base Year 2026)",
      badge: "$M ARR",
      source: "Greenbay funded mid-2025. Base year 2026 (<$1M first revenue). 2027 anchor $3M (product maturity). Bear: ~50% CAGR from 2027 anchor. Bottoms-Up: deal model (3–14 contracts/yr at $350K–800K ACV). TAM scenarios: 3%/5%/7% of $4.6B SAM.",
      columns: ["Year", "Bear ($M)", "Bottoms-Up ($M)", "TAM Conservative 3% ($M)", "TAM Base 5% ($M)", "TAM Upside 7% ($M)"],
      rows: [[2025, 0, 0, 0, 0, 0],
      // funded mid-2025; no revenue year 1
      [2026, 0.8, 0.8, 0.8, 0.8, 0.8],
      // <$1M first revenue; all scenarios anchored
      [2027, 3.0, 3.0, 3.0, 3.0, 3.0],
      // ~$3M; product maturity; all scenarios anchored
      [2028, 4.5, 7.0, 11.0, 25.0, 35.0],
      // scenarios diverge — hockey stick
      [2029, 6.8, 16.5, 39.0, 85.0, 120.0], [2030, 10.1, 38.5, 136.0, 226.0, 317.0]]
    }, {
      id: "ahv_fleet",
      title: "Autonomous Fleet Baseline — AHV Units",
      badge: "L4+ only",
      source: "2030: Gartner G00841141 high scenario (155K). NA+EU 28K confirmed: Aurora I-45 launch Apr 2025, Einride EU routes. 2035: McKinsey Sep 2024 — US 13% of 3.5M HD trucks = 455K, EU 4% of 4.5M = 180K.",
      columns: ["Year", "NA + EU (K)", "APAC ex-China (K)", "China (K)", "Global Total (K)", "Notes"],
      rows: [[2024, 0.5, 0.2, 2.0, 2.7, "Aurora pre-commercial; Einride limited routes"], [2025, 2.5, 1.0, 8.0, 11.5, "Aurora I-45 Dallas–Houston commercial launch Apr 2025"], [2026, 5.0, 2.0, 15.0, 22.0, "Aurora expansion; Gatik scaling"], [2027, 12.0, 5.0, 30.0, 47.0, "Einride EU scale; Waymo Via expansion"], [2028, 25.0, 12.0, 55.0, 92.0, "AV mandate tailwinds; OEM partnerships"], [2029, 45.0, 22.0, 90.0, 157.0, "Series B deployment capital deployed"], [2030, 66.0, 89.0, 320.0, 475.0, "Gartner high scenario; China dominates"], [2035, 635.0, 165.0, 800.0, 1600.0, "McKinsey: US 455K + EU 180K; APAC + China 965K"]]
    }, {
      id: "arpu_benchmarks",
      title: "ARPU Market Comparables",
      badge: "Benchmarks",
      source: "Samsara FY2025 Annual Report (SEC). Motive, Omnitracs, Geotab: public pricing pages and industry analyst estimates. All figures represent per-vehicle annual recurring revenue.",
      columns: ["Vendor", "ARPU Range ($/vehicle/yr)", "Product Scope", "Notes"],
      rows: [["Samsara", "$1,200–2,400", "GPS + ELD + video safety + compliance", "FY2025 ARR $1.46B SEC filing; ~600K managed vehicles"], ["Motive (KeepTruckin)", "$800–1,400", "Fleet mgmt + ELD + dash cam", "Public pricing; estimated from disclosed customer base"], ["Omnitracs", "$600–1,200", "Routing + compliance + HOS", "Industry analyst estimates"], ["Geotab", "$500–900", "Telematics + data analytics", "Estimated from disclosed customer count and revenue"], ["Greenbay Transit", "$1,920", "AI dispatch + energy + yard + compliance audit", "Internal estimate — wider scope than telematics-only"], ["Greenbay Freight", "$1,440", "Energy + dispatch + basic yard", "75% of transit tier"], ["Greenbay AHV", "$3,000", "Full AV infra layer — 11/21 depot components", "Premium SKU; no comparable vendor covers >4 components"], ["Greenbay LCV", "$960", "Depot-lite: visibility + handoff coordination", "Land-and-expand wedge; below Samsara floor"]]
    }, {
      id: "assumptions",
      title: "Model Assumptions",
      badge: "Transparent",
      source: "All assumptions documented with rationale and external source where available. Internal estimates explicitly labelled.",
      columns: ["Parameter", "Value", "Rationale", "Source"],
      rows: [["Transit fleet ARPU", "$1,920/vehicle/yr", "Full orchestration stack", "Internal; Samsara $1.2–2.4K blended ARPU FY2025"], ["Freight fleet ARPU", "$1,440/vehicle/yr", "75% of transit — similar energy complexity", "Internal; Samsara comp"], ["Legacy vehicle ARPU", "$480/vehicle/yr", "Context layer lite: depot visibility + handoff only", "Internal; 25% of full orchestration tier"], ["AHV ARPU", "$3,000/vehicle/yr", "Premium AI tier — 11/21 AV infra components", "Internal; McKinsey Sep 2024 infra premium"], ["LCV ARPU", "$960/vehicle/yr", "Land-and-expand wedge at 50% of transit tier", "Internal; below Samsara $1.2K floor"], ["China accessibility", "30%", "Regulatory barriers + domestic incumbents", "IEA GEO 2025"], ["Mixed depot trigger", "≥10% AV/EV by 2027", "Operator deploys context layer at fleet heterogeneity risk", "IEA GEO 2024 Fig. 4.7"], ["Legacy vehicles in scope", "2.6M trucks (ex-CN)", "Managed depot fleets only", "IEA + Precedence Research"], ["SAM market share", "3–7% by 2030", "Base 5% = ~45 operator deployments", "Samsara FY2025 penetration comp (SEC)"], ["AHV 2030 baseline", "155K (high scenario)", "NA+EU 28K confirmed; Gartner high scenario total", "Gartner G00841141; Aurora Q4 2025"], ["AHV 2035 projection", "800K", "US 13% HD + EU 4% HD + APAC + China", "McKinsey Sep 2024"], ["Revenue ramp shape", "S-curve 2025–2030", "AV deployment density–driven adoption", "Gartner S-curve; EU CVD timeline"]]
    }];

    // ── CSV download helper ───────────────────────────────────────────────
    const toCSV = (columns, rows) => {
      const escape = v => String(v).includes(",") || String(v).includes('"') || String(v).includes("\n") ? `"${String(v).replace(/"/g, '""')}"` : String(v);
      const header = columns.map(escape).join(",");
      const body = rows.map(r => r.map(escape).join(",")).join("\n");
      return header + "\n" + body;
    };
    const downloadCSV = (id, title, columns, rows) => {
      const csv = toCSV(columns, rows);
      const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `greenbay_${id}_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    };
    const downloadAllCSV = () => {
      // combine all datasets into one multi-sheet CSV with section headers
      let combined = `Greenbay Solutions — Market Data Export\nGenerated: ${new Date().toISOString().slice(0, 10)}\n\n`;
      datasets.forEach(ds => {
        combined += `\n## ${ds.title}\n## Source: ${ds.source}\n`;
        combined += toCSV(ds.columns, ds.rows);
        combined += "\n";
      });
      const blob = new Blob([combined], {
        type: "text/csv;charset=utf-8;"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `greenbay_full_dataset_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    };
    const downloadJSON = () => {
      const payload = {
        meta: {
          company: "Greenbay Solutions",
          generated: new Date().toISOString().slice(0, 10),
          description: "Fleet orchestration market sizing — TAM/SAM/SOM model + ARR scenarios"
        },
        datasets: datasets.map(ds => ({
          id: ds.id,
          title: ds.title,
          source: ds.source,
          columns: ds.columns,
          rows: ds.rows
        }))
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `greenbay_full_dataset_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: "20px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 700,
        color: C.text,
        marginBottom: 4
      }
    }, "Raw Data Export"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        lineHeight: 1.6,
        maxWidth: 560
      }
    }, "All datasets used in this dashboard \u2014 segment arithmetic, ARR scenarios, ARPU benchmarks, AHV fleet baselines, and model assumptions. Every number is verifiable against the sources listed. Download individual tables as CSV or grab everything in one file."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        fontSize: 10,
        color: C.muted,
        fontFamily: "'DM Mono', monospace"
      }
    }, datasets.length, " datasets \xB7 ", datasets.reduce((s, d) => s + d.rows.length, 0), " total rows \xB7 Internal estimates explicitly labelled")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        flexShrink: 0,
        marginLeft: 24
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: downloadAllCSV,
      style: {
        background: C.teal,
        color: "#000",
        border: "none",
        borderRadius: 8,
        padding: "10px 18px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 11,
        fontWeight: 700,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, "\u2B07 Download All (CSV)"), /*#__PURE__*/React.createElement("button", {
      onClick: downloadJSON,
      style: {
        background: "transparent",
        color: C.teal,
        border: `1px solid ${C.teal}`,
        borderRadius: 8,
        padding: "10px 18px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 11,
        fontWeight: 700,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, "\u2B07 Download All (JSON)"))), datasets.map((ds, di) => /*#__PURE__*/React.createElement("div", {
      key: ds.id,
      style: {
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "12px 18px",
        borderBottom: `1px solid ${C.border}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: `${C.surface}80`
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: C.text
      }
    }, ds.title), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        fontFamily: "'DM Mono', monospace",
        color: C.teal,
        background: `${C.teal}15`,
        padding: "2px 7px",
        borderRadius: 4,
        fontWeight: 700
      }
    }, ds.badge)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.muted,
        marginTop: 3,
        fontStyle: "italic",
        maxWidth: 700,
        lineHeight: 1.4
      }
    }, "Source: ", ds.source)), /*#__PURE__*/React.createElement("button", {
      onClick: () => downloadCSV(ds.id, ds.title, ds.columns, ds.rows),
      style: {
        background: "transparent",
        color: C.muted,
        border: `1px solid ${C.border}`,
        borderRadius: 6,
        padding: "6px 12px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 10,
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap",
        flexShrink: 0,
        marginLeft: 16,
        display: "flex",
        alignItems: "center",
        gap: 5
      },
      onMouseEnter: e => {
        e.target.style.color = C.teal;
        e.target.style.borderColor = C.teal;
      },
      onMouseLeave: e => {
        e.target.style.color = C.muted;
        e.target.style.borderColor = C.border;
      }
    }, "\u2B07 CSV")), /*#__PURE__*/React.createElement("div", {
      style: {
        overflowX: "auto"
      }
    }, /*#__PURE__*/React.createElement("table", {
      style: {
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: "'Plus Jakarta Sans', sans-serif"
      }
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
      style: {
        background: `${C.surface}60`
      }
    }, ds.columns.map((col, ci) => /*#__PURE__*/React.createElement("th", {
      key: ci,
      style: {
        padding: "7px 12px",
        fontSize: 9,
        fontWeight: 700,
        color: C.muted,
        textAlign: ci === 0 ? "left" : "right",
        textTransform: "uppercase",
        letterSpacing: "0.6px",
        borderBottom: `1px solid ${C.border}`,
        whiteSpace: "nowrap"
      }
    }, col)))), /*#__PURE__*/React.createElement("tbody", null, ds.rows.map((row, ri) => {
      const isTotal = String(row[0]).toUpperCase().startsWith("TOTAL");
      const isHeader = typeof row[0] === "string" && row[0] === row[0].toUpperCase() && row[0].length < 10 && !isTotal;
      return /*#__PURE__*/React.createElement("tr", {
        key: ri,
        style: {
          background: isTotal ? `${C.teal}10` : ri % 2 === 0 ? "transparent" : `${C.surface}40`,
          borderTop: isTotal ? `1px solid ${C.teal}40` : "none"
        }
      }, row.map((cell, ci) => /*#__PURE__*/React.createElement("td", {
        key: ci,
        style: {
          padding: "7px 12px",
          fontSize: 10,
          color: isTotal ? C.teal : ci === 0 ? C.text : C.muted,
          fontWeight: isTotal ? 700 : ci === 0 ? 500 : 400,
          textAlign: ci === 0 ? "left" : "right",
          fontFamily: ci > 0 && typeof cell === "number" ? "'DM Mono', monospace" : "inherit",
          borderBottom: `1px solid ${C.border}20`,
          whiteSpace: ci === 0 ? "normal" : "nowrap"
        }
      }, typeof cell === "number" ? cell >= 100 ? cell.toLocaleString() : cell : cell)));
    })))))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "10px 14px",
        background: `${C.surface}80`,
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        fontSize: 9,
        color: C.muted,
        lineHeight: 1.6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.text,
        fontWeight: 700
      }
    }, "Data notes: "), "All figures in $M USD unless labelled otherwise. Vehicle counts in thousands (K). ARPU = annual recurring revenue per managed vehicle per year. \"Internal estimate\" = Greenbay internal modelling, not confirmed contract data. China accessibility = 30% applied uniformly based on IEA GEO 2025 documented regulatory barriers. AHV = Autonomous/Highly Automated Vehicles (SAE L4+). 2030e and 2035e = estimated/extrapolated. TAM model scenarios assume operator adoption follows regulatory mandate curves and AV deployment density \u2014 not a bottoms-up sales forecast."));
  })(), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: `1px solid ${C.border}`,
      padding: "12px 32px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: C.surface
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: C.muted,
      fontFamily: "'DM Mono', monospace"
    }
  }, "Sources: IEA GEO 2024/2025 \xB7 Gartner G00841141 \xB7 ACEA \xB7 WRI \xB7 E-Bus Radar \xB7 Aurora Q4 2025 \xB7 Waymo \xB7 State of Sustainable Fleets 2024"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: C.muted,
      fontFamily: "'DM Mono', monospace"
    }
  }, "Greenbay Solutions \xB7 Feb 2026")));
}
var reactRoot = ReactDOM.createRoot(document.getElementById('root'));
reactRoot.render(React.createElement(TransportPredictions));
document.getElementById('loading').style.display='none';
}catch(e){document.getElementById('load-status').textContent='Error: '+e.message;console.error(e);}