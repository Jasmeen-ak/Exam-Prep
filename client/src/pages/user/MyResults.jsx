import axios from 'axios'
import React, { useEffect, useState } from 'react'

const MyResults = () => {
    const [data, setData] = useState([])
    const userId = localStorage.getItem('userId')
    const handlefetch = async () => {
        const res = await axios.get(`http://localhost:5000/api/exams/examinee-result/${userId}`);
        console.log(res)
        setData(Array.isArray(res.data.message) ? res.data.message : [res.data.message]);

    }
    useEffect(() => {
        handlefetch()
    }, [])
    // console.log(data);
   const handlePrint = (item) => {
    const printWindow = window.open('', '', 'width=900,height=650');
    printWindow.document.write(`
      <html>
        <head>
          <title>My Result</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; }
            h2 { color: #6f42c1; text-align: center; margin-bottom: 24px; }
            table { border-collapse: collapse; width: 100%; box-shadow: 0 4px 12px rgba(0,0,0,0.1); background: white; }
            td, th { border: 1px solid #6f42c1; padding: 12px 16px; text-align: left; }
            th { background-color: #f3e8ff; color: #333; }
            tr:nth-child(even) { background-color: #fafafa; }
          </style>
        </head>
        <body>
          <h2>Exam Report - ${item.examId?.title}</h2>
          <table>
            <tr><th>Examinee Name</th><td>${item.examineeId?.name || item.examineeId}</td></tr>
            <tr><th>Email</th><td>${item.examineeId?.email || 'N/A'}</td></tr>
            <tr><th>Total Marks</th><td>${item.totalMarks}</td></tr>
            <tr><th>Passing Marks</th><td>${item.passingMarks}</td></tr>
            <tr><th>Score</th><td>${item.score}</td></tr>
            <tr><th>Status</th><td>${item.status}</td></tr>
            <tr><th>Date of Exam</th><td>${new Date(item.createdAt).toLocaleString()}</td></tr>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
        <div style={{ padding: "10px" }}>
            <div style={{ maxWidth: "98%", margin: "0 auto" }}>
                <div
                    // style={{
                    //     backgroundColor: "white",
                    //     border: "1px solid #6f42c1",
                    //     borderRadius: "12px",
                    //     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    //     padding: "24px"
                    // }}
                >
                <h1 className="text-center mb-3" style={{ color: '#0F172A' }}>My Results</h1>


                    <table className="table table-bordered table-hover mt-4 "
                    style={{
                      margin: 'auto',
                      width: '95%',
                      borderCollapse: 'collapse',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #ddd',
                     }}>
                   <thead className="text-center" style={{ backgroundColor: '#06B6D4', color: 'white' }}>

                            <tr style={{ backgroundColor: "#f5f5f5" }}>
                                {["S.N", "Exam name", "Your Name", "Total Marks", "Score", "Passing Marks", "Status", "Date", "Print"].map((header, idx) => (
                                    <th key={idx} style={{ border: "1px solid #ccc", padding: "12px" }}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, i) => (
                                <tr key={item._id} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#f9f9f9" }}>
                                    <td style={{ border: "1px solid #ccc", padding: "10px" ,textAlign:'center'}}>{i + 1}</td>
                                    <td style={{ border: "1px solid #ccc", padding: "10px"  ,textAlign:'center'}}>{item.examId?.title}</td>
                                    <td style={{ border: "1px solid #ccc", padding: "10px"  ,textAlign:'center'}}>{item.examineeId?.name || item.examineeId}</td>
                                    <td style={{ border: "1px solid #ccc", padding: "10px"  ,textAlign:'center'}}>{item.totalMarks}</td>
                                    <td style={{ border: "1px solid #ccc", padding: "10px"  ,textAlign:'center'}}>{item.score}</td>
                                    <td style={{ border: "1px solid #ccc", padding: "10px"  ,textAlign:'center'}}>{item.passingMarks}</td>
                                    <td style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        fontWeight: "bold",
                                        color: item.status === "Passed" ? "green" : "red"
                                    }}>
                                        {item.status}
                                    </td>
                                    <td style={{ border: "1px solid #ccc", padding: "10px" }}>{new Date(item.createdAt).toLocaleString()}</td>
                                    <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                                        <button
                                            onClick={() => handlePrint(item)}
                                            style={{
                                                backgroundColor: "#6366F1",
                                                color: "#fff",
                                                border: "none",
                                                padding: "6px 12px",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                                fontSize: "14px"
                                            }}
                                        >
                                            Print Result
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MyResults