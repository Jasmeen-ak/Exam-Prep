import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Message = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);

  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName') || '';
  const userEmail = localStorage.getItem('userEmail') || '';

  const fetchUserMessages = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/message/user/${userId}`);
      setMessages(res.data.message || []);
    } catch (err) {
      console.error('Error fetching user messages:', err);
    }
  };

  useEffect(() => { fetchUserMessages(); }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!question.trim()) return alert('Enter a message');
    try {
      await axios.post('http://localhost:5000/api/message', { question, examineeId: userId });
      setQuestion('');
      fetchUserMessages();
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const editMyMessage = async (id, currentText) => {
    const newText = prompt('Edit your message:', currentText);
    if (newText === null) return;
    try {
      await axios.put(`http://localhost:5000/api/message/edit/${id}`, {
        question: newText,
        role: 'user',
        userId
      });
      fetchUserMessages();
    } catch (err) {
      console.error('Error editing message:', err);
    }
  };

  const deleteByUser = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await axios.put(`http://localhost:5000/api/message/delete/${id}`, {
        role: 'user',
        userId
      });
      fetchUserMessages();
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  return (
    <div className="container p-3 bg-light rounded"
    style={{height:"420px", width:"92%",marginTop:"50px"}}>
      <h3 className='ms-4'>Send Feedback to Admin</h3>            
      <form onSubmit={sendMessage}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="form-control mt-3  mb-3 ms-4"
          placeholder="Type your feedback..."
          rows="3"
          style={{width:"94%",height:"100px"}}
        />
        <button type="submit" className="btn ms-4" style={{backgroundColor:'#6366F1',color: 'white',
                fontWeight: 'bold',
                padding: '6px 16px',
                borderRadius: '6px',}}>Submit</button>
      </form>

      <hr />
      <h3 className='ms-4'>Your Messages</h3>
      <table className="table table-bordered text-center ms-4" style={{width:"95%"}}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Feedback</th>
            <th>Admin Reply</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.length === 0 ? (
            <tr><td colSpan="4">No feedback submitted</td></tr>
          ) : (
            messages.map((msg, idx) => (
              <tr key={msg._id}>
                <td>{idx + 1}</td>
                <td>{msg.question}</td>
                <td>{msg.answer || 'No reply yet'}</td>
                <td>
                  <button className="btn btn-sm btn-success text-light me-1 ms-5" onClick={() => editMyMessage(msg._id, msg.question)}><i class="fa-solid fa-pen"></i>Edit</button>
                  <button className="btn btn-sm btn-danger ms-5" onClick={() => deleteByUser(msg._id)}><i class="fa-solid fa-trash"></i>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Message;