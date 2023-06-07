// TodoItemコンポーネント：個々のTODOアイテムを表示するコンポーネント
function TodoItem({ id, title, done, onCheckboxChange, onDeleteButtonClick }) {
    return (
      <li>
        <label>
          <input
            type="checkbox"
            className="checkbox"
            checked={done}
            onChange={() => onCheckboxChange(id)}
          />
          {title}
          <button
            className="delete-button"
            onClick={() => onDeleteButtonClick(id)}
          >
            Delete
          </button>
        </label>
      </li>
    );
  }

  export default TodoItem;
  