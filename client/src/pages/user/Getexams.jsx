import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';

const GetExams = () => {
  const { id: examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const email = localStorage.getItem('userEmail');

  // Fetch exam and set initial state
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/exams/exam/${examId}`);
        const { exam: examData, questions: questionData } = res.data;
        setExam(examData);
        setQuestions(questionData);
        setTimeLeft(parseInt(examData.duration) * 60);
      } catch (err) {
        console.error('Error fetching exam:', err);
        setError(err.response?.data?.error || 'Failed to load exam');
      }
    };
    fetchExam();
  }, [examId]);

  // Check if test is started within a time limit (e.g., 30 seconds)
  useEffect(() => {
    if (!exam || testStarted) return;

    const startTimeout = setTimeout(() => {
      if (!testStarted) {
        setError('Test expired: You did not start the test within the allowed time.');
        setSubmitted(true);
        navigate('/userdash/profile');
      }
    }, (1000*timeLeft)); // 30 seconds to start the test

    return () => clearTimeout(startTimeout);
  }, [exam, testStarted, navigate]);

  // Timer for exam duration
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || submitted || !testStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted, testStarted]);

  // Security: Prevent tab switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && testStarted && !submitted) {
        setError('Violation: Tab switching detected. Exam will be submitted.');
        handleSubmit();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [testStarted, submitted]);

  // Security: Disable cut, copy, paste
  useEffect(() => {
    const preventCopyPaste = (e) => {
      if (testStarted && !submitted) {
        e.preventDefault();
        setError('Violation: Cut/Copy/Paste detected. Exam will be submitted.');
        handleSubmit();
      }
    };

    document.addEventListener('cut', preventCopyPaste);
    document.addEventListener('copy', preventCopyPaste);
    document.addEventListener('paste', preventCopyPaste);

    return () => {
      document.removeEventListener('cut', preventCopyPaste);
      document.removeEventListener('copy', preventCopyPaste);
      document.removeEventListener('paste', preventCopyPaste);
    };
  }, [testStarted, submitted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    if (!testStarted) setTestStarted(true); // Mark test as started when user answers a question
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (submitted) return;

    try {
      const res = await axios.post('http://localhost:5000/api/exams/submit-exam', {
        examId,
        answers,
        email,
      });
      setResult(res.data);
      setSubmitted(true);
      alert('Your Exam was submitted successfully. Result will be declared soon.');
      window.location.href ='/userDashboard';
    } catch (err) {
      console.error('Error submitting exam:', err);
      setError(err.response?.data?.error || 'Failed to submit exam');
    }
  };

  if (error) {
    return <div className="alert alert-danger m-4">{error}</div>;
  }

  if (!exam || !questions.length) {
    return <div className="text-center m-4">Loading...</div>;
  }

  // return (
  //   <div className="container mt-4">
  //     <h2>{exam.title}</h2>
  //     <div className="mb-3">
  //       <p><strong>Duration:</strong> {exam.duration} minutes</p>
  //       <p><strong>Total Marks:</strong> {exam.totalMarks}</p>
  //       <p><strong>Passing Marks:</strong> {exam.passingMarks}</p>
  //       <p><strong>Time Left:</strong> {formatTime(timeLeft)}</p>
  //     </div>

  //     {submitted && result ? (
  //       <div className="alert alert-info">
  //         <h4>Exam Results</h4>
  //         <p><strong>Score:</strong> {result.score} / {result.totalMarks}</p>
  //         <p><strong>Status:</strong> {result.passed ? 'Passed' : 'Failed'}</p>
  //         <h5>Answer Details:</h5>
  //         <ul>
  //           {result.results.map((res, index) => (
  //             <li key={index}>
  //               <strong>Question {index + 1}:</strong> {res.question}<br />
  //               <strong>Your Answer:</strong> {res.selectedAnswer || 'Not answered'}<br />
  //               <strong>Correct Answer:</strong> {res.correctAnswer}<br />
  //               <strong>Result:</strong> {res.isCorrect ? 'Correct' : 'Incorrect'}
  //             </li>
  //           ))}
  //         </ul>
  //       </div>
  //     ) : (
  //       <>
  //         {!testStarted && (
  //           <div className="alert alert-warning">
  //             Please start the test by selecting an answer. The test will expire in 30 seconds if not started.
  //           </div>
  //         )}
  //         <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
  //           {questions.map((q, index) => (
  //             <div key={q._id} className="card mb-3">
  //               <div className="card-body">
  //                 <h5>Question {index + 1}: {q.question}</h5>
  //                 <div className="form-check">
  //                   <input
  //                     type="radio"
  //                     name={`question-${q._id}`}
  //                     value={q.optionA}
  //                     checked={answers[q._id] === q.optionA}
  //                     onChange={() => handleAnswerChange(q._id, q.optionA)}
  //                     className="form-check-input"
  //                     id={`optionA-${q._id}`}
  //                     disabled={submitted}
  //                   />
  //                   <label className="form-check-label" htmlFor={`optionA-${q._id}`}>
  //                     {q.optionA}
  //                   </label>
  //                 </div>
  //                 <div className="form-check">
  //                   <input
  //                     type="radio"
  //                     name={`question-${q._id}`}
  //                     value={q.optionB}
  //                     checked={answers[q._id] === q.optionB}
  //                     onChange={() => handleAnswerChange(q._id, q.optionB)}
  //                     className="form-check-input"
  //                     id={`optionB-${q._id}`}
  //                     disabled={submitted}
  //                   />
  //                   <label className="form-check-label" htmlFor={`optionB-${q._id}`}>
  //                     {q.optionB}
  //                   </label>
  //                 </div>
  //                 <div className="form-check">
  //                   <input
  //                     type="radio"
  //                     name={`question-${q._id}`}
  //                     value={q.optionC}
  //                     checked={answers[q._id] === q.optionC}
  //                     onChange={() => handleAnswerChange(q._id, q.optionC)}
  //                     className="form-check-input"
  //                     id={`optionC-${q._id}`}
  //                     disabled={submitted}
  //                   />
  //                   <label className="form-check-label" htmlFor={`optionC-${q._id}`}>
  //                     {q.optionC}
  //                   </label>
  //                 </div>
  //                 <div className="form-check">
  //                   <input
  //                     type="radio"
  //                     name={`question-${q._id}`}
  //                     value={q.optionD}
  //                     checked={answers[q._id] === q.optionD}
  //                     onChange={() => handleAnswerChange(q._id, q.optionD)}
  //                     className="form-check-input"
  //                     id={`optionD-${q._id}`}
  //                     disabled={submitted}
  //                   />
  //                   <label className="form-check-label" htmlFor={`optionD-${q._id}`}>
  //                     {q.optionD}
  //                   </label>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //           <button type="submit" className="btn btn-primary" disabled={submitted}>
  //             Submit Exam
  //           </button>
  //         </form>
  //       </>
  //     )}
  //   </div>
  // );
  return (
  <div style={{ padding: '2rem', backgroundColor: '#f4f6f9' ,marginTop:"-17px"}}>
    <div style={{ maxWidth: '97%', margin: '0 auto', backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      
      <h2 style={{ fontWeight: '700', marginBottom: '1rem', color: '#333' }}>{exam.title}</h2>

      <div style={{ marginBottom: '1.5rem', fontSize: '16px', lineHeight: '1.6' }}>
        <p><strong>⏱ Duration:</strong> {exam.duration} minutes</p>
        <p><strong>📋 Total Marks:</strong> {exam.totalMarks}</p>
        <p><strong>✅ Passing Marks:</strong> {exam.passingMarks}</p>
        <p style={{ color: 'red' }}><strong>⏳ Time Left:</strong> {formatTime(timeLeft)}</p>
      </div>

      {submitted && result ? (
        <div style={{ backgroundColor: '#e3f2fd', padding: '1.5rem', borderRadius: '8px' }}>
          <h4 style={{ fontWeight: '600' }}>📊 Exam Results</h4>
          <p><strong>Score:</strong> {result.score} / {result.totalMarks}</p>
          <p><strong>Status:</strong> {result.passed ? '✅ Passed' : '❌ Failed'}</p>
          <h5>Answer Details:</h5>
          <ul>
            {result.results.map((res, index) => (
              <li key={index} style={{ marginBottom: '1rem' }}>
                <strong>Question {index + 1}:</strong> {res.question}<br />
                <strong>Your Answer:</strong> {res.selectedAnswer || 'Not answered'}<br />
                <strong>Correct Answer:</strong> {res.correctAnswer}<br />
                <strong>Result:</strong> {res.isCorrect ? '✅ Correct' : '❌ Incorrect'}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          {!testStarted && (
            <div style={{ backgroundColor: '#fff3cd', padding: '1rem', borderRadius: '8px', border: '1px solid #ffeeba', marginBottom: '1.5rem', color: '#856404' }}>
              ⚠️ Please start the test by selecting an answer. The test will expire in 30 seconds if not started.
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            {questions.map((q, index) => (
              <div key={q._id} style={{
                backgroundColor: '#fff',
                padding: '1.5rem',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                borderLeft: '4px solid #007bff',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
              }}>
                <h5 style={{ fontWeight: '600', marginBottom: '1rem' }}>
                  Q{index + 1}: {q.question}
                </h5>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '2px',
                }}>
                  {[q.optionA, q.optionB, q.optionC, q.optionD].map((opt, idx) => {
                    const optId = `${q._id}-option-${idx}`;
                    return (
                      <label
                        key={optId}
                        htmlFor={optId}
                        style={{
                          flex: '0 0 calc(50% - 8px)',
                          display: 'flex',
                          alignItems: 'center',
                          paddingTop: '12px',
                          paddingBottom:'12px',
                          borderRadius: '8px',
                          border: '1px solid #ddd',
                          cursor: submitted ? 'not-allowed' : 'pointer',
                          backgroundColor: answers[q._id] === opt ? '#eaf4ff' : '#fff',
                          transition: 'all 0.2s ease',
                          gap: '4px',
                          fontSize: '15px',
                          fontWeight: 500,
                          color: '#333',
                          boxShadow: 'inset 0 0 0 1px transparent',
                        }}
                        onMouseEnter={e => {
                          if (!submitted) e.currentTarget.style.boxShadow = 'inset 0 0 0 1px #007bff';
                        }}
                        onMouseLeave={e => {
                          if (!submitted) e.currentTarget.style.boxShadow = 'inset 0 0 0 1px transparent';
                        }}
                      >
                        <input
                          type="radio"
                          name={`question-${q._id}`}
                          value={opt}
                          id={optId}
                          checked={answers[q._id] === opt}
                          onChange={() => handleAnswerChange(q._id, opt)}
                          disabled={submitted}
                          style={{
                            marginLeft: '-160px',
                            transform: 'scale(1.2)',
                            accentColor: '#007bff',
                            cursor: submitted ? 'not-allowed' : 'pointer',
                          }}
                        />
                        {opt}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button
                type="submit"
                disabled={submitted}
                style={{
                  backgroundColor: '#007bff',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(0, 123, 255, 0.2)',
                  transition: 'background-color 0.3s ease',
                }}
              >
                 Submit Exam
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  </div>
);

};

export default GetExams;
