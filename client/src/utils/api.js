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
        .then(foundRelationships => resolve(foundRelationships.data))
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
  relationshipGoals: (relationship) => {
    return new Promise( (resolve, reject) => {
      axios.get(`${API_BASE}/goals`, { params: { relationship } })
        .then(foundGoals => resolve(foundGoals.data))
        .catch(err => reject(err));
    })
  },
  createGoal: (relationship, name, color) => {
    return new Promise( (resolve, reject) => {
      axios.post(`${API_BASE}/goals`, { relationship, name, color })
        .then(newGoal => resolve(newGoal.data))
        .catch(err => reject(err));
    })
  }
};

api.todos = {
  userTodos: (user) => {
    return new Promise( (resolve, reject) => {
      axios.get(`${API_BASE}/todos`, { params: { user }})
        .then(foundTodos => resolve(foundTodos.data))
        .catch(err => reject(err));
    })
  },
  relationshipTodos: (relationship) => {
    return new Promise( (resolve, reject) => {
      axios.get(`${API_BASE}/todos`, { params: { relationship }})
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

api.initialize = (user) => {
  console.log(`init for ${user}`);
  return new Promise( (resolve, reject) => {
    const store = {};
    // currently assuming only one relationship record
    api.relationships.userRelationships(user)
      .then(relationship => {
        store.relationship = relationship;
        return Promise.all([
          api.goals.relationshipGoals(relationship._id),
          api.todos.relationshipTodos(relationship._id)
        ])
      })
    .then(results => {
      console.log(results);
      store.goals = results[0];
      store.todos = results[1];
      return resolve(store)
    })
    .catch(err => reject(err));
  })
};

export default api;
