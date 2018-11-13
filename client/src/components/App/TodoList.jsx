import React from 'react';
import moment from 'moment';

const Todo = ({todo, index, toggle}) => {
  let todoStyles = ['task']
  if (todo.complete) { todoStyles.push('task__complete'); }
  return(
    <tr className={todoStyles.join(' ')}>
      <td className="task__goal" style={{backgroundColor: `${todo.goal.color || '#ECECEC'}`}}>{todo.goal.name}</td>
      <td><input type="checkbox" onChange={() => toggle(index)} defaultChecked={todo.complete} disabled={todo.complete}/></td>
      <td className="task__description">{todo.description}</td>
      <td>{todo.completionDate ? `Completed: ${moment(todo.completionDate).fromNow()}` : ''}</td>
    </tr>
  )
}


const TodoList = ({todos, toggle}) => {
  return(
    <table>
      <tbody>
        {todos.map( (todo, index) => <Todo todo={todo} index={index} toggle={toggle} key={todo._id} />)}
      </tbody>
    </table>
  )
}
export default TodoList;