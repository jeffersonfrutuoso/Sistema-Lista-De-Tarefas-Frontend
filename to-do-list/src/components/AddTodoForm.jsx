import React, { useState, useRef, useEffect  } from 'react';


const AddTodoForm = ({ addTodo }) => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [dueDate, setDueDate] = useState('');
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus(); 
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (!name || !cost || !dueDate) {
      alert("Por favor, preencha todos os campos.");
      return; 
    }

    if (name.length > 100) {
      alert('O nome da tarefa não pode ter mais de 100 caracteres.');
      return;
    }
    if (parseFloat(cost) > 999999999999999999999) {
      alert('Valor de custo muito alto. Insira um valor menor.');
      return;
    }


    
    addTodo({ name, cost: Number(cost), dueDate });

    
    setName('');
    setCost('');
    setDueDate('');
  };

  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        ref={nameInputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome da tarefa"
        required
      />
      <input
        type="number"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        placeholder="Custo"
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
};

export default AddTodoForm;
