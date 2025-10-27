import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
const ReportGeneration = () => {
    const [data, setData] = useState([]);
    const handlefetch = async () => {
        const res = await axios.get('http://localhost:5000/api/exams/report');
        console.log(res.data);
        setData(Array.isArray(res.data) ? res.data : [res.data
        ]);
    }
    useEffect(() => {
        handlefetch();
    }, []);
const handlePrint = (item) => {
    const printWindow = window.open('', '', 'width=900,height=650');
    printWindow.document.write(`
      <html>
        <head>
          <title>Exam Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { color: #6f42c1; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
            td, th { border: 1px solid #6f42c1; padding: 8px; text-align: left; }
            th { background-color: #f3e8ff; }
          </style>
        </head>
        <body>
          <h2>Exam Report - ${item.examTitle}</h2>
          <table>
            <tr><th>Examinee Name</th><td>${item.examineeName}</td></tr>
            <tr><th>Email</th><td>${item.examineeEmail}</td></tr>
            <tr><th>Total Marks</th><td>${item.totalMarks}</td></tr>
            <tr><th>Passing Marks</th><td>${item.passingMarks}</td></tr>
            <tr><th>Score</th><td>${item.score}</td></tr>
            <tr><th>Status</th><td>${item.status}</td></tr>
            <tr><th>Date of Exam</th><td>${item.attemptedAt}</td></tr>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
  return (
    <div>
        <div className="container-fluid">
              <div className="row py-3 px-3 mt-3">
                <div className="col-sm-10 mx-auto" style={{width:"99%"}}>
                <h2 className="text-center mb-4" style={{ color: '#0F172A' }}>Report Generation</h2>
                           <table className="table table-hover table-bordered"
                           style={{
                      margin: 'auto',
                      width: '95%',
                      borderCollapse: 'collapse',
                      backgroundColor: '#fff',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #ddd',
                     }}>
                            <thead className="text-center" style={{ backgroundColor: '#06B6D4', color: 'white' }}>
                                <tr>
                                    <th style={{ backgroundColor: "#f5f5f5" }}>S.N</th>
                                    <th style={{ backgroundColor: "#f5f5f5" }}>Exam Name</th>
                                    <th style={{ backgroundColor: "#f5f5f5" }}>Examinee Name</th>
                                    <th style={{ backgroundColor: "#f5f5f5" }}>Total Marks</th>
                                    <th style={{ backgroundColor: "#f5f5f5" }}>Score</th>
                                    <th style={{ backgroundColor: "#f5f5f5" }}>Passing Marks</th>
                                    <th style={{ backgroundColor: "#f5f5f5" }}>Status</th>
                                    <th style={{ backgroundColor: "#f5f5f5" }}>Date</th>
                                    <th style={{ backgroundColor: "#f5f5f5" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, i) => (
                                    <tr key={item._id}>
                                        <td style={{ border: "1px solid #ccc", padding: "10px"  ,textAlign:'center'}}>{i + 1}</td>
                                        <td style={{ border: "1px solid #ccc", padding: "10px"  ,textAlign:'center'}}>{item.examTitle}</td>
                                        <td style={{ border: "1px solid #ccc", padding: "10px"  ,textAlign:'center'}}>{item.examineeName}</td>
                                        <td style={{ border: "1px solid #ccc", padding: "10px"  ,textAlign:'center'}}>{item.totalMarks}</td>
                                        <td style={{ border: "1px solid #ccc", padding: "10px"  ,textAlign:'center'}}>{item.score}</td>
                                        <td style={{ border: "1px solid #ccc", padding: "10px"  ,textAlign:'center'}}>{item.passingMarks}</td>
                                        <td style={{ border: "1px solid #ccc", padding: "10px"  ,textAlign:'center'}}>{item.status}</td>
                                        <td style={{ border: "1px solid #ccc", padding: "10px"  ,textAlign:'center'}}>{new Date(item.attemptedAt).toLocaleString()}</td>
                                        <td>
                                            <button className="btn btn-sm btn-primary" onClick={()=>{handlePrint(item)}}>Generate Report</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                           </table>
                       
                </div>
            </div>


        </div>
    </div>
  )
}

export default ReportGeneration