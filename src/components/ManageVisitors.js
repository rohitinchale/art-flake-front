import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageVisitors = () => {
  const [visitors, setVisitors] = useState([]);
  const [formValues, setFormValues] = useState({
    id: null,
    username: '',
    email: '',
  });
  const [currentOperation, setCurrentOperation] = useState(null);

  useEffect(() => {
    // Fetch visitors data when the component mounts
    const fetchVisitors = async () => {
      try {
        // Call the endpoint to get users with the role VISITOR
        const response = await axios.get('http://localhost:8080/user/role/VISITOR');
        setVisitors(response.data);
      } catch (error) {
        console.error('Error fetching visitors:', error);
      }
    };

    fetchVisitors();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handle form submission for adding or updating
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { id, username, email } = formValues;

      if (id === null) {
        // Add new visitor
        await axios.post('http://localhost:8080/user', { username, email, role: 'VISITOR', password: 'defaultPassword' });
      } else {
        // Update existing visitor
        await axios.put(`http://localhost:8080/user/${id}`, { username, email, role: 'VISITOR', password: 'defaultPassword' });
      }

      // Refresh the visitor list
      const response = await axios.get('http://localhost:8080/user/role/VISITOR');
      setVisitors(response.data);
      resetForm();
      setCurrentOperation(null);
    } catch (error) {
      console.error('Error saving visitor:', error);
    }
  };

  // Handle delete operation
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:8080/user/${formValues.id}`);
      // Refresh the visitor list
      const response = await axios.get('http://localhost:8080/user/role/VISITOR');
      setVisitors(response.data);
      resetForm();
      setCurrentOperation(null);
    } catch (error) {
      console.error('Error deleting visitor:', error);
    }
  };

  // Reset form values
  const resetForm = () => {
    setFormValues({
      id: null,
      username: '',
      email: '',
    });
  };

  // Handle edit operation
  const handleEdit = (visitor) => {
    setFormValues(visitor);
    setCurrentOperation('update');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Manage Visitors</h2>

      {/* Buttons to Show Different Operations */}
      <div className="d-flex justify-content-around mb-4">
        <button className="btn btn-primary" onClick={() => setCurrentOperation('add')}>
          Add Visitor
        </button>
        <button className="btn btn-warning" onClick={() => setCurrentOperation('update')}>
          Update Visitor
        </button>
        <button className="btn btn-danger" onClick={() => setCurrentOperation('delete')}>
          Delete Visitor
        </button>
      </div>

      {/* Add Visitor Form */}
      {currentOperation === 'add' && (
        <div className="card mt-4">
          <div className="card-header">Add Visitor</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="visitorUsername" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="visitorUsername"
                  name="username"
                  value={formValues.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="visitorEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="visitorEmail"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">
                Add Visitor
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Update Visitor Form */}
      {currentOperation === 'update' && (
        <div className="card mt-4">
          <div className="card-header">Update Visitor</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="visitorUsername" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="visitorUsername"
                  name="username"
                  value={formValues.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="visitorEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="visitorEmail"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  required
                />
              </div>
              <button type="submit" className="btn btn-warning">
                Update Visitor
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Visitor Form */}
      {currentOperation === 'delete' && (
        <div className="card mt-4">
          <div className="card-header">Delete Visitor</div>
          <div className="card-body">
            <form onSubmit={handleDelete}>
              <div className="mb-3">
                <label htmlFor="deleteVisitorId" className="form-label">
                  Visitor ID
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="deleteVisitorId"
                  name="id"
                  value={formValues.id || ''}
                  onChange={handleInputChange}
                  placeholder="Enter visitor ID"
                  required
                />
              </div>
              <button type="submit" className="btn btn-danger">
                Confirm Delete
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => setCurrentOperation(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Visitors List */}
      <div className="mt-5">
        <h3>Visitors List</h3>
        <div className="list-group">
          {visitors.map((visitor) => (
            <div key={visitor.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{visitor.username}</strong>
                <p>{visitor.email}</p>
              </div>
              <div>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(visitor)}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageVisitors;
