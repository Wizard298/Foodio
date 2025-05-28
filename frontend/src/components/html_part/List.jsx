// List.jsx
import React from 'react';
import '../css_part/list.css';

function List() {
  return (
    <div className='list-part-comp'>
      <div className='list-category-comp'>
        <select name="category">
          <option value="all">All Items</option>
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

      <div className='list-search-comp'>
        <input 
          type="search" 
          placeholder="Search for any items..."
          value={search}
          // onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default List;
