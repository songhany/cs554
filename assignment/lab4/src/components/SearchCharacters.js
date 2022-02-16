import React from 'react';

const SearchCharacters = (props) => {
  
  const handleChange = (e) => {  // call handleChange() in onChange
    props.searchValue(e.target.value);
  };
  
  return (
    <form method="POST" onSubmit={(e) => {e.preventDefault();}} name="formName" className="center">
      <label>
        <span>Search Characters: </span>
        <input autoComplete="off" type="text" name="searchTerm" onChange={handleChange}/>
      </label>
    </form>
  );
};

export default SearchCharacters;
