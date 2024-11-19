import React from "react";

const Search = ({ setSearchQuery }) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search contacts..."
      className="p-2 border border-gray-300 rounded"
      onChange={handleSearchChange}
    />
  );
};

export default Search;
