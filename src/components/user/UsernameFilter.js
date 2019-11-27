import React from "react";

const UsernameFilter = props => {
  return (
    <div className="ui">
      <form
        className="ui form"
        onSubmit={e => {
          e.preventDefault();
          props.searchByUsername();
        }}
      >
        <input
          placeholder="Username"
          className="ui field"
          type="text"
          value={props.username}
          onChange={props.onFilterChange}
        />
        <br />
        <br />
        <div className="ui field">
          <button className="ui button">Search</button>
        </div>
      </form>
    </div>
  );
};

export default UsernameFilter;
