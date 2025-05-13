import './App.css';
import { useState } from 'react';

function App() {
  //state для хранения value в input
  const [inputValue, setInputValue] = useState('');

  //id элмента который редактируем
  const [editedId, setEditedId] = useState(null);

  //state для значения input при клике на карандаш
  const [editedValue, setEditedValue] = useState('');

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

  const checkHandler = (id) => {
    const newArr = todoList.map((el) => {
      if (el.id === id) {
        const copyObj = { ...el };
        //Данной конструкцией меняем true на false и обратно!!!
        copyObj.checked = !copyObj.checked;
        return copyObj;
      }
      return el
    })
    setTodo(newArr);
  }

  const editHandler = (id, name) => {
    setEditedId(id);
    setEditedValue(name);
  }

  const changeName = (id) => {
    const newArr = todoList.map((el) => {
      if (el.id === id) {
        const copyObj = {...el};
        copyObj.name = editedValue;
        return copyObj;
      }
      return el
    })
    setTodo(newArr);
    setEditedId(null);
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
            {i.id === editedId ?
              <div>
                <input className='editedInput' value={editedValue} onChange={(e) => setEditedValue(e.target.value)} />
                <button onClick={() => changeName(i.id)}>add</button>
              </div> :
              <div className='block-name'>
                <input type='checkbox' checked={i.checked} onChange={() => checkHandler(i.id)} />
                <div className={i.checked ? 'line-name' : ''}>{i.name}</div>
              </div>}
            <div className='icons'>
              <div onClick={() => editHandler(i.id, i.name)}>&#128397;</div>
              <div onClick={() => deleteHandler(i.id)}>X</div>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
