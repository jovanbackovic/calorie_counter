import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import _ from "lodash";

import { fetchUsers } from "../../actions/user";
import UserItem from "./UserItem";
import UsernameFilter from "./UsernameFilter";

class UserList extends Component {
  state = {
    username: ""
  };

  componentDidMount() {
    this.props.fetchUsers();
  }

  onFilterChange = e => {
    this.setState({ username: e.target.value });
  };

  searchByUsername = () => {
    this.props.fetchUsers(0, this.state.username);
  };

  loadMoreUsers = () => {
    this.props.fetchUsers(this.props.page, this.state.username);
  };

  renderList = users => {
    return (
      <div className="ui middle aligned center aligned grid ">
        <div className="column">
          <h1>User List</h1>
          <br />
          <div className="ui three column center middle aligned grid">
            <div className="left aligned column">
              <Link to="/user_create" className="ui primary button">
                Create new user
              </Link>
            </div>
            <div className="column">
              <UsernameFilter
                searchByUsername={this.searchByUsername}
                username={this.state.username}
                onFilterChange={this.onFilterChange}
              />
            </div>
          </div>
          <br />
          <div className="ui left aligned grid">
            <div className="left floated column">
              <InfiniteScroll
                pageStart={this.props.page}
                loadMore={this.loadMoreUsers}
                hasMore={this.props.hasMoreUsers}
              >
                <div className="ui relaxed divided items">
                  {this.props.users.map(user => (
                    <UserItem user={user} key={user.username} />
                  ))}
                </div>
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { users } = this.props;
    if (users) {
      return this.renderList(users);
    } else {
      return <div>Backo</div>;
    }
  }
}

const mapStateToProps = ({ user }) => {
  return {
    users: _.sortBy(_.values(user.users), "username"),
    hasMoreUsers: user.hasMoreUsers,
    page: user.page
  };
};

export default connect(mapStateToProps, { fetchUsers })(UserList);
