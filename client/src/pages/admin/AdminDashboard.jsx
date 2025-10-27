import React, { useEffect } from 'react';
import { Outlet, useNavigate,Link } from 'react-router';

const AdminDashboard = () => {
    const navigate = useNavigate();
  
    
const getGreeting = ()=>{
    const hour = new Date().getHours();
    if ( hour < 12) return 'Good Morning';
    if ( hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }
  const handleLogout = (e) => {
    e.preventDefault(); 

    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminRole');
    localStorage.removeItem('id');
    navigate('/adlogin', { replace: true }); // Secure redirect

  };

  return (
<div classNameName="main" style={{ display: "flex", width:"100%"}}>
    <div classNameName="left" style={{ minHeight: "100vh", width: "18%", background: "linear-gradient(180deg, #0A2540, #193A63)" }}>
    <h3 className='head text-center text-light' style={{ fontSize: "38px", marginhrefp:"32px",marginTop:"40px" }}>Admin</h3>
    <ul className="nav flex-column mt-2">
     <li className="nav-item1">
      <a className="nav-link" href="/adminDashboard/session"><i class="fa-solid fa-calendar"></i> Session</a>
    </li>
    <li className="nav-item1">
      <a className="nav-link" href="/adminDashboard/subject"><i class="fa-solid fa-book"></i> Subject</a>
    </li>
    <li className="nav-item1">
      <a className="nav-link" href="/adminDashboard/examinee"><i class="fa-solid fa-user-tie"></i> Examinee</a>
    </li>
    <li className="nav-item1">
      <a className="nav-link" href="/adminDashboard/examination"><i class="fa-solid fa-person-booth"></i> Examination</a>
    </li>
    <li className="nav-item1">
      <a className="nav-link" href="/adminDashboard/question"><i class="fa-solid fa-file-circle-question"></i> Question Bank</a>
    </li>
    <li className="nav-item1">
      <a className="nav-link" href="/adminDashboard/reportgeneration"><i class="fa-solid fa-chart-line"></i> Report Generation</a>
    </li>
    <li className="nav-item1">
      <a className="nav-link" href="/adminDashboard/messagereply"><i class="fa-solid fa-arrow-right-from-bracket"></i> Message</a>
    </li>
    <li className="nav-item1">
      <a className="nav-link" href="/adminDashboard/changepassword"><i class="fa-solid fa-unlock"></i> Change Password</a>
    </li>
    <li className="nav-item1">
      <a className="nav-link"  onClick={handleLogout}  href="/"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a>
    </li>
  </ul>
  </div>
  <div classNameName="right" style={{ minHeight: "100vh", width: "82%", backgroundColor: "#E0E0E0" }}>
    <div className='hrefp d-flex' style={{height:"80px", width:"100%"}}>
      <h1 className='head fw-bold' style={{marginLeft:"20px",marginTop:"32px"}}>{getGreeting()}</h1>
       <h1 className='head fw-bold' style={{marginLeft:"500px",marginhrefp:"32px",marginTop:"35px"}}>Admin Dashboard</h1>
    </div>
     <hr style={{
  height: '3px',
  backgroundColor:'#141414',  // Indigo Purple or any color
  border: 'none'
}} />
    <div className='bothrefm mt-3 ms-5'>
     <Outlet/>

    </div>
  </div>
</div>


  )
}

export default AdminDashboard