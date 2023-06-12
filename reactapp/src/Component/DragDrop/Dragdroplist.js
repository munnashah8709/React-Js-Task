import React, { useState } from "react";
import Picture from "../DragDrop/Picture";
import { useDrop } from "react-dnd";
import "../DragDrop/dragdrop.css"
import { useNavigate } from "react-router-dom";


const PictureList = [
  {
    id: 1,
    url:
      "https://yt3.ggpht.com/ytc/AAUvwnjOQiXUsXYMs8lwrd4litEEqXry1-atqJavJJ09=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    id: 2,
    url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROYH-uaHxJxZllD4i4p-a6Jx_gDHTAudnBxQ&usqp=CAU",
  },
  {
    id: 3,
    url:
      "https://www.health.com/thmb/3xDFDacpOM86W5vxPgdLbW1Dj_U=/2000x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-513093623-2000-d2c34f10a69e48fdaca806ef3aee3ea2.jpg",
  },
];

function Dragdroplist() {
  const [board, setBoard] = useState([]);


  const navigate=useNavigate();

  const handelnavigate=()=>{
    navigate("/chartinterface")
}
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const pictureList = PictureList.filter((picture) => id === picture.id);
    setBoard((board) => [...board, pictureList[0]]);
  };
  return (
    <>
      <div className="Pictures">
        {PictureList.map((picture) => {
          return <Picture url={picture.url} id={picture.id} />;
        })}
      </div>
      <div className="Board" ref={drop}>
        {board.map((picture) => {
          return <Picture url={picture.url} id={picture.id} />;
        })}
      </div>
      
      <button onClick={handelnavigate} style={{marginTop:"100px", backgroundColor:"blue", color:"white", height:"50px"}}>Build an Interactive Chart Component</button>

    </>
  );
}

export default Dragdroplist;

