import React from 'react'
import Home from './components/Home'
import VolunteerDashboard from './components/VolunteerDashboard'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { About } from './components/About'
import InteractiveForm from './components/InteractiveForm';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ThankYou from './components/ThankYou';
import ThankYouKYC from './components/ThankYouKYC';
import Error404 from './components/Error404';
import Applied from './components/Applied'
import Features from './components/Features';
import Team from './components/Team';


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<VolunteerDashboard />} />
          <Route path="/form" element={<InteractiveForm />} />
          <Route path="/about" element={<About />} />
          <Route path='/login' element={< Login />} />
          <Route path='/signup' element={< SignUp />} />
          <Route path='/thanks' element={< ThankYou />} />
          <Route path='/thankskyc' element={< ThankYouKYC />} />
          <Route path='/alreadyapplied' element={< Applied />} />
          <Route path='/features' element={<Features />} />
          <Route path='/team' element={<Team />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </Router>
    </>
  )
}

export default App