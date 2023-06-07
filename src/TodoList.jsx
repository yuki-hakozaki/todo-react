import TodoItem from './TodoItem';

// TodoListコンポーネント：TODOリストを表示するコンポーネント
function TodoList({ todoList, onCheckboxChange, onDeleteButtonClick }) {
    return (
      <ul id="todo-container">
        {todoList.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            title={item.title}
            done={item.done}
            onCheckboxChange={onCheckboxChange}
            onDeleteButtonClick={onDeleteButtonClick}
          />
        ))}
      </ul>
    );
  }

  export default TodoList;