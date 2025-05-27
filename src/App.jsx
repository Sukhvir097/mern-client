import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Users from './components/Users';
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';
import ContactFrom from './components/ContactFrom';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Users />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/update/:id" element={<UpdateUser />} />
        <Route path="/contact" element={<ContactFrom />} />
      </Routes>
    </Router>
  );
}

export default App;
