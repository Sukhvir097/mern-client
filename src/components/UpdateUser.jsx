import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
import axios from 'axios';

function UpdateUser() {
  const { id } = useParams(); // Get user id from URL
  const navigate = useNavigate();

  // Initialize user state
  const [user, setUser] = useState({name: '', email: '',age: ''});

  // Fetch user data by ID
  useEffect(() => {
    axios.get(`${apiUrl}/user/getUser/${id}`) 
      .then(result => {
        setUser(result.data);  // Set the user data to the state
      })
      .catch(err => console.log(err));
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setUser({
      ...user,[e.target.name]: e.target.value
    });
  };

  // Handle update submission
  const handleUpdate = (e) => {
    e.preventDefault();
    // Make a PUT request to update the user
    axios.put(`${apiUrl}/user/users/${id}`, user)
      .then(() => {
        alert("User updated successfully!");
        navigate('/');  // Redirect after successful update
      })
      .catch(err => {
        console.error(err);
        alert("Failed to update user.");
      });
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg rounded w-50 mx-auto mt-5">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Update User</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" name="name"  value={user.name} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email" 
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                name="age" 
                value={user.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">Update</button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
