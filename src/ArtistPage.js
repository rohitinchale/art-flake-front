import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ArtistPage = () => {
  const userJson = localStorage.getItem("user");
  const user = JSON.parse(userJson);
  const [artData, setArtData] = useState([]);
  const [artistData, setArtistData] = useState({
    name: "John Doe",
    bio: "A contemporary artist known for abstract paintings.",
    email: "johndoe@example.com",
    imageUrl: "https://via.placeholder.com/150",
  });
  const [formValues, setFormValues] = useState({
    id: null,
    title: "",
    description: "",
    price: "",
    image: "",
    visible: false,
    artistId: user.id, // Set the artist ID here (this should come from the logged-in user's context or state)
  });

  // Fetch artworks when component mounts
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        console.log(user);
        const response = await axios.get(
          `http://localhost:8080/artworks/artist/${user.id}`
        );
        setArtData(response.data);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };

    fetchArtworks();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formValues,
        image: formValues.image || "https://via.placeholder.com/150", // Ensure image is not null
      };

      if (formValues.id === null) {
        await axios.post("http://localhost:8080/artworks", payload);
      } else {
        await axios.put(
          `http://localhost:8080/artworks/${formValues.id}`,
          payload
        );
      }
      const response = await axios.get(
        `http://localhost:8080/artworks/artist/${user.id}`
      );
      setArtData(response.data);
      resetForm();
    } catch (error) {
      console.error("Error saving artwork:", error);
    }
  };

  const resetForm = () => {
    setFormValues({
      id: null,
      title: "",
      description: "",
      price: "",
      image: "",
      visible: false,
      artistId: user.id, // Set the artist ID here if needed
    });
  };

  // Handle edit operation
  const handleEdit = (id) => {
    console.log("Handle edit called with ID:", id);
    if (id === undefined || id === null) {
      console.error("Invalid ID:", id);
      return;
    }
    const artToEdit = artData.find((art) => art.id === id);
    if (artToEdit) {
      setFormValues(artToEdit);
    } else {
      console.error("Artwork not found for ID:", id);
    }
  };

  // Check if user data exists in localStorage
  let username;
  let email;
  if (userJson) {
    try {
      // Parse the JSON string to a JavaScript object
      const user = JSON.parse(userJson);

      // Access the username from the user object
      username = user.username;
      email = user.email;

      // Log the username to the console
      console.log("Username:", username);
    } catch (error) {
      console.error("Failed to parse user data:", error);
    }
  } else {
    username = "";
    email = "";
    console.log("No user data found in localStorage.");
  }

  // Handle delete operation
  const handleDelete = async (id) => {
    console.log("Handle delete called with ID:", id);
    if (id === undefined || id === null) {
      console.error("Invalid ID for delete:", id);
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/artworks/${id}`);
      // Fetch updated art data
      const response = await axios.get(
        `http://localhost:8080/artworks/artist/${user.id}`
      );
      setArtData(response.data);
    } catch (error) {
      console.error("Error deleting artwork:", error);
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark position-fixed"
        style={{ width: "280px", height: "100vh" }}
      >
        <div className="text-center mb-3">
          <img
            src={artistData.imageUrl}
            alt="Artist"
            width="80"
            height="80"
            className="rounded-circle"
          />
        </div>
        <hr />
        <div>
          <h6>Bio:</h6>
          <p>{artistData.bio}</p>
        </div>
        <div>
          <h6>Email:</h6>
          <p>{email}</p>
        </div>
        <div className="mt-auto">
          <hr />
          <h4 className="text-center">{username}</h4>
        </div>
      </div>

      {/* Main Content */}
      <div className="col" style={{ marginLeft: "280px" }}>
        <div className="container mt-5">
          <h2 className="text-center">Artist Dashboard</h2>

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
                  />
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
                    Image URL
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="artImage"
                    name="image"
                    value={formValues.image}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
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
                  <label
                    className="form-check-label"
                    htmlFor="showOnShoppingPage"
                  >
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
                      src={art.image || "https://via.placeholder.com/150"}
                      className="card-img-top"
                      alt={art.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{art.title}</h5>
                      <p className="card-text">Artist ID: {art.artistId}</p>
                      <p className="card-text">{art.description}</p>
                      <p className="card-text">Price: ${art.price}</p>
                      <p className="card-text">
                        Show on Shopping Page: {art.visible ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className="card-footer">
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => handleEdit(art.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
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
      </div>
    </div>
  );
};

export default ArtistPage;
