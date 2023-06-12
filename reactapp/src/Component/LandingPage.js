import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../Component/landing.css';

function LandingPage() {
  const [items, setItems] = useState([]);

//   useEffect(() => {
//     // Load items from local storage when the component mounts
//     const savedItems = localStorage.getItem('dragAndDropItems');
//     if (savedItems) {
//       setItems(JSON.parse(savedItems));
//     }
//   }, []);

//   useEffect(() => {
//     // Save items to local storage whenever the items state changes
//     localStorage.setItem('dragAndDropItems', JSON.stringify(items));
//   }, [items]);

  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];
    const newItems = [...items];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, item);
    setItems(newItems);
  };

  const Item = ({ text, index }) => {
    const [{ isDragging }, drag] = useDrag({
      item: { type: 'item', index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: 'item',
      hover: (item) => {
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        moveItem(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    return (
      <div
        ref={(node) => drag(drop(node))}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        className="item"
      >
        {text}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>Drag and Drop Interface</h1>
        <div className="item-list">
          {items.map((item, index) => (
            <Item key={index} index={index} text={item} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default LandingPage;
