import React from "react";

function Search({setSearch}) {
  return (
    <div className="filter">
      <input id="search-bar" 
      type="text" 
      placeholder="Search..."
      onChange={(e)=> setSearch(e.target.value)} 
      autoComplete="off" />
    </div>
  );
}

export default Search;