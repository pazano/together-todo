import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';  // TODO move to environment variables

const api = {};

api.users = {
  getAll: () => {
    return new Promise( (resolve, reject) => {
      axios.get(`${API_BASE}/users`)
        .then(users => resolve(users.data))
        .catch(err => reject(err));
    })
  }
};

api.relationships = {
  userRelationships: (id) => {
    return new Promise((resolve, reject) => {
      axios.get(`${API_BASE}/relationships`, { params: { user: id } })
        .then(foundGoals => resolve(foundGoals.data))
        .catch(err => reject(err));
    })
  },
  createRelationship: (userOne, userTwo) => {
    return new Promise((resolve, reject) => {
      axios.post(`${API_BASE}/relationships`, { userOne, userTwo })
        .then(relationship => resolve(relationship.data))
        .catch(err => reject(err));
    })
  }
};

api.goals = {
  userGoals: (user, relationship) => {
    return new Promise( (resolve, reject) => {
      axios.get(`${API_BASE}/goals`, { params: {user, relationship} })
        .then(foundGoals => resolve(foundGoals.data))
        .catch(err => reject(err));
    })
  },
  createGoal: (user, name, color) => {
    return new Promise( (resolve, reject) => {
      axios.post(`${API_BASE}/goals`, {user: user, name: name, color: color})
        .then(newGoal => resolve(newGoal.data))
        .catch(err => reject(err));
    })
  }
};

api.todos = {
  userTodos: (id) => {
    return new Promise( (resolve, reject) => {
      axios.get(`${API_BASE}/todos`, { params: {user: id}})
        .then(foundTodos => resolve(foundTodos.data))
        .catch(err => reject(err));
    })
  },
  createTodo: (user, goal, description) => {
    return new Promise( (resolve, reject) => {
      axios.post(`${API_BASE}/todos`, {user: user, goal: goal, description: description})
        .then(newTodo => resolve(newTodo.data))
        .catch(err => reject(err));
    })
  },
  toggleComplete: (id, complete) => {
    return new Promise( (resolve, reject) => {
      axios.put(`${API_BASE}/todos`, {id: id, complete: complete})
        .then(updatedTodo => resolve(updatedTodo.data))
        .catch(err => reject(err));
    })
  }
};

api.initialize = (id) => {
  console.log(`init for ${id}`);
  return new Promise( (resolve, reject) => {
    return Promise.all([
      api.relationships.userRelationships(id),
      api.goals.userGoals(id),
      api.todos.userTodos(id)
    ])
    .then(results => {
      console.log(results);
      return resolve(results)
    })
    .catch(err => reject(err));
  })
};

export default api;
