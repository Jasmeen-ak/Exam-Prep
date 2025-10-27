import axios from 'axios'
import React, { useEffect, useState } from 'react'

const RegisterForm = () => {
  const[form,setForm]= useState({
      name:'',
      email:'',
      password:'',
      college:'',
      course:'',
      branch:'',
      session:'',
      phone:''
  })
  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:5000/api/examinee',form)
      alert("Registered Successfully")
      window.location.href='/'
    }
    catch(er)
    {
      console.log(er)
      alert("Sorry Try Again Later")
    }
  }
  const [data,setData]=useState([])
  const handlefetch = async()=>{
   try{
        const res = await axios.get('http://localhost:5000/api/session') ;
        setData(res.data)
      } 
      catch{
        console.log(er)
      }
    }
    useEffect(()=>{
      handlefetch()
    },[])
  return (
    <div className='main-container' style={{ background: "linear-gradient(to bottom, #0c2340, #1e3a5f)", minHeight: "100vh", paddingTop: "40px" }}>
  <div className='register bg-light' style={{ width: "40%", borderRadius: "10px", margin: "0 auto", padding: "20px 30px 30px", border: "1px solid black" }}>
    
    <div className='headline p-3 text-center'>
      <h2 style={{ color: "#0c2340", fontWeight: "700", marginBottom: "30px" }}>REGISTRATION</h2>
    </div>

    <form method='POST' onSubmit={handleSubmit}>
      <label for="name" style={{ fontWeight: "600", textTransform: "uppercase", fontSize: "14px", color: "#0c2340", display: "block", marginBottom: "6px" }}>Name</label>
      <input type="text" id="name" placeholder="Enter your Name" name='name' value={form.name} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "none", borderBottom: "2px solid #1e3a5f", marginBottom: "20px", backgroundColor: "#f9f9f9" }} />

      <label for="email" style={{ fontWeight: "600", textTransform: "uppercase", fontSize: "14px", color: "#0c2340", display: "block", marginBottom: "6px" }}>Email</label>
      <input type="email" id="email" placeholder="Enter your Email" name='email' value={form.email} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "none", borderBottom: "2px solid #1e3a5f", marginBottom: "20px", backgroundColor: "#f9f9f9" }} />

      <label for="password" style={{ fontWeight: "600", textTransform: "uppercase", fontSize: "14px", color: "#0c2340", display: "block", marginBottom: "6px" }}>Password</label>
      <input type="password" id="password" placeholder="***********" name='password' value={form.password} onChange={handleChange}  style={{ width: "100%", padding: "10px", border: "none", borderBottom: "2px solid #1e3a5f", marginBottom: "20px", backgroundColor: "#f9f9f9" }} />

      <label for="clgname" style={{ fontWeight: "600", textTransform: "uppercase", fontSize: "14px", color: "#0c2340", display: "block", marginBottom: "6px" }}>College Name</label>
      <input type="text" id="clgname" placeholder="Enter your College Name"  name='college' value={form.college} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "none", borderBottom: "2px solid #1e3a5f", marginBottom: "20px", backgroundColor: "#f9f9f9" }} />

      <label for="course" style={{ fontWeight: "600", textTransform: "uppercase", fontSize: "14px", color: "#0c2340", display: "block", marginBottom: "6px" }}>Course</label>
      <input type="text" id="course" placeholder="Enter your Course" name='course' value={form.course} onChange={handleChange}  style={{ width: "100%", padding: "10px", border: "none", borderBottom: "2px solid #1e3a5f", marginBottom: "20px", backgroundColor: "#f9f9f9" }} />

      <label for="branch" style={{ fontWeight: "600", textTransform: "uppercase", fontSize: "14px", color: "#0c2340", display: "block", marginBottom: "6px" }}>Branch</label>
      <input type="text" id="branch" placeholder="Enter your Course" name='branch' value={form.branch} onChange={handleChange}  style={{ width: "100%", padding: "10px", border: "none", borderBottom: "2px solid #1e3a5f", marginBottom: "20px", backgroundColor: "#f9f9f9" }} />
      
      <label for="session" style={{ fontWeight: "600", textTransform: "uppercase", fontSize: "14px", color: "#0c2340", display: "block", marginBottom: "6px" }}>Session</label>
       <select name='session' onChange={handleChange} className='form-select' id="">
      <option value="">Select Session</option>
        {data.map((item)=>(
          <option key={item._id} value={item._id}>{item.name}</option>
        ))}
       </select>

      <label for="phone" style={{ fontWeight: "600", textTransform: "uppercase", fontSize: "14px", color: "#0c2340", display: "block", marginBottom: "6px" }}>Phone Number</label>
      <input type="number" id="phone" placeholder="Enter your Phone Number"  name='phone' value={form.phone} onChange={handleChange}  style={{ width: "100%", padding: "10px", border: "none", borderBottom: "2px solid #1e3a5f", marginBottom: "20px", backgroundColor: "#f9f9f9" }} />

      <div style={{ textAlign: "center" }}>
        <button type='submit' style={{ backgroundColor: "#0c2340", color: "white", height: "45px", width: "150px", fontWeight: "700", borderRadius: "6px", fontSize: "15px", border: "none", cursor: "pointer" }}>Register</button>
      </div>
    </form>
  </div>
</div>

  )
}

export default RegisterForm