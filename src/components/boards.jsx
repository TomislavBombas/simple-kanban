import React, { useContext, useState } from "react";

export function BoardSummary(props) {
  const [board, setBoard] = useState(props.data);
  return (
    <div className="board-summary" onClick={props.handleClick}>
      <h3 className="board-card-title">{board.name}</h3>
      <div className="board-card-content">
        <p>{board.description}</p>
      </div>
    </div>
  );
}

export function newBoardBox(props) {}
