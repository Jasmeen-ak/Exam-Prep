import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Examinee = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    college: '',
    course: '',
    branch: '',
    phone: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editFormVisible, setEditFormVisible] = useState(false);

  useEffect(() => {
    handlefetch();
  }, []);

  const handlefetch = async () => {
    const res = await axios.get('http://localhost:5000/api/examinee');
    setData(res.data);
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/examinee/${id}`);
    if (res) {
      alert("Deleted Successfully");
    } else {
      alert("Try Again Later");
    }
    handlefetch();
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      email: item.email,
      college: item.college,
      course: item.course,
      branch: item.branch,
      phone: item.phone,
    });
    setEditingId(item._id);
    setEditFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to form
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId) return;
    try {
      await axios.put(`http://localhost:5000/api/examinee/${editingId}`, form);
      alert('Examinee Updated Successfully');
      setForm({
        name: '',
         email: '',
        college: '',
        course: '',
       branch: '',
       phone: ''
      });
      setEditingId(null);
      setEditFormVisible(false);
      handlefetch();
    } catch (error) {
      console.error("Error updating examinee:", error);
      alert("Error updating examinee");
    }
  };

  return (
    <>
     <div className='container-fluid p-0'>
       {editFormVisible && (
       <div className="card" style={{ border: "1px solid #6f42c1", width: "100%" }}>
          <div className="card-body">
            <h3 className="fw-bold" style={{ color: "#6f42c1" }}>Edit Examinee</h3>
            <form className="border p-2 rounded" onSubmit={handleSubmit}>
              <div className="row mb-2">
                <div className="col-sm-4">
                  <input className="form-control" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
                </div>
                <div className="col-sm-4">
                  <input className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
                </div>
                <div className="col-sm-4">
                  <input className="form-control" name="college" value={form.college} onChange={handleChange} placeholder="College" required />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-4">
                  <input className="form-control" name="course" value={form.course} onChange={handleChange} placeholder="Course" />
                </div>
                <div className="col-sm-4">
                  <input className="form-control" name="branch" value={form.branch} onChange={handleChange} placeholder="Branch" />
                </div>
                <div className="col-sm-4">
                  <input className="form-control" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
                </div>
              </div>
              <button type="submit" className="btn btn-light text-white mb-1 me-2" style={{ background: "#39064fff " }}>Update</button>
              <button type="button" className="btn-edit" onClick={() => setEditFormVisible(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

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
                <h1 className="text-center mb-3" style={{ color: '#0F172A' }}>Examinee Details</h1>

            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <table className="table table-bordered text-center mt-3"style={{
                      margin: 'auto',
                      width: '95%',
                      borderCollapse: 'collapse',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #ddd',
                     }}>
                     <thead className="text-center fs-5" style={{ backgroundColor: '#06B6D4', color: 'white' }}>
                    <tr >
                    <th style={{ backgroundColor: "#f5f5f5" }}>S.No.</th>
                    <th style={{ backgroundColor: "#f5f5f5" }}>Name</th>
                    <th style={{ backgroundColor: "#f5f5f5" }}>Email</th>
                    <th style={{ backgroundColor: "#f5f5f5" }}>College</th>
                    <th style={{ backgroundColor: "#f5f5f5" }}>Course</th>
                    <th style={{ backgroundColor: "#f5f5f5" }}>Branch</th>
                    <th style={{ backgroundColor: "#f5f5f5" }}>Phone</th>
                    <th style={{ backgroundColor: "#f5f5f5" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, i) => (
                    <tr key={item._id }>
                      <td  style={{ border: "1px solid #ccc", padding: "10px" ,textAlign:'center'}}>{i + 1}</td>
                      <td style={{ border: "1px solid #ccc", padding: "10px" ,textAlign:'center'}}>{item.name}</td>
                      <td style={{ border: "1px solid #ccc", padding: "10px" ,textAlign:'center'}}>{item.email}</td>
                      <td  style={{ border: "1px solid #ccc", padding: "10px" ,textAlign:'center'}}>{item.college}</td>
                      <td style={{ border: "1px solid #ccc", padding: "10px" ,textAlign:'center'}}>{item.course}</td>
                      <td style={{ border: "1px solid #ccc", padding: "10px" ,textAlign:'center'}}>{item.branch}</td>
                      <td style={{ border: "1px solid #ccc", padding: "10px" ,textAlign:'center'}}>{item.phone}</td>
                      <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                        <button className="btn btn-success me-2 "
                        style={{
                          
                                 color: "#fff",
                                 border: "none",
                                 padding: "6px 12px",
                                 borderRadius: "6px",
                                 cursor: "pointer",
                                 fontSize: "14px"
                                            }}
                        onClick={() => handleEdit(item)}>Edit</button>
                        <button className="btn btn-danger"
                         style={{
                                 color: "#fff",
                                 border: "none",
                                 padding: "6px 12px",
                                 borderRadius: "6px",
                                 cursor: "pointer",
                                 fontSize: "14px"
                                            }}
                        onClick={() => handleDelete(item._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default Examinee;
