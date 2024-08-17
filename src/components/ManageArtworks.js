import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [formValues, setFormValues] = useState({
    id: null,
    title: '',
    description: '',
    image: '',
    price: '',
    artistId: '',
  });
  const [currentOperation, setCurrentOperation] = useState(null);

  useEffect(() => {
    // Fetch artworks data when the component mounts
    const fetchData = async () => {
      try {
        const artworksResponse = await axios.get('http://localhost:8080/artworks'); // Update URL as needed
        setArtworks(artworksResponse.data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    fetchData();
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
      const { id, title, description, image, price, artistId } = formValues;

      if (id === null) {
        // Add new artwork
        await axios.post('http://localhost:8080/artworks', { title, description, image, price, artistId });
      } else {
        // Update existing artwork
        await axios.put(`http://localhost:8080/artworks/${id}`, { title, description, image, price, artistId });
      }

      // Refresh the artworks list
      const response = await axios.get('http://localhost:8080/artworks');
      setArtworks(response.data);
      resetForm();
      setCurrentOperation(null);
    } catch (error) {
      console.error('Error saving artwork:', error);
    }
  };

  // Handle delete operation
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:8080/artworks/${formValues.id}`);
      // Refresh the artworks list
      const response = await axios.get('http://localhost:8080/artworks');
      setArtworks(response.data);
      resetForm();
      setCurrentOperation(null);
    } catch (error) {
      console.error('Error deleting artwork:', error);
    }
  };

  // Reset form values
  const resetForm = () => {
    setFormValues({
      id: null,
      title: '',
      description: '',
      image: '',
      price: '',
      artistId: '',
    });
  };

  // Handle edit operation
  const handleEdit = (artwork) => {
    setFormValues(artwork);
    setCurrentOperation('update');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Manage Artworks</h2>

      {/* Buttons to Show Different Operations */}
      <div className="d-flex justify-content-around mb-4">
        <button className="btn btn-primary" onClick={() => setCurrentOperation('add')}>
          Add Artwork
        </button>
        <button className="btn btn-warning" onClick={() => setCurrentOperation('update')}>
          Update Artwork
        </button>
        <button className="btn btn-danger" onClick={() => setCurrentOperation('delete')}>
          Delete Artwork
        </button>
      </div>

      {/* Add Artwork Form */}
      {currentOperation === 'add' && (
        <div className="card mt-4">
          <div className="card-header">Add Artwork</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="artworkTitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="artworkTitle"
                  name="title"
                  value={formValues.title}
                  onChange={handleInputChange}
                  placeholder="Enter artwork title"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="artworkDescription" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="artworkDescription"
                  name="description"
                  value={formValues.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Enter artwork description"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="artworkImage" className="form-label">
                  Image URL
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="artworkImage"
                  name="image"
                  value={formValues.image}
                  onChange={handleInputChange}
                  placeholder="Enter artwork image URL"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="artworkPrice" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="artworkPrice"
                  name="price"
                  value={formValues.price}
                  onChange={handleInputChange}
                  placeholder="Enter artwork price"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="artworkArtistId" className="form-label">
                  Artist ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="artworkArtistId"
                  name="artistId"
                  value={formValues.artistId}
                  onChange={handleInputChange}
                  placeholder="Enter artist ID"
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">
                Add Artwork
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Update Artwork Form */}
      {currentOperation === 'update' && (
        <div className="card mt-4">
          <div className="card-header">Update Artwork</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="artworkTitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="artworkTitle"
                  name="title"
                  value={formValues.title}
                  onChange={handleInputChange}
                  placeholder="Enter artwork title"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="artworkDescription" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="artworkDescription"
                  name="description"
                  value={formValues.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Enter artwork description"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="artworkImage" className="form-label">
                  Image URL
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="artworkImage"
                  name="image"
                  value={formValues.image}
                  onChange={handleInputChange}
                  placeholder="Enter artwork image URL"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="artworkPrice" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="artworkPrice"
                  name="price"
                  value={formValues.price}
                  onChange={handleInputChange}
                  placeholder="Enter artwork price"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="artworkArtistId" className="form-label">
                  Artist ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="artworkArtistId"
                  name="artistId"
                  value={formValues.artistId}
                  onChange={handleInputChange}
                  placeholder="Enter artist ID"
                  required
                />
              </div>
              <button type="submit" className="btn btn-warning">
                Update Artwork
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Artwork Form */}
      {currentOperation === 'delete' && (
        <div className="card mt-4">
          <div className="card-header">Delete Artwork</div>
          <div className="card-body">
            <form onSubmit={handleDelete}>
              <div className="mb-3">
                <label htmlFor="deleteArtworkId" className="form-label">
                  Artwork ID
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="deleteArtworkId"
                  name="id"
                  value={formValues.id || ''}
                  onChange={handleInputChange}
                  placeholder="Enter artwork ID"
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

      {/* Artworks List */}
      <div className="mt-5">
        <h3>Artworks List</h3>
        <div className="list-group">
          {artworks.map((artwork) => (
            <div key={artwork.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{artwork.title}</strong>
                <p>{artwork.description}</p>
                <p><small>Price: ${artwork.price}</small></p>
                <p><small>Artist ID: {artwork.artistId}</small></p>
                <img src={artwork.image} alt={artwork.title} style={{ width: '100px', height: '100px' }} />
              </div>
              <div>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(artwork)}>
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

export default ManageArtworks;
