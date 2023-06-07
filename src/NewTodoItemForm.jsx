import React, { useState } from 'react';

// NewTodoItemFormコンポーネント：新しいTODOアイテムを追加するフォームのコンポーネント
function NewTodoINewTodoItemFormtemForm({ onAddButtonClick }) {
    const [title, setTitle] = useState('');
  
    const handleAddButtonClick = () => {
      if (title) {
        onAddButtonClick(title);
        setTitle('');
      }
    };
  
    return (
      <div>
        <input
          type="text"
          id="new-todo-item-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button id="new-todo-item-add-button" onClick={handleAddButtonClick}>
          Add
        </button>
      </div>
    );
  }

  export default NewTodoItemForm;