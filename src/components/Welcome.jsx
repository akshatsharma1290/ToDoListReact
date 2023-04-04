import React from 'react'
import todoImg from "../assets/todoimg.png";
function Welcome() {
 
  return (
    <div className="welcome">
        <img src={todoImg} alt="todoImg" />
        <p>Organize your day with ease.</p>
    </div>
  )
}

export default Welcome