import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ArtistPage = () => {
  const [artData, setArtData] = useState([]);
  const [formValues, setFormValues] = useState({
    id: null,
    title: "",
    description: "",
    price: "",
    visible: false,
    image: null,
    imageUrl: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "image" && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the image
      setFormValues({
        ...formValues,
        image: file,
        imageUrl: imageUrl,
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.id === null) {
      // Create new art entry
      setArtData([...artData, { ...formValues, id: artData.length + 1 }]);
    } else {
      // Update existing art entry
      setArtData(
        artData.map((art) =>
          art.id === formValues.id ? { ...formValues } : art
        )
      );
    }
    resetForm();
  };

  // Reset form after submission
  const resetForm = () => {
    setFormValues({
      id: null,
      title: "",
      description: "",
      price: "",
      visible: false,
      image: null,
      imageUrl: "",
    });
  };

  // Handle edit operation
  const handleEdit = (id) => {
    const artToEdit = artData.find((art) => art.id === id);
    setFormValues(artToEdit);
  };

  // Handle delete operation
  const handleDelete = (id) => {
    setArtData(artData.filter((art) => art.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Admin Dashboard</h2>

      {/* Add New Art Form */}
      <div className="card mt-4">
        <div className="card-header">Add New Art</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="artTitle" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="artTitle"
                name="title"
                value={formValues.title}
                onChange={handleInputChange}
                placeholder="Enter art title"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="artDescription" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="artDescription"
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
                rows="3"
                placeholder="Enter art description"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="artPrice" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="artPrice"
                name="price"
                value={formValues.price}
                onChange={handleInputChange}
                placeholder="Enter art price"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="artImage" className="form-label">
                Upload Image
              </label>
              <input
                type="file"
                className="form-control"
                id="artImage"
                name="image"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="showOnShoppingPage"
                name="visible"
                checked={formValues.visible}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="showOnShoppingPage">
                Show on Shopping Page
              </label>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              {formValues.id === null ? "Submit" : "Update"}
            </button>
          </form>
        </div>
      </div>

      {/* Art List as Cards */}
      <div className="mt-5">
        <h3>Manage Your Artworks</h3>
        <div className="row">
          {artData.map((art) => (
            <div className="col-md-4 mb-4" key={art.id}>
              <div className="card h-100">
                <img
                  src={art.imageUrl || "https://via.placeholder.com/150"}
                  className="card-img-top"
                  alt={art.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{art.title}</h5>
                  <p className="card-text">{art.description}</p>
                  <p className="card-text">Price: ${art.price}</p>
                  <p className="card-text">
                    {art.visible ? "Visible" : "Hidden"}
                  </p>
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(art.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(art.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
