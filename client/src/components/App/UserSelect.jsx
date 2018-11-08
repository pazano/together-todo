import React from 'react';

const UserOption = ({user, value, selected}) => (
  <option value={value}>{user.login}</option>
)

const UserSelect = ({users, currentUser, selectUser}) => (
  <div className="userSelect">
    <select onChange={selectUser}>
      {users.map( (user, index) => <UserOption user={user} value={index} selected={currentUser} key={user._id}/>)}
    </select>
  </div>
)

export default UserSelect;