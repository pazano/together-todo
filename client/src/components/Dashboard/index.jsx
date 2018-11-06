import React from 'react';
import {Component} from 'react';

import UserSelect from './UserSelect.jsx';
import GoalList from './GoalList.jsx';
import TodoList from './TodoList.jsx';
import GoalForm from './GoalForm.jsx';
import TodoForm from './TodoForm.jsx';

import utils from '../../utils';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      currentUser: 0,
      activeGoal: null,
      goals: [],
      todos: []
    }
    this.selectUser = this.selectUser.bind(this);
    this.toggleActiveGoal = this.toggleActiveGoal.bind(this);
    this.submitGoal = this.submitGoal.bind(this);

    this.submitTodo = this.submitTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);

    this.refreshGoals = this.refreshGoals.bind(this); // TODO:  use these in INIT()
    this.refreshTodos = this.refreshTodos.bind(this);
  }

  componentDidMount() {
    // utils.api.users.getAll()
    //   .then(users => {
    //     this.setState({
    //       allUsers: users
    //     });
    //     return utils.api.initialize(users[this.state.currentUser]._id); //MOVE TO APP INITIALIZE FN
    //   })
    //   .then(results => {
    //     let [initGoals, initTodos] = results;
    //     console.log(`User has ${initGoals.length} goals and ${initTodos.length} todos`);
    //     this.setState({
    //       goals: initGoals,
    //       todos: initTodos
    //     })
    //   })
    //   .catch(err => console.log(err));
  }

  toggleActiveGoal(index) {
    let newActive = this.state.activeGoal === index ? null : index; // clicking on the active should unset it
    this.setState({
      activeGoal: newActive
    }, () => this.refreshTodos()); // then refresh todo list
  }

  refreshGoals() {
    let currentUserId = this.state.allUsers[this.state.currentUser]._id;
    utils.api.goals.userGoals(currentUserId)
      .then(foundGoals => {
        this.setState({
          goals: foundGoals
        }) // CARE:  manage active selections when refreshed?  goals may have changed
      })
      .catch(err => console.log(err));
  }

  refreshTodos(updateTodos = [...this.state.todos]) {
    updateTodos.sort( (a, b) => {
      if (a.complete === b.complete) {
        return a.created - b.created;
      } else {
        return a.complete - b.complete;
      }
    })
    this.setState({
      todos: updateTodos
    })
  }

  submitTodo(goal, description) {
    let currentUserId = this.state.allUsers[this.state.currentUser]._id;
    utils.api.todos.createTodo(currentUserId, goal, description)
      .then(newTodo => {
        this.refreshTodos([newTodo, ...this.state.todos])
      })
      .catch(err => console.log(err));
  }

  toggleTodo(index) {
    let todo = this.state.todos[index]
    utils.api.todos.toggleComplete(todo._id, !todo.complete)
      .then(updatedTodo => {
        let updatedList = [...this.state.todos];
        updatedList[index] = updatedTodo;
        this.refreshTodos(updatedList);
        this.refreshGoals();
      })
      .catch(err => console.log(err));
  }

  submitGoal(name, color) {
    let currentUserId = this.state.allUsers[this.state.currentUser]._id;
    utils.api.goals.createGoal(currentUserId, name, color)
      .then(newGoal => {
        this.setState({
          goals: [...this.state.goals, newGoal]
        })
      })
      .catch(err => console.log(err));
  }

  selectUser(e) {
    this.setState({
      currentUser: e.target.value
    }, () => console.log(`Updated current user to ${this.state.allUsers[this.state.currentUser].login}`))

    // TODO: re-initialize the interface
  }

  render() {
    return(
      <div>
        <div className="header">
          <h1>Momentum Todos</h1>
        </div>
        <div className="container">
          <h2>Goals</h2>
          {/* <GoalList goals={this.state.goals} setActive={this.toggleActiveGoal} activeGoal={this.state.activeGoal} />
          <GoalForm submitGoal={this.submitGoal} /> */}
          <h2>Todos</h2>
          {/* <TodoForm goals={this.state.goals} submitTodo={this.submitTodo} />
          <TodoList
            todos={this.state.todos}
            activeGoalId={this.state.activeGoal !== null ? this.state.goals[this.state.activeGoal]._id : null}
            toggle={this.toggleTodo}  /> */}
        </div>
      </div>
    )
  }
}

export default Dashboard;