import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';
import NewTodoItemForm from './NewTodoItemForm';

const App = () => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetchTodoList();
  }, []);

  const fetchTodoList = () => {
    fetch('http://localhost:3001/api/v1/list')
      .then((response) => response.json())
      .then((data) => setTodoList(data))
      .catch((error) => console.error('Error fetching todo list:', error));
  };

  const addTodoItem = (title) => {
    fetch('http://localhost:3001/api/v1/add', {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        setTodoList([...todoList, data]);
      })
      .catch((error) => console.error('Error adding todo item:', error));
  };

  const updateTodoItem = (id, done) => {
    fetch(`http://localhost:3001/api/v1/item/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ done }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => fetchTodoList())
      .catch((error) => console.error('Error updating todo item:', error));
  };

  const deleteTodoItem = (id) => {
    fetch(`http://localhost:3001/api/v1/item/${id}`, { method: 'DELETE' })
      .then(() => fetchTodoList())
      .catch((error) => console.error('Error deleting todo item:', error));
  };

  const handleCheckboxChange = (id) => {
    const updatedTodoList = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setTodoList(updatedTodoList);
    updateTodoItem(id, updatedTodoList.find((item) => item.id === id).done);
  };

  const handleDeleteButtonClick = (id) => {
    const updatedTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(updatedTodoList);
    deleteTodoItem(id);
  };

  const postNewTodoItem = (title) => {
    addTodoItem(title);
  };

  return (
    <div>
      <h1>TODO List</h1>
      <TodoList
        todoList={todoList}
        onCheckboxChange={handleCheckboxChange}
        onDeleteButtonClick={handleDeleteButtonClick}
      />
      <NewTodoItemForm onAddButtonClick={postNewTodoItem} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
