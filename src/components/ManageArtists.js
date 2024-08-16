import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageArtists = () => {
  const [artists, setArtists] = useState([]);
  const [formValues, setFormValues] = useState({
    id: null,
    name: '',
    bio: '',
    profilePicture: '',
  });
  const [currentOperation, setCurrentOperation] = useState(null);

  useEffect(() => {
    // Fetch artists data when the component mounts
    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:8080/artist'); // Update URL as needed
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
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
      const { id, name, bio, profilePicture } = formValues;

      if (id === null) {
        // Add new artist
        await axios.post('http://localhost:8080/artist', { name, bio, profilePicture });
      } else {
        // Update existing artist
        await axios.put(`http://localhost:8080/artist/${id}`, { name, bio, profilePicture });
      }

      // Refresh the artist list
      const response = await axios.get('http://localhost:8080/artist');
      setArtists(response.data);
      resetForm();
      setCurrentOperation(null);
    } catch (error) {
      console.error('Error saving artist:', error);
    }
  };

  // Handle delete operation
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:8080/artist/${formValues.id}`);
      // Refresh the artist list
      const response = await axios.get('http://localhost:8080/artist');
      setArtists(response.data);
      resetForm();
      setCurrentOperation(null);
    } catch (error) {
      console.error('Error deleting artist:', error);
    }
  };

  // Reset form values
  const resetForm = () => {
    setFormValues({
      id: null,
      name: '',
      bio: '',
      profilePicture: '',
    });
  };

  // Handle edit operation
  const handleEdit = (artist) => {
    setFormValues(artist);
    setCurrentOperation('update');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Manage Artists</h2>

      {/* Buttons to Show Different Operations */}
      <div className="d-flex justify-content-around mb-4">
        <button className="btn btn-primary" onClick={() => setCurrentOperation('add')}>
          Add Artist
        </button>
        <button className="btn btn-warning" onClick={() => setCurrentOperation('update')}>
          Update Artist
        </button>
        <button className="btn btn-danger" onClick={() => setCurrentOperation('delete')}>
          Delete Artist
        </button>
      </div>

      {/* Add Artist Form */}
      {currentOperation === 'add' && (
        <div className="card mt-4">
          <div className="card-header">Add Artist</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="artistName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="artistName"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  placeholder="Enter artist name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="artistBio" className="form-label">
                  Bio
                </label>
                <textarea
                  className="form-control"
                  id="artistBio"
                  name="bio"
                  value={formValues.bio}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Enter artist bio"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="artistProfilePicture" className="form-label">
                  Profile Picture URL
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="artistProfilePicture"
                  name="profilePicture"
                  value={formValues.profilePicture}
                  onChange={handleInputChange}
                  placeholder="Enter profile picture URL"
                />
              </div>
              <button type="submit" className="btn btn-success">
                Add Artist
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Update Artist Form */}
      {currentOperation === 'update' && (
        <div className="card mt-4">
          <div className="card-header">Update Artist</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="artistName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="artistName"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  placeholder="Enter artist name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="artistBio" className="form-label">
                  Bio
                </label>
                <textarea
                  className="form-control"
                  id="artistBio"
                  name="bio"
                  value={formValues.bio}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Enter artist bio"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="artistProfilePicture" className="form-label">
                  Profile Picture URL
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="artistProfilePicture"
                  name="profilePicture"
                  value={formValues.profilePicture}
                  onChange={handleInputChange}
                  placeholder="Enter profile picture URL"
                />
              </div>
              <button type="submit" className="btn btn-warning">
                Update Artist
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Artist Form */}
      {currentOperation === 'delete' && (
        <div className="card mt-4">
          <div className="card-header">Delete Artist</div>
          <div className="card-body">
            <form onSubmit={handleDelete}>
              <div className="mb-3">
                <label htmlFor="deleteArtistId" className="form-label">
                  Artist ID
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="deleteArtistId"
                  name="id"
                  value={formValues.id || ''}
                  onChange={handleInputChange}
                  placeholder="Enter artist ID"
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

      {/* Artists List */}
      <div className="mt-5">
        <h3>Artists List</h3>
        <div className="list-group">
          {artists.map((artist) => (
            <div key={artist.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{artist.name}</strong>
                <p>{artist.bio}</p>
                <p><small>Profile Picture: {artist.profilePicture}</small></p>
              </div>
              <div>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(artist)}>
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

export default ManageArtists;
