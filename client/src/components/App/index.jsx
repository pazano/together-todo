import React from 'react';
import {Component} from 'react';

import GoalSelect from './Header.jsx';
import UserSelect from './UserSelect.jsx';
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';
import TodoListGroup from './TodoListGroup.jsx';

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
      activeUser: null,
      prepped: false
    }
    this.initialize = this.initialize.bind(this);

    this.setActiveGoal = this.setActiveGoal.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
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
          visibleTodos: data.todos,
          prepped: true
        }, () => this.refreshTodos());
      } catch (e) {
        console.log('an error in init')
      }
    }
  }

  setActiveGoal(index) {
    console.warn('active goal being set to ', index);
    this.setState({
      activeGoal: index
    }, () => this.refreshTodos()); // then refresh todo list
  }

  setActiveUser(user) {
    this.setState({
      activeUser: user === 'none' ? null : user._id,
    }, () => this.refreshTodos()); // then refresh todo list
  }

  refreshGoals() {
    utils.api.goals.userGoals(currentUserId)
      .then(foundGoals => {
        this.setState({
          goals: foundGoals
        }) // CARE:  manage active selections when refreshed?  goals may have changed
      })
      .catch(err => console.log(err));
  }

  refreshTodos(updateTodos = [...this.state.todos]) {
    let sortVisible = [...updateTodos];
    // TODO:  rework this to only filter completed tasks
    console.log(sortVisible.length)
    sortVisible.sort( (a, b) => {
      if (a.complete === b.complete) {
        return a.created - b.created;
      } else {
        return a.complete - b.complete;
      }
    })
    this.setState({
      visibleTodos: sortVisible,
    }, () => console.log(this.state.todos.length === this.state.visibleTodos.length))
  }

  submitTodo(description) {
    utils.api.todos.createTodo(this.state.relationship, this.state.activeUser, this.state.activeGoal, description)
      .then(newTodo => {
        console.warn('created new todo');
        console.log(newTodo);
        let newTodoList = [...this.state.todos]
        newTodoList.push(newTodo);
        this.setState({
          todos: newTodoList
        }, () => this.refreshTodos())
      })
      .catch(err => console.warn(err));
  }

  toggleTodo(index) {
    // TODO:  index lookup here won't work across filtered lists

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
        <div className="page">
          <div className="header">
            <GoalSelect setActiveGoal={this.setActiveGoal} goals={this.state.goals} />
          </div>
          <div className="container">
            <TodoListGroup
              user={this.state.user}
              partner={this.state.partner}
              visibleTodos={this.state.visibleTodos}
              toggleTodo={this.toggleTodo}
              activeUser={this.state.activeUser}
              setActiveUser={this.setActiveUser}
            />
          </div>
          <div className="footer">
            <TodoForm activeGoal={this.state.activeGoal} activeUser={this.state.user._id} submitTodo={this.submitTodo} />
          </div>
        </div>
      )
    } else {
      return (<div>loading...</div>);
    }
  }
}

export default App;