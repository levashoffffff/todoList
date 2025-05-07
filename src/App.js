import './App.css';
import { useState } from 'react';

function App() {
  //state для хранения value в input
  const [inputValue, setInputValue] = useState('');

  const [todoList, setTodo] = useState([
    { id: 1, name: 'купить молоко', checked: false },
    { id: 2, name: 'купить хлеб', checked: false },
    { id: 3, name: 'купить масло', checked: false }
  ]);

  const addHandler = () => {
    if (inputValue) {
      const newArr = [...todoList, { id: Math.random(), name: inputValue, checked: false }];
      /* const newArr = [...todoList, "купить печенье"]; */
      /* newArr.push("купить печенье"); */
      setTodo(newArr);
      setInputValue('');
    }
  }

  const deleteHandler = (id) => {
    const newArr = todoList.filter((el) => el.id !== id);
    setTodo(newArr);
  }

  const inputHandler = (event) => {
    setInputValue(event.target.value);
  }

  return (
    <div className="App">
      <div className='field'>
        <input value={inputValue} onChange={inputHandler} />
        <button onClick={addHandler}>Добавить</button>
      </div>
      {todoList.map((i) => {
        return (
          <div className='block'>
            <div className='block-name'>
              <input type='checkbox' checked={i.checked} />
              <div className='line-name'>{i.name}</div>
            </div>
            <div onClick={() => deleteHandler(i.id)}>X</div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
