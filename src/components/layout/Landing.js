import React, { Component } from "react";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h2>This is landing page</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Landing);
