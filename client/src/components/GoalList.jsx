import React from 'react';

const Goal = ({goal, setActive, activeGoal, index}) => {
  let goalStyles = ['goal'];
  if (activeGoal === index) { goalStyles.push('goal__active'); }
  return(
    <div className={goalStyles.join(' ')} onClick={()=> setActive(index)}>
      <div className="goal__name">{goal.name}</div>
      <div className="goal__score-display">
        <div className="goal__score" style={{ backgroundColor: `${goal.color || '#ECECEC'}` , width: `${goal.score}%`}}>{goal.score}</div>
      </div>
    </div>
  )
}

const GoalList = ({goals, setActive, activeGoal}) => (
  <div>
    {goals.map( (goal, index) => <Goal goal={goal} setActive={setActive} activeGoal={activeGoal} index={index} key={goal._id} />)}
  </div>
)

export default GoalList;