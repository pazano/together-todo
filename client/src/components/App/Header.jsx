import React from 'react';

const GoalSelect = ({ setActiveGoal, goals }) => {
    return(
      <div>
        <select onChange={(e) => setActiveGoal(e.target.value)}>
          <option value={null}>All</option>
          { goals.map( (goal, index) => <option value={goal._id} key={`goal-option-${index}`}>{goal.name}</option>)}
        </select>
      </div>
    )
};

export default GoalSelect;