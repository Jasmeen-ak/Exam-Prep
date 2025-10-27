// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function DashboardHome({ userId }) {
//   const [examStats, setExamStats] = useState({
//     totalExams: 12,
//     passed: 9,
//     failed: 3,
//   });

  // const [upcomingExams, setUpcomingExams] = useState([]);

  // const fetchUpcomingExams = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:5000/api/exams/exams");
  //     setUpcomingExams(res.data || []);
  //   } catch (error) {
  //     console.error("Error fetching exams:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUpcomingExams();
  // }, [userId]);

//   const progress =
//     examStats.totalExams > 0
//       ? Math.round((examStats.passed / examStats.totalExams) * 100)
//       : 0;

//   return (
//     <div style={styles.wrapper}>
//       {/* Welcome Header */}
//       <div style={styles.headerContainer}>
//         <h1 className="mt-2" style={styles.greeting}> Hello, Student!</h1>
//         <p className="mt-3" style={styles.subGreeting}>Here's your latest dashboard overview 📊</p>
//       </div>

//       {/* Stat Cards */}
//       <div style={styles.cardContainer}>
//         <StatCard icon="📚" label="Total Exams" value={examStats.totalExams} color="#3498db" />
//         <StatCard icon="✅" label="Passed" value={examStats.passed} color="#2ecc71" />
//         <StatCard icon="❌" label="Failed" value={examStats.failed} color="#e74c3c" />
//         <StatCard icon="📈" label="Progress" value={`${progress}%`} color="#f1c40f" />
//       </div>

//       {/* Exam Table */}
      // <div className="mt-5" style={styles.examSection}>
      //   <h2 style={styles.examHeading}>📘 My Upcoming Exams</h2>
      //   <table className="mt-3" style={styles.table}>
      //     <thead>
      //       <tr style={styles.tableHeaderRow}>
      //         <th style={thStyle}>S.N.</th>
      //         <th style={thStyle}>Exam Name</th>
      //         <th style={thStyle}>Date</th>
      //         <th style={thStyle}>Duration (mins)</th>
      //         <th style={thStyle}>Action</th>
      //       </tr>
      //     </thead>
      //     <tbody>
      //       {upcomingExams.length === 0 ? (
      //         <tr className="mt-3 mb-4">
      //           <td colSpan="5" style={styles.emptyRow}>
      //             No upcoming exams
      //           </td>
      //         </tr>
      //       ) : (
      //         upcomingExams.map((exam, index) => (
      //           <tr key={exam._id} style={styles.tableRow}>
      //             <td style={tdStyle}>{index + 1}</td>
      //             <td style={tdStyle}>{exam.title}</td>
      //             <td style={tdStyle}>{exam.date?.slice(0, 10)}</td>
      //             <td style={tdStyle}>{exam.duration}</td>
      //             <td style={tdStyle}>
      //               <button style={styles.startButton}>Start</button>
      //             </td>
      //           </tr>
      //         ))
      //       )}
      //     </tbody>
      //   </table>
      // </div>
//     </div>
//   );
// }

// // ✅ Reusable StatCard Component
// function StatCard({ icon, label, value, color }) {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       style={{
//         ...styles.card,
//         borderTop: `6px solid ${color}`,
//         transition: "transform 0.3s ease, box-shadow 0.3s ease",
//         transform: isHovered ? "scale(1.05)" : "scale(1)",
//         boxShadow: isHovered
//           ? "0 8px 25px rgba(0,0,0,0.2)"
//           : "0 4px 15px rgba(0,0,0,0.1)",
//         cursor: "pointer",
//       }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div style={{ fontSize: "26px" }}>{icon}</div>
//       <h3 style={styles.cardLabel}>{label}</h3>
//       <p style={{ ...styles.cardValue, color }}>{value}</p>
//     </div>
//   );
// }

// // 🧑‍🎨 Styles
// const styles = {
//   wrapper: {
//     fontFamily: "'Segoe UI', sans-serif",
//     padding: "30px",
//     background: "linear-gradient(to bottom right, #f5faff, #e8ecf9)",
//     minHeight: "100vh",
//     marginTop:"-20px",
//   },
//   headerContainer: {
//     textAlign: "center",
//     marginBottom: "30px",
//   },
//   greeting: {
//     fontSize: "30px",
//     fontWeight: "600",
//     color: "#2c3e50",
//   },
//   subGreeting: {
//     fontSize: "16px",
//     color: "#7f8c8d",
//   },
//   cardContainer: {
//     display: "flex",
//     justifyContent: "center",
//     flexWrap: "wrap",
//     gap: "25px",
//     marginBottom: "40px",
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: "15px",
//     padding: "20px",
//     width: "220px",
//     boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//     textAlign: "center",
//     cursor: "pointer",
//   },
//   cardLabel: {
//     color: "#333",
//     fontSize: "16px",
//     marginTop: "10px",
//     marginBottom: "5px",
//   },
//   cardValue: {
//     fontSize: "24px",
//     fontWeight: "bold",
//   },
//   examSection: {
//     marginTop: "30px",
//     backgroundColor: "#fff",
//     padding: "25px",
//     borderRadius: "15px",
//     boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
//   },
//   examHeading: {
//     textAlign: "center",
//     fontSize: "22px",
//     marginBottom: "20px",
//     color: "#2c3e50",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//   },
//   tableHeaderRow: {
//     backgroundColor: "#f0f3f5",
//   },
//   tableRow: {
//     transition: "background-color 0.3s ease",
//   },
//   emptyRow: {
//     textAlign: "center",
//     padding: "16px",
//     color: "#999",
//   },
//   startButton: {
//     backgroundColor: "#6c63ff",
//     color: "#fff",
//     border: "none",
//     padding: "6px 14px",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontWeight: "bold",
//   },
// };

