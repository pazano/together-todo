import React from 'react';
import {Component} from 'react';

class GoalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalName: '',
      colorSelect: '#251605'
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.validateSubmission = this.validateSubmission.bind(this);
  }

  handleInput(e) {
    this.setState({
      goalName: e.target.value
    })
  }

  handleSelect(e) {
    this.setState({
      colorSelect: e.target.value
    })
  }

  validateSubmission() {
    if (this.state.goalName.trim()) {
      this.props.submitGoal(this.state.goalName, this.state.colorSelect);
      this.setState({
        goalName: ''
      })
    }
  }

  render() {
    return(
      <div className="submit__form">
        <select onChange={this.handleSelect}>
          <option value="#251605">#251605</option>
          <option value="#C57B57">#C57B57</option>
          <option value="#F1AB86">#F1AB86</option>
          <option value="#F7DBA7">#F7DBA7</option>
          <option value="#9CAFB7">#9CAFB7</option>
        </select>
        <input className="input__text" type="text" value={this.state.goalName} onChange={this.handleInput}></input>
        <button className="input__submit" onClick={this.validateSubmission}>+</button>
      </div>
    )
  }

}

export default GoalForm;