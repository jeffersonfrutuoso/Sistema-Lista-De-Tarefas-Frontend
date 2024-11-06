import React, { useState, useEffect } from 'react';
import { DragDropContext} from 'react-beautiful-dnd';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://sistema-lista-de-tarefas-backend.onrender.com/api/tarefas');
      setTodos(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todo) => {
    try {
      const response = await axios.post('https://sistema-lista-de-tarefas-backend.onrender.com/api/tarefas', todo);
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setShowForm(false);
    } catch (error) {
      alert(error.response?.data?.error || 'Erro ao adicionar tarefa.');
    }
  };

  const editTodo = async (id, updatedTodo) => {
    try {
      const response = await axios.put(`https://sistema-lista-de-tarefas-backend.onrender.com/api/tarefas/${id}`, updatedTodo);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? response.data : todo))
      );
    } catch (error) {
      alert(error.response?.data?.error || 'Erro ao editar tarefa.');
    }
  };

  const deleteTodo = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta tarefa?')) return;

    try {
      await axios.delete(`https://sistema-lista-de-tarefas-backend.onrender.com/api/tarefas/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      alert('Erro ao excluir tarefa.');
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
  
    const reorderedTodos = Array.from(todos);
    const [removed] = reorderedTodos.splice(result.source.index, 1);
    reorderedTodos.splice(result.destination.index, 0, removed);
  
    setTodos(reorderedTodos);
  
    
    const reorderedTasks = reorderedTodos.map((todo, index) => ({
      id: todo.id,
      order: index + 1,
    }));
  
    try {
      await axios.put('https://sistema-lista-de-tarefas-backend.onrender.com/api/tarefas/reorder', {
        reorderedTasks,
      });
      console.log('Ordem atualizada com sucesso no servidor');
    } catch (error) {
      console.error('Erro ao reordenar tarefas:', error);
    }
  };
  

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div>
        <h1>Lista de Tarefas</h1>
        <AddTodoForm addTodo={addTodo} />
        {loading ? <p>Carregando...</p> : <TodoList todos={todos} editTodo={editTodo} deleteTodo={deleteTodo} />}
        
        <button onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? 'Cancelar' : 'incluir nova Tarefa'}
        </button>

        {showForm && <AddTodoForm addTodo={addTodo} />}
      </div>
    </DragDropContext>
  );
};

export default App;
