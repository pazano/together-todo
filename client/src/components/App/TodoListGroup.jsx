import React from 'react';
import TodoList from './TodoList.jsx';
import './todos.css';

const TodoListGroup = ({ user, partner, visibleTodos, toggleTodo, localUser, activeUser, setActiveUser }) => {
  return(
    <div className="todo__group">
      <TodoList
        owner={user}
        todos={visibleTodos}
        toggle={toggleTodo}
        localUser={localUser}
        activeUser={activeUser}
        setActiveUser={setActiveUser}
         />
      <TodoList
        owner={'none'}
        todos={visibleTodos}
        toggle={toggleTodo}
        localUser={localUser}
        activeUser={activeUser}
        setActiveUser={setActiveUser}
         />
      <TodoList
        owner={partner}
        todos={visibleTodos}
        toggle={toggleTodo}
        localUser={localUser}
        activeUser={activeUser}
        setActiveUser={setActiveUser}
         />
    </div>
  )
}

export default TodoListGroup;