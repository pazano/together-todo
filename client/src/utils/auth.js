import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';  // TODO move to environment variables

export default {
  validateSession: async (token) => {

  },
  refreshSession: async (token) => {

  },
  retrieveSession: () => {
      return {
        'user': localStorage.getItem('user'),
        'token': localStorage.getItem('token'),
        'expiry': localStorage.getItem('expiry')
      }
  }
}