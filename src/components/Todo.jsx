import React, { useEffect, useRef, useState } from "react";
import {FaEdit} from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'

function Todo() {
   

    const [todo, setTodo] = useState([])
    const [buttonText, setButtonText] = useState("Add Task")
    const [inputText, setInputText] = useState("")
    const [saveLocal , setSaveLocal] = useState(false) 
    const inputRef = useRef(null)

    
 useEffect(()=>{
    if(localStorage.hasOwnProperty("todo")){
        setTodo(JSON.parse(localStorage.getItem("todo")))
    }       
    setSaveLocal(true)
} ,[])

useEffect(()=>{
     if(saveLocal == true){
         localStorage.setItem("todo" , JSON.stringify(todo))
     }
 } , [todo])

 const handleInputChange = (e)=>{
     setInputText(e.target.value)
 }

  const handleCreate = ()=>{
    if(inputText.length === 0){
        alert("Please enter a task")
        return 
    }
   
    if(buttonText === "Add Task"){
        setTodo([...todo , inputText])
        setInputText("")
    }else if(buttonText === "Update Task"){
        const updatedTodo = [...todo]
        updatedTodo[inputRef.current.dataset.index] = inputText
        setTodo(updatedTodo)
        setInputText("")
        setButtonText("Add Task")

    }
  }

  const handleDelete = (index)=>{
      const newTodo = [...todo]
      newTodo.splice(index , 1)
      setTodo(newTodo)
 }

 const handleEdit = (index)=>{
  setInputText(todo[index])    
   setButtonText("Update Task")
   inputRef.current.dataset.index = index
   inputRef.current.focus()
 }


  return (
    <>
      <div className="form d-flex gap-2 justify-content-center">
        <div className="input-group flex-nowrap">
          <input
            type="text"
            className="form-control"
            placeholder="Add Task"
            aria-label="Add Task"
            aria-describedby="addon-wrapping"
            value = {inputText}
            onChange = {handleInputChange}
            ref = {inputRef}
          />
        </div>
        <button type="button" className="btn" onClick={handleCreate} style={{backgroundColor : "#6e07f3" , color : "white"}}>
          {buttonText}
        </button>
      </div>
    <div className="list">

    {
        todo.map((todo , index)=>{
            return <div className="todo"  key={index}>{todo} 
            <div className="icons">
              <button className="icon edit" onClick={()=>{handleEdit(index)}} ><FaEdit/></button>
              <button disabled={buttonText === "Update Task"}  className="icon delete" onClick={()=>{handleDelete(index)}}><MdDelete/></button>
            </div>

            </div>
        })
    }

    </div>

    </>
  );
}

export default Todo;
