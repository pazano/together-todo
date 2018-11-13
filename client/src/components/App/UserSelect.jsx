import React from 'react';

const UserOption = ({user, value }) => (
  <option value={user._id}>{user.username}</option>
)

const UserSelect = ({users, activeUser, setActiveUser}) => (
  <div className="userSelect">
    <select onChange={(e) => setActiveUser(e.target.value)}>
      <option value={null}>Unassigned</option>
      {users.map( (user) => <UserOption user={user} selected={activeUser} key={`user-select-${user._id}`}/>)}
    </select>
  </div>
)

export default UserSelect;