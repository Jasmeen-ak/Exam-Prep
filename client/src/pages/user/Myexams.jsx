import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';

const Myexams = () => {
  const [data,setData] =useState([]);
  const handlefetch = async()=>{
    const res = await axios.get('http://localhost:5000/api/exams/exams')
    setData(res.data)
 
  }
  useEffect(()=>{
    handlefetch();
  },[])
  return (
    <div>
  <h1 className="text-center mt-3 mb-3" style={{ color: '#0F172A' }}>My Exams</h1>
  <table
    className="table table-bordered table-hover mt-4"
    style={{
      margin: 'auto',
      width: '80%',
      borderCollapse: 'collapse',
      backgroundColor: '#fff',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      border: '1px solid #ddd',
    }}
  >
    <thead className="text-center" style={{ backgroundColor: '#06B6D4', color: 'white' }}>
      <tr>
        <th style={{ padding: '12px',fontSize:"17px",backgroundColor: "#f5f5f5"  }}>S.N.</th>
        <th style={{ padding: '12px' ,fontSize:"17px",backgroundColor: "#f5f5f5" }}>Exam Name</th>
        <th style={{ padding: '12px',fontSize:"17px" ,backgroundColor: "#f5f5f5" }}>Date</th>
        <th style={{ padding: '12px' ,fontSize:"17px",backgroundColor: "#f5f5f5" }}>Duration</th>
        <th style={{ padding: '12px' ,fontSize:"17px",backgroundColor: "#f5f5f5" }}>Action</th>
      </tr>
    </thead>
    <tbody className="text-center">
      {data.map((item, i) => (
        <tr key={item._id}>
          <td style={{ padding: '10px',textAlign:"center" }}>{i + 1}</td>
          <td style={{ padding: '10px' ,textAlign:"center"}}>{item.title}</td>
          <td style={{ padding: '10px' ,textAlign:"center"}}>{item.date}</td>
          <td style={{ padding: '10px' ,textAlign:"center"}}>{item.duration}</td>
          <td style={{ padding: '10px' ,textAlign:"center"}}>
            <Link
              className="btn"
              to={`/userDashboard/getexam/${item._id}`}
              style={{
                backgroundColor: '#6366F1',
                color: 'white',
                fontWeight: 'bold',
                padding: '6px 16px',
                borderRadius: '6px',
              }}
            >
              Start
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  )
}

export default Myexams