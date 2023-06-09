import React from 'react'
import Todoapp from './Todoapp'
import { AiOutlineCloseCircle } from "react-icons/ai";
import models from "./models.css"

function Modal({ closeModel }) {
  return (
    <>
<div className="Model-Wrapper"></div>
      <div className="Model-cointainer">
      <p>this i model</p>
      <AiOutlineCloseCircle
          style={{ height: "50px", width: "50px", float: "right" }}
          onClick={closeModel}
        ></AiOutlineCloseCircle>
     <Todoapp />
     </div>
    </>
  )
}

export default Modal
