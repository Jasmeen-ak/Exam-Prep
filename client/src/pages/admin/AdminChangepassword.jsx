import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const AdminChangePassword = () => {
 const id = localStorage.getItem('id');
    const[form,setForm]=useState({
        op:'',
        np:'',
        cnp:''
    })
    const handleChange = (e)=>{
       setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try
        {
            const res = await axios.put(`http://localhost:5000/api/admin/change/${id}`,form)
            alert(res.data.message)
        }
        catch(er)
        {
            console.log(er)
            alert(res.data.message)
        }
    }
  return (
    <div style={{ minHeight: "100vh", paddingTop: "60px" }}>
  <div
    className="py-3 px-4 bg-white"
    style={{
      width: "50%",
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    }}
  >
    <form action="" method="POST" onSubmit={handleSubmit}>
      <label htmlFor="op" style={{ fontWeight: "600", fontSize: "15px", marginBottom: "4px", display: "block" }}>
        Enter your old password
      </label>
      <input
        type="text"
        className="form-control mt-2 mb-3"
        name="op"
        onChange={handleChange}
        placeholder="Old password"
        style={{
          borderRadius: "6px",
          border: "1px solid #ccc",
          padding: "10px",
          fontSize: "14px",
        }}
      />

      <label htmlFor="np" style={{ fontWeight: "600", fontSize: "15px", marginBottom: "4px", display: "block" }}>
        Enter new password
      </label>
      <input
        type="password"
        className="form-control mt-2 mb-3"
        name="np"
        onChange={handleChange}
        placeholder="New password"
        style={{
          borderRadius: "6px",
          border: "1px solid #ccc",
          padding: "10px",
          fontSize: "14px",
        }}
      />

      <label htmlFor="cnp" style={{ fontWeight: "600", fontSize: "15px", marginBottom: "4px", display: "block" }}>
        Confirm new password
      </label>
      <input
        type="password"
        className="form-control mt-2 mb-3"
        name="cnp"
        onChange={handleChange}
        placeholder="Confirm New Password"
        style={{
          borderRadius: "6px",
          border: "1px solid #ccc",
          padding: "10px",
          fontSize: "14px",
        }}
      />

      <button
        className="btn btn-primary mt-3"
        type="submit"
        style={{
          backgroundColor: "#6366F1", 
          border: "none",
          padding: "10px 20px",
          borderRadius: "6px",
          fontWeight: "600",
          fontSize: "15px",
        }}
      >
        Update
      </button>
    </form>
  </div>
</div>  
  )
}

export default AdminChangePassword



 // <div >
    //     <div className='py-3 px-3 mt-5 bg-white' style={{width:"50%",marginLeft:"280px"}}>
    //     <form action="" method='POST' onSubmit={handleSubmit}>
    //         <label htmlFor="">Enter your old password</label>
    //         <input type="text" className='form-control mt-2 mb-2' name='op' onChange={handleChange} placeholder='Old password'/>
    //         <label htmlFor="">Enter new password</label>
    //         <input type="password" className='form-control mt-2 mb-2' name='np' onChange={handleChange} placeholder='New password' />
    //         <label htmlFor="">Confirm New Password</label>
    //         <input type="password" className='form-control mt-2 mb-2' name='cnp' onChange={handleChange} placeholder='Confirm New Password'/>
    //         <button className='btn btn-primary mt-2' type='submit'>Update</button>
    //     </form>
    //     </div>
    // </div>