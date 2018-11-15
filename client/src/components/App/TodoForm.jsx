import React from 'react';
import {Component} from 'react';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoName: ''
    }
    this._handleInputChange = this._handleInputChange.bind(this);
    this.validateSubmission = this.validateSubmission.bind(this);
  }

  _handleInputChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    })
  }

  validateSubmission() {
    if (this.state.todoName.trim()) {
      this.props.submitTodo(this.state.todoName);
      this.setState({
        todoName: ''
      })
    }
  }

  render() {
    if (this.props.activeGoal) {
      return(
        <div className="submit__form">
          <input name="todoName" className="input__text" type="text" value={this.state.todoName} onChange={this._handleInputChange}></input>
          <button className="input__submit" onClick={this.validateSubmission}>+</button>
        </div>
      )
    } else {
      return(
        <div className="submit__form">
          <input name="todoName" className="input__text disabled" type="text" value={this.state.todoName} onChange={this._handleInputChange}  placeholder="Choose a Goal First"></input>
          <button className="input__submit">+</button>
        </div>
      )
    }
  }

}

export default TodoForm;