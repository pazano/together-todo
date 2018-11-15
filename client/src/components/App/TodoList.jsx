import React from 'react';
import moment from 'moment';
import TodoForm from './TodoForm.jsx';

const Todo = ({todo, index, toggle}) => {
  let todoStyles = ['task']
  if (todo.complete) { todoStyles.push('task__complete'); }
  return(
    <div className={todoStyles.join(' ')}>
      <div className="task__goal" style={{backgroundColor: `${todo.goal.color || '#ECECEC'}`}}>{todo.goal.name}</div>
      <div className="task__action">
        <input type="checkbox" onChange={() => toggle(index)} defaultChecked={todo.complete} disabled={todo.complete}/>
      </div>
      <div className="task__description">{todo.description}</div>
      <div>{todo.completionDate ? `Completed: ${moment(todo.completionDate).fromNow()}` : ''}</div>
    </div>
  )
}


const TodoList = ({owner, todos, toggle, activeUser, setActiveUser}) => {
  console.log(`filtering for ${owner === 'none' ? 'Unassigned' : owner.username}`)
  todos = todos.filter(todo => {
    if (owner === 'none') {
      return todo.assignedTo ? false : true;
    } else {
      return todo.assignedTo ? owner._id === todo.assignedTo._id : false;
    }
  })
  console.log(todos.length);

  let listStyle = ['todo__list'];
  if (activeUser) {
    if (owner._id === activeUser) listStyle.push('active');
  } else {
    if (owner === 'none') listStyle.push('active');
  }

  return(
    <div className={listStyle.join(' ')}>
        <div className="todo__list-owner" onClick={() => setActiveUser(owner)}>
          {owner === 'none' ? 'Unassigned' : owner.username}
        </div>
        {todos.map( (todo, index) => <Todo todo={todo} index={index} toggle={toggle} key={todo._id} />)}
    </div>
  )
}
export default TodoList;