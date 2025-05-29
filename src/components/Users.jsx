import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_BASE_URL || 'api/';

function Users() {
  
  const [users, setusers] = useState([])

  useEffect(() => {
       axios.get(`${apiUrl}/user/allUsers`)
      .then(result => setusers(result.data))
      .catch(err => console.log(err))
  }, [])

   const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`${apiUrl}/user/users/${userId}`)
        .then(() => {
          alert("User deleted successfully!");
          setusers(users.filter(user => user._id !== userId));
        })
        .catch(err => {
          console.error(err);
          alert("Failed to delete user.");
        });
    }
  };

 return (
    <div className="container py-5">
      <div className="card shadow mt-5">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">User CRUD</h4>
          <div>
            <Link to="/create" className="btn btn-light btn-sm me-2">Add User</Link>
            <Link to="/contact" className="btn btn-light btn-sm">Contact</Link>
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table className="table table-hover table-striped mb-0">
              <thead className="table-primary sticky-top">
                <tr>
                  <th>#</th><th>Name</th><th>Email</th><th>Age</th><th className="text-center">Actions</th>

                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={user._id}>
                    <td>{i + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td className="text-center">
                      <Link to={`/update/${user._id}`} className="btn btn-sm btn-warning me-1">Update</Link>
                      <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;