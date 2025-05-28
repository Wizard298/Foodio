import React, { useContext, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import { CartContext } from "./Cart.jsx";

function Browse({searchQuery}) {
  const { state } = useContext(CartContext);
  const [search, setSearch] = useState(searchQuery);
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Flatten items correctly from the nested structure
  const getAllItems = () => {
    const categories = Object.keys(state.item); // ['burger', 'cake', ...]
    let items = [];
    categories.forEach(category => {
      items = [...items, ...state.item[category]]; // Flatten items per category
    });
    return items;
  };

  const allItems = getAllItems();

  const filteredItems = allItems.filter((item) => {
    // If search is empty, only apply category filter
    if (!search.trim()) {
      return categoryFilter === "all" || item.category === categoryFilter;
    }

    // If search exists, check name & description
    const matchesSearch = 
      item.name.toLowerCase().includes(search.toLowerCase()) || 
      item.description.toLowerCase().includes(search.toLowerCase());
    
    // Apply category filter only if needed
    const matchesCategory = 
      categoryFilter === "all" || 
      item.category.toLowerCase() === categoryFilter.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ margin: "35px 0px", padding: "0 20px" }}>
      {/* Search & Filter Section */}
      <div style={{ marginBottom: "20px" }}>
        <h1>
          {search 
            ? `Search results for "${search}"` 
            : "Browse All Food Items"}
        </h1>

        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "10px", width: "300px" }}
          />

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: "10px" }}
          >
            <option value="all">All Categories</option>
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
      </div>

      {/* Results Count */}
      {/* <div style={{ marginBottom: "20px" }}>
        {filteredItems.length} {categoryFilter === "all" ? "food" : categoryFilter} items found
      </div> */}

      {filteredItems.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>No items found. Try a different search.</h2>
        ) : (
        <>
            <h2 style={{ textAlign: "center" }}>{filteredItems.length} {categoryFilter === "all" ? "food" : categoryFilter} items found!</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
            {filteredItems.map((item) => (
                <ProductCard
                //   key={item.id}
                id={item.id}
                img={item.img}
                name={item.name}
                price={item.price}
                description={item.description}
                quantity={item.quantity}
                category={item.category}
                cartAdded={item.cartAdded}
                />
            ))}
            </div>
        </>
      )}
    </div>
  );
}

export default Browse;