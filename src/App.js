import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import {useRef} from 'react'
import { useStore, actions } from './store'

function App(){
  const inputRef = useRef()
  const [isEdit, setIsEdit] = useState(false)
  const [indexingEdit, setIndexingEdit] = useState(0)
  const [state, dispatch] = useStore() 
  const {todos, todoInput} = state
  // const [indexEditing, setIndexEditing] = useState(0);
  const handleSubmit = () =>{
    isEdit ? dispatch(actions.editTodo(indexingEdit)) : dispatch(actions.addTodo(todoInput))
      dispatch(actions.setTodoInput(''))
      inputRef.current.focus()
      setIsEdit(false)
  }
  const handleDelete = () =>{
    dispatch(actions.deleteTodo(todoInput))
    dispatch(actions.setTodoInput(''))
    inputRef.current.focus()
  }
  const handleEdit = (index) => {
    dispatch(actions.setTodoInput(todos[index]))
    inputRef.current.focus()
    setIsEdit(true)
    setIndexingEdit(index)
  }
  console.log(state); 
  console.log('todoInput: ', todoInput);
  console.log('todo : ', todos);
  return(
      <div className='app' style={{padding:'20px', paddingLeft:'100px'}}>
        <h1>Todo List</h1>
        <input
            ref={inputRef}
            value={todoInput}
            placeholder="Enter todo ..."
            onChange={e => {
                dispatch(actions.setTodoInput(e.target.value))
            }}
        />
        <button onClick={() => {todoInput !== "" && handleSubmit();}}>{isEdit ? "Edit" : "Add"}</button>
        {todos.map((todo, index) => ( 
          <li key={index}>{todo} <span style={{paddingLeft: '20px'}}
          onClick={handleDelete}
          >Remove</span> <span style={{paddingLeft: '20px'}} onClick={() => handleEdit(index)}>Edit</span></li> 
        ))}
      </div>
    )
}
export default App;
