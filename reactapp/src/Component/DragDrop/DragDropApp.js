import React from 'react'
import Dragdroplist from './Dragdroplist'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend";

function DragDropApp() {
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="App">
      <Dragdroplist />
    </div>
  </DndProvider>
  )
}

export default DragDropApp
