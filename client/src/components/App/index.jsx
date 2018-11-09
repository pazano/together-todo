import React from 'react';
import {Component} from 'react';

import UserSelect from './UserSelect.jsx';
import GoalList from './GoalList.jsx';
import TodoList from './TodoList.jsx';
import GoalForm from './GoalForm.jsx';
import TodoForm from './TodoForm.jsx';

import utils from '../../utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relationship: null,
      user: 0,
      partner: null,
      goals: [],
      activeGoal: null,
      todos: [],
      visibleTodos: [],
      prepped: false
    }
    this.initialize = this.initialize.bind(this);

    this.toggleActiveGoal = this.toggleActiveGoal.bind(this);
    this.submitGoal = this.submitGoal.bind(this);

    this.submitTodo = this.submitTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);

    this.refreshGoals = this.refreshGoals.bind(this); // TODO:  use these in INIT()
    this.refreshTodos = this.refreshTodos.bind(this);
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem('user'))
    }, () => this.initialize())
  }

  async initialize() {
    if (this.state.user) {
      try {
        let data = await utils.api.initialize(this.state.user._id);
        console.log('--- init data ---')
        console.log(data);
        let partner = data.relationship.userOne._id === this.state.user._id ?
          { '_id': data.relationship.userTwo._id, 'username': data.relationship.userTwo.username }
          :
          { '_id': data.relationship.userOne._id, 'username': data.relationship.userOne.username };
        this.setState({
          relationship: data.relationship._id,
          partner,
          goals: data.goals,
          todos: data.todos,
          prepped: true
        }, () => 'made it!');
      } catch (e) {
        console.log('an error in init')
      }
    }
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
    utils.api.todos.createTodo(this.state.relationship, goal, description)
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
    utils.api.goals.createGoal(this.state.relationship, name, color)
      .then(newGoal => {
        this.setState({
          goals: [...this.state.goals, newGoal]
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.prepped) {
      return(
        <div>
          <div className="header">
            <h1>Together with {this.state.partner.username}</h1>
          </div>
          <div className="container">
            <h2>Goals</h2>
            <GoalList goals={this.state.goals} setActive={this.toggleActiveGoal} activeGoal={this.state.activeGoal} />
            <GoalForm submitGoal={this.submitGoal} />
            <h2>Todos</h2>
            <TodoForm goals={this.state.goals} submitTodo={this.submitTodo} />
            <TodoList
              todos={this.state.todos}
              activeGoalId={this.state.activeGoal !== null ? this.state.goals[this.state.activeGoal]._id : null}
              toggle={this.toggleTodo}  />
          </div>
        </div>
      )
    } else {
      return (<div>loading...</div>);
    }
  }
}

export default App;