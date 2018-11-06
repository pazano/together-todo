import React from 'react';
import {Component} from 'react';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGoal: '',
      todoName: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.validateSubmission = this.validateSubmission.bind(this);
  }

  handleInput(e) {
    this.setState({
      todoName: e.target.value
    })
  }

  handleSelect(e) {
    this.setState({
      selectedGoal: e.target.value
    })
  }

  validateSubmission() {
    if (this.state.todoName.trim() && this.state.selectedGoal.trim()) {
      this.props.submitTodo(this.state.selectedGoal, this.state.todoName);
      this.setState({
        todoName: ''
      })
    }
  }

  render() {
    return(
      <div className="submit__form">
        <select onChange={this.handleSelect}>
          <option value=''>Select a goal</option>
          {this.props.goals.map(goal => <option value={goal._id} key={goal._id}>{goal.name}</option>)}
        </select>
        <input className="input__text" type="text" value={this.state.todoName} onChange={this.handleInput}></input>
        <button className="input__submit" onClick={this.validateSubmission}>+</button>
      </div>
    )
  }

}

export default TodoForm;