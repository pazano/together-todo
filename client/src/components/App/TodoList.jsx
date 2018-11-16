import React from 'react';

const Todo = ({todo, index, toggle, active}) => {
  let todoStyles = ['task']
  if (todo.complete) { todoStyles.push('task__complete'); }

  if (active) {
    return(
      <div className={todoStyles.join(' ')}>
        <div className="task__goal" style={{backgroundColor: `${todo.goal.color || '#ECECEC'}`}}></div>
        <div className="task__action">
          <input type="checkbox" onChange={() => toggle(todo._id)} defaultChecked={todo.complete} disabled={todo.complete}/>
        </div>
        <div className="task__description">{todo.description}</div>
      </div>
    )
  } else {
    return (
      <div className={todoStyles.join(' ')}>
        <div className="task__goal" style={{ backgroundColor: `${todo.goal.color || '#ECECEC'}` }}></div>
        <div className="task__action">
          <input type="checkbox" onChange={() => toggle(todo._id)} defaultChecked={todo.complete} disabled />
        </div>
        <div className="task__description">{todo.description}</div>
      </div>
    )
  }
}

const TodoList = ({owner, todos, toggle, localUser, activeUser, setActiveUser}) => {
  todos = todos.filter(todo => {
    if (owner === 'none') {
      return todo.assignedTo ? false : true;
    } else {
      return todo.assignedTo ? owner._id === todo.assignedTo._id : false;
    }
  })

  let listStyle = ['todo__list'];
  if (activeUser) {
    if (owner._id === activeUser) listStyle.push('active');
  } else {
    if (owner === 'none') listStyle.push('active');
  }

  let localUserList = owner === 'none' ? false : owner._id === localUser._id

  return(
    <div className={listStyle.join(' ')}>
        <div className="todo__list-owner" onClick={() => setActiveUser(owner)}>
          {owner === 'none' ? 'Unassigned' : owner.username}
        </div>
        {todos.map( (todo, index) => <Todo todo={todo} index={index} toggle={toggle} key={todo._id} active={localUserList} />)}
    </div>
  )
}
export default TodoList;