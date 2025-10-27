const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const app=express();//means that the server is created for this 

app.use(cors());//establishes the middleware
app.use(express.json());
const URL='mongodb://localhost:27017/examPrep'
mongoose.connect(URL)
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((er)=>{
    console.log(er);
})

// api started
app.use('/api/admin',require('./routes/adminRoutes'))
app.use('/api/session/',require('./routes/sessionRoute'));
app.use('/api/subject/',require('./routes/subjectRoute'));
app.use('/api/exams/',require('./routes/examinationRoute'));
app.use('/api/question/',require('./routes/questionbankRoute'));
app.use('/api/examinee/',require('./routes/examineeRoute'));
app.use('/api/message/', require('./routes/messageRoute'));
app.use('/api/adminDashboard',require('./routes/adminDashboard'));
app.use('/api/dashboard/',require('./routes/userDashboard'));

// api ended



app.listen(5000,()=>{
    console.log("Server is running on http://localhost:5000/");
})