import React, { useEffect, useState } from "react";
import axios from "axios";

// 🟢 Card Component at Top
function DashboardCard({ title, value, bgColor, textColor, icon }) {
  const [hover, setHover] = useState(false);

  return (
    <div className="col-sm-6 col-lg-3">
      <div
        className="text-center p-4 rounded"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          border: `1px solid ${textColor}33`,
          transform: hover ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hover
            ? "0 12px 24px rgba(0,0,0,0.08)"
            : "0 4px 14px rgba(0,0,0,0.03)",
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <i className={`${icon} mb-2`} style={{ fontSize: "28px" }}></i>
        <h5 style={{ fontSize: "17px", fontWeight: "600", marginTop: "10px" }}>{title}</h5>
        <p style={{ fontSize: "32px", fontWeight: "700", margin: 0 }}>{value}</p>
      </div>
    </div>
  );
}

// 🟡 Main Component
export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalExaminees: 0,
    totalQuestions: 0,
    totalExams: 0,
    totalSubject: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const updates = [
    "🆕 New exam module deployed",
    "🔧 Scheduled maintenance on Sunday",
    "📊 Results published for Batch A",
  ];

  // 🔄 Fetch Dashboard Data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admindashboard/");
        setDashboardData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to fetch dashboard data.");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-5">Loading dashboard...</div>;
  if (error) return <div className="p-5 text-danger">{error}</div>;

  return (
    <div className="container-fluid p-4" style={{marginLeft:"-45px", marginTop:"-20px",width:"1240px",backgroundColor: "#F4F7FB", minHeight: "100vh" }}>
      {/* 🟦 Welcome Section */}
      <div className="p-4 rounded shadow mb-5" style={{ backgroundColor: "#f5f5f5" }}>
        <h2 style={{ fontWeight: "700" }}>Welcome Back, Admin!</h2>
        <p style={{ opacity: 0.85 }}>
          Here's a quick overview of your dashboard for today.
        </p>
      </div>

      {/* 🟩 Stat Cards */}
      <div className="row g-4 mb-5">
        <DashboardCard
          icon="fas fa-users"
          title="Total Examinees"
          value={dashboardData.totalExaminees}
          bgColor="#D6EFFF"
          textColor="#1C4E80"
        />
        <DashboardCard
          icon="fas fa-question-circle"
          title="Total Questions"
          value={dashboardData.totalQuestions}
          bgColor="#FDE2E1"
          textColor="#C0392B"
        />
        <DashboardCard
          icon="fas fa-file-alt"
          title="Total Exams"
          value={dashboardData.totalExams}
          bgColor="#EADDFE"
          textColor="#8E44AD"
        />
        <DashboardCard
          icon="fas fa-book"
          title="Total Subjects"
          value={dashboardData.totalSubject}
          bgColor="#FFF7D6"
          textColor="#F39C12"
        />
      </div>

      {/* 🟨 Updates */}
      <div className="p-4 rounded shadow mb-5" style={{ backgroundColor: "#f5f5f5" }}>
        <h4 style={{ fontWeight: 700, marginBottom: "18px" }}>📢 Latest Updates</h4>
        <ul className="list-unstyled m-0" style={{ fontSize: "15px", color: "#444" }}>
          {updates.map((update, index) => (
            <li key={index} className="py-2 border-bottom">
              {update}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
