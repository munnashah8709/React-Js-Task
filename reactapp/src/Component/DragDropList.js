import React, { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
  CARD: 'card'
};

function Card({ id, text, index, moveCard }) {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} className="card" style={{ opacity }}>
      {text}
    </div>
  );
}

function DragDropList() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem('cards'));
    if (storedCards) {
      setCards(storedCards);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  const moveCard = (dragIndex, hoverIndex) => {
    const draggedCard = cards[dragIndex];
    setCards(prevCards => {
      const updatedCards = [...prevCards];
      updatedCards.splice(dragIndex, 1);
      updatedCards.splice(hoverIndex, 0, draggedCard);
      return updatedCards;
    });
  };

  const addCard = () => {
    const cardText = prompt('Enter a card text:');
    if (cardText) {
      const newCard = {
        id: Date.now(),
        text: cardText
      };
      setCards(prevCards => [...prevCards, newCard]);
    }
  };

  const removeCard = id => {
    setCards(prevCards => prevCards.filter(card => card.id !== id));
  };

  return (
    <div className="drag-drop-list">
      <div className="card-list">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            id={card.id}
            text={card.text}
            index={index}
            moveCard={moveCard}
          />
        ))}
      </div>
      <button className="add-card-button" onClick={addCard}>
        Add Card
      </button>
    </div>
  );
}

export default DragDropList;
