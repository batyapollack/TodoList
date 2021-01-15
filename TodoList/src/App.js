import './App.css';
import { v4 as uuidv4 } from 'uuid';
import imageTodoList from './imageToDoList.png'
import React , {useState, useEffect, useRef} from 'react'


const App =()=> {
  const [inputValue , setInputValue] = useState('');
  const [listTasks , setListTask] = useState([]);
  const firstRender  = useRef(true);

  const addTask = (e)=>{
    e.preventDefault();
    var inputAfterSpace= inputValue.trim();
    var validInput = inputAfterSpace;
    if(inputAfterSpace !=='')
    {
      if (inputAfterSpace.length > 30)
          validInput =inputAfterSpace.slice(0, 30)
      setListTask([...listTasks, {text: validInput, id: uuidv4()}]);
    }
    setInputValue('');
  }

  const deleteTask = (id)=>{
    setListTask(listTasks.filter((task) => task.id !== id ));
  };

  // Save list on localStorage
  useEffect(()=>{
      if(firstRender.current)
          firstRender.current = false;
      else
        localStorage.setItem("Todo" , JSON.stringify([...listTasks]));
  } , [listTasks])

  //get list from localStorage
  useEffect(()=>{
   const newList= localStorage.getItem("Todo");
   if(newList!==null)
      setListTask(JSON.parse([...listTasks, newList]));
  },[])

  return (
    <div className="App">
    <div className = "container">
    <img src={imageTodoList}  alt="Logo"/>
    <h2> TO DO LIST </h2> 
    <form onSubmit = {addTask}>
      <input 
      autoFocus
      placeholder = "Add a task..."
      type = "text"
      value ={inputValue}
      onChange={(e) => setInputValue (e.target.value) }
      />
      <button type = "submit">Add</button>

    </form>
    <hr/>
    {
      listTasks.map((task)=>(
        <div className="todo" key={task.id}> 
          <p>{task.text} </p>
          <i className="fas fa-trash" onClick = {()=>deleteTask(task.id)}></i>
      
        </div>
      ))
    }
    </div>
    </div>
  );
}

export default App;
