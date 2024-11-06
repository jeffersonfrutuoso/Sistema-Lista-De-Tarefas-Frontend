import React, { useState } from 'react';

const TodoItem = ({ todo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({ name: todo.name, cost: todo.cost, dueDate: todo.dueDate});

  


  return (
    <div style={{ background: todo.cost >= 1000 ? 'yellow' : 'white', padding: '10px', margin: '5px 0' }}>
      {isEditing ? (
        <>
          <input
            type="text"
            maxLength="5"
            value={updatedTodo.name}
            onChange={(e) => setUpdatedTodo({ ...updatedTodo, name: e.target.value })}
          />
          <input
            type="number"
            value={updatedTodo.cost}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 15) setUpdatedTodo({ ...updatedTodo, cost: parseFloat(value) });
            }}
          />
          <input
            type="date"
            value={updatedTodo.dueDate ? updatedTodo.dueDate.split('T')[0] : ''} 
            onChange={(e) => setUpdatedTodo({ ...updatedTodo, dueDate: e.target.value })}
          />
          <button onClick={handleUpdate}>Salvar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <h3>ID: {todo.id}</h3>
          <h3>{todo.name}</h3>
          <p>Custo: R$ {todo.cost.toFixed(2)}</p>
          <p>Data Limite: {new Date(todo.dueDate).toLocaleDateString('pt-BR', { timeZone: 'UTC'},)}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={() => deleteTodo(todo.id)}>Excluir</button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
