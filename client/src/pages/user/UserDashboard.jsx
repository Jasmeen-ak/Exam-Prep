import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

const UserDashboard = () => {
  const navigate = useNavigate();

  // 🔐 Security check on mount
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const email = localStorage.getItem('userEmail');

    if (role !== 'user' || !email) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  // 👋 Dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // 🚪 Secure logout
  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole'); // Fixed key name
    localStorage.removeItem('userId');
    navigate('/', { replace: true }); // Secure redirect
  };

  return (
    <div className="main" style={{  display: "flex", width: "100%" }}>
      {/* Sidebar */}
      <div className="left" style={{ minHeight: "100vh", width: "18%", background: "linear-gradient(180deg, #0A2540, #193A63)" }}>
        <h3 className='head text-center text-light fs-1' style={{ fontSize: "38px", marginTop: "35px" }}>Student</h3>
        <ul className="nav flex-column mt-3">
          <li className="nav-item1">
            <a className="nav-link" href="/userDashboard/myexams">
              <i className="fa-solid fa-user"></i> My Exams
            </a>
          </li>
          <li className="nav-item1">
            <a className="nav-link" href="/userDashboard/myresults">
              <i className="fa-solid fa-book"></i> My Results
            </a>
          </li>
          <li className="nav-item1">
            <a className="nav-link" href="/userDashboard/changepassword">
              <i className="fa-solid fa-unlock"></i> Change Password
            </a>
          </li>
          <li className="nav-item1">
            <a className="nav-link" href="/userDashboard/message">
              <i className="fa-solid fa-message"></i> Message
            </a>
          </li>
          <li className="nav-item1">
            <a className="nav-link" onClick={handleLogout} href="#">
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="right" style={{ height: "100vh", width: "82%", backgroundColor: "#E0E0E0" }}>
        <div className='top d-flex' style={{ height: "80px", width: "100%" }}>
          <h1 className='head fw-bold' style={{ marginLeft: "20px", marginTop: "32px" }}>{getGreeting()}</h1>
          <h1 className='head fw-bold' style={{ marginLeft: "500px", marginTop: "32px" }}>Student Dashboard</h1>
        </div>

        <hr style={{
          height: '3px',
          backgroundColor: '#141414',
          border: 'none'
        }} />

        <div className='bottom'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