// const thStyle = {
//   padding: "12px",
//   borderBottom: "2px solid #ccc",
//   textAlign: "left",
//   fontWeight: "bold",
// };

// const tdStyle = {
//   padding: "10px",
//   borderBottom: "1px solid #eee",
// };









import React, { useEffect, useState } from "react";
import {Link} from 'react-router'
import axios from "axios";

export default function DashboardHome({ userId }) {
  const [examStats, setExamStats] = useState({
    totalExams: 1,
    passed: 1,
    failed: 0,
  });

const [upcomingExams, setUpcomingExams] = useState([]);

  const fetchUpcomingExams = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/exams/exams");
      setUpcomingExams(res.data || []);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  useEffect(() => {
    fetchUpcomingExams();
  }, [userId]);

  // Fetch total exams attempted
  const fetchTotalExams = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/dashboard/exams/${userId}`);
    return res.data.totalExams || 0; // Adjust based on backend response format
  } catch (err) {
    console.error("Error fetching total exams:", err);
    return 0;
  }
};


  const fetchPassedExams = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/dashboard/passed/${userId}`);
    return res.data.passedExams || 0; // Again, adjust based on backend response
  } catch (err) {
    console.error("Error fetching passed exams:", err);
    return 0;
  }
};


  // Fetch and calculate stats
  const fetchExamStats = async () => {
  const total = await fetchTotalExams();
  const passed = await fetchPassedExams();
  const failed = total - passed;

  setExamStats({
    totalExams: total,
    passed,
    failed: failed < 0 ? 0 : failed,
  });
};

  useEffect(() => {
    if (userId) {
      fetchExamStats();
    }
  }, [userId]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.headerContainer}>
        <h1 style={styles.greeting}>Hello, Student!</h1>
        <p style={styles.subGreeting}>Here's your latest dashboard overview 📊</p>
      </div>

      {/* Stat Cards */}
      <div style={styles.cardContainer}>
        <StatCard icon="🧪" label="Total Tests" value={examStats.totalExams} color="#2980b9" />
        <StatCard
          icon="🎯"
          label="Passed / Failed"
          value={`${examStats.passed} / ${examStats.failed}`}
          color="#27ae60"
        />
      </div>

      {/* Upcoming Exams Table */}
     <div className="mt-5" style={styles.examSection}>
        <h2 style={styles.examHeading}>📘 My Upcoming Exams</h2>
        <table className="mt-3" style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={thStyle}>S.N.</th>
              <th style={thStyle}>Exam Name</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Duration (mins)</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {upcomingExams.length === 0 ? (
              <tr className="mt-3 mb-4">
                <td colSpan="5" style={styles.emptyRow}>
                  No upcoming exams
                </td>
              </tr>
            ) : (
              upcomingExams.map((exam, index) => (
                <tr key={exam._id} style={styles.tableRow}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>{exam.title}</td>
                  <td style={tdStyle}>{exam.date?.slice(0, 10)}</td>
                  <td style={tdStyle}>{exam.duration}</td>
                 <td style={tdStyle}>
  <Link
    to={`/userDashboard/getexam/${exam._id}`}
    style={{
      backgroundColor: '#6366F1',
      color: 'white',
      fontWeight: 'bold',
      padding: '6px 16px',
      borderRadius: '6px',
      textDecoration: 'none',
      display: 'inline-block',
      cursor: 'pointer',
    }}
  >
    Start
  </Link>
</td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// StatCard Component
function StatCard({ icon, label, value, color }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        borderTop: `6px solid ${color}`,
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        boxShadow: isHovered
          ? "0 8px 25px rgba(0,0,0,0.2)"
          : "0 4px 15px rgba(0,0,0,0.1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ fontSize: "28px" }}>{icon}</div>
      <h3 style={styles.cardLabel}>{label}</h3>
      <p style={{ ...styles.cardValue, color }}>{value}</p>
    </div>
  );
}

// Styles
const styles = {
  wrapper: {
    fontFamily: "'Segoe UI', sans-serif",
    padding: "30px",
    background: "linear-gradient(to bottom right, #f5faff, #e8ecf9)",
    minHeight: "100vh",
    marginTop: "-18px",
  },
  headerContainer: {
    textAlign: "center",
    marginBottom: "30px",
  },
  greeting: {
    fontSize: "30px",
    fontWeight: "600",
    color: "#2c3e50",
  },
  subGreeting: {
    fontSize: "16px",
    color: "#7f8c8d",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    marginBottom: "40px",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "15px",
    padding: "20px",
    width: "240px",
    transition: "all 0.3s ease",
    textAlign: "center",
    cursor: "pointer",
  },
  cardLabel: {
    color: "#333",
    fontSize: "16px",
    marginTop: "10px",
    marginBottom: "5px",
  },
  cardValue: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  examSection: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },
  examHeading: {
    textAlign: "center",
    fontSize: "22px",
    marginBottom: "20px",
    color: "#2c3e50",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeaderRow: {
    backgroundColor: "#f0f3f5",
  },
  tableRow: {
    transition: "background-color 0.3s ease",
  },
  emptyRow: {
    textAlign: "center",
    padding: "16px",
    color: "#999",
  },
  // startButton: {
  //   backgroundColor: "#6c63ff",
  //   color: "#fff",
  //   border: "none",
  //   padding: "6px 14px",
  //   borderRadius: "6px",
  //   cursor: "pointer",
  //   fontWeight: "bold",
  // },
};

const thStyle = {
  padding: "12px",
  borderBottom: "2px solid #ccc",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};
