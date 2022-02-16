import React from 'react';

const SearchSeries = (props) => {
  
  const handleChange = (e) => {  // call handleChange() in onChange
    props.searchValue(e.target.value);
  };
  
  return (
    <form method="POST" onSubmit={(e) => {e.preventDefault();}} name="formName" className="center">
      <label>
        <span>Search Series: </span>
        <input autoComplete="off" type="text" name="searchTerm" onChange={handleChange}/>
      </label>
    </form>
  );
};

export default SearchSeries
