import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Session = () => {
  const[form,setForm]=useState({
    name:'',
    description:''
  })
  const handleChange = (e)=>{
  setForm({...form,[e.target.name]:e.target.value})
  }
  const[id,setId]=useState({
    id:''
  });
  const [edit,setEdit] =useState(null);
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      if(edit){
        const res= await axios.put(`http://localhost:5000/api/session/${id.id}`,form);
      alert("Updated Successfully");
      }
      else{
        const res= await axios.post('http://localhost:5000/api/session',form);
      alert("Added Successfully");
      }
    }
    catch(er){
      alert("Session not Added");
      console.log(er)
    }
  }
  const [data,setData]= useState([]);
  const handlefetch =async()=>{
     const res = await axios.get('http://localhost:5000/api/session');
     setData(res.data)
  }
  useEffect(()=>{
    handlefetch()
  },[])

  const handleDelete = async(id)=>{
   try{
      const res = await axios.delete(`http://localhost:5000/api/session/${id}`);
      alert("Session Deleted Successfully")
      handlefetch()
    }  
    catch(er)
    {
      alert("Sorry Try Again Later")
      console.log(er);
    }
}
const handleEdit= (item)=>{
  setForm({
    name:item.name,
    description :item.description
  })
  setEdit(true)
  setId({
    id:item._id
  });
}
  return (
    <div className='session ms-5 mt-5'>
        <div className='up bg-light' style={{height:"300px", width:"80%", border:"1px solid black", borderRadius:"5px"}}>
    <form method='POST' onSubmit={handleSubmit}>
  <input type="text" placeholder="Enter name" name="name" value={form.name} onChange={handleChange} style={{marginLeft:"35px", marginTop:"40px", borderRadius:"5px"}} />
  <br />
  <textarea placeholder="Enter Description" name="description" value={form.description} onChange={handleChange} style={{marginLeft:"35px", marginTop:"20px", height:"80px", borderRadius:"5px"}}>{form.description}</textarea>
  <br />
  <button type="submit" style={{marginLeft:"35px", marginTop:"20px", borderRadius:"5px", padding:"10px", paddingLeft:"20px",paddingRight:"20px",backgroundColor: '#6366F1'}}>Submit</button>
</form>
</div>
<div className='down mt-5 bg-light' style={{height:"auto", width:"80%", border:"1px solid black", borderRadius:"5px"}}>
<h2 style={{marginTop:"15px", marginLeft:"20px"}}>Session</h2>
<table style={{width:"97%", marginLeft:"10px"}}>
  <thead>
    <tr>
      <th>S.No</th>
      <th>Name</th>
      <th>Description</th>
      <th>Date</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item, i) => {
  return (
    <tr key={item._id}>
      <td>{i + 1}</td>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td>
        <button className="btn btn-danger" onClick={() => handleDelete(item._id)}><i class="fa-solid fa-trash"></i>Delete</button>
      </td>
      <td>
        <button className="btn btn-success" onClick={() => handleEdit(item)}><i class="fa-solid fa-pen"></i>Edit</button>
      </td>
    </tr>
  );
})}

  </tbody>
</table>
</div>
</div>
  )
}

export default Session
