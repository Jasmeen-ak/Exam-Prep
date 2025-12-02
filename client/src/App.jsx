import './App.css'
import React from 'react'
import {BrowserRouter as Router , Routes , Route} from 'react-router';//component import
import Login from './pages/Login';
import RegisterForm from './RegisterForm';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import Session from './pages/admin/Session';
import Subject from './pages/admin/Subject';
import Examination from './pages/admin/Examination';
import QuestionBank from './pages/admin/QuestionBank';
import Myexams from './pages/user/Myexams';
import UserDashboard from './pages/user/UserDashboard';
import MyResults from './pages/user/MyResults';
import Getexams from './pages/user/Getexams';
import Message from './pages/user/Message';
import ChangePassword from './pages/user/ChangePassword';
import Examinee from './pages/admin/Examinee';
import ReportGeneration from './pages/admin/ReportGeneration';
import AdminChangePassword from './pages/admin/AdminChangepassword';
import MessageReply from './pages/admin/MessageReply';
import AdashboardHome from './pages/admin/AdashboardHome';
import DashboardHome from './pages/user/DashboardHome';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<RegisterForm/>}></Route>
          
          <Route path='/adlogin' element={<AdminLogin/>}></Route>
          <Route path='/adminDashboard' element={<AdminDashboard/>}>
          <Route index element={<AdashboardHome/>}></Route>
          <Route path='session' element={<Session/>}></Route>
          <Route path='subject' element={<Subject/>}></Route>
          <Route path='examinee' element={<Examinee/>}></Route>
          <Route path='examination' element={<Examination/>}></Route>
          <Route path='question' element={<QuestionBank/>}></Route>
          <Route path='reportgeneration' element={<ReportGeneration/>}></Route>
          <Route path='messagereply' element={<MessageReply/>}></Route>
          <Route path='changepassword' element={<AdminChangePassword/>}></Route>
          </Route>

          
          <Route path='/userDashboard' element={<UserDashboard/>}>
          <Route index element={<DashboardHome/>}></Route>
          <Route path='myexams' element={<Myexams/>}></Route>
          <Route path='myresults' element={<MyResults/>}></Route>
          <Route path='getexam/:id' element={<Getexams/>} ></Route>
          <Route path='message' element={<Message/>}></Route>
          <Route path='changepassword' element={<ChangePassword/>}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
