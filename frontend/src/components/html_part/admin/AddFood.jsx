import React, { useState } from "react";

const AddFood = () => {
  const [imageURL, setImageURL] = useState('');
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("food");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFoodItem = {
      img: imageURL,
      name : productName,
      price,
      description,
      category,
    };
    
    try {
      const response = await fetch(`${process.env.REACT_BACKEND_URL}/add-item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFoodItem),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("Food Item added successfully!");
        // Reset form
        setImageURL("");
        setProductName("");
        setDescription("");
        setCategory("food");
        setPrice("");
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Server error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <div>
        <label>Image URL</label>
        <input
          type="text"
          placeholder="Paste image URL here"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
        {imageURL && (
          <img
            src={imageURL}
            alt="Preview"
            style={{
              maxHeight: "111px",
              marginBottom: "1rem",
              objectFit: "contain",
            }}
          />
        )}
      </div>

      <div>
        <label>Product name</label>
        <input
          type="text"
          placeholder="Type here"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
      </div>

      <div>
        <label>Product description</label>
        <textarea
          placeholder="Write content here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          style={{
            minWidth: "100%",
            minHeight: "90px",
            padding: "0.5rem",
            marginBottom: "1rem",
          }}
        ></textarea>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <div>
          <label>Product category </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: "0.5rem" }}
          >
            <option value="food">Food</option>
            <option value="pizza">Pizza</option>
            <option value="burger">Burger</option>
            <option value="cake">Cake</option>
            <option value="rolls">Rolls</option>
            <option value="pasta">Pasta</option>
            <option value="sandwich">Sandwich</option>
            <option value="chocolate">Chocolate</option>
            <option value="noodles">Noodles</option>
          </select>
        </div>
        <br />
        <div>
          <label>Product Price </label>
          <input
            type="number"
            placeholder="₹60"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ padding: "0.5rem" }}
          />
        </div>
      </div>

      <button
        type="submit"
        style={{
          padding: "0.75rem 2rem",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
        }}
      >
        ADD
      </button>
    </form>
  );
};

export default AddFood;
