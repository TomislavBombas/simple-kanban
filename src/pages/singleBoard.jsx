/**
 * This component is responsible for rendering the chosen board.
 * Loads list components for each list in the board.
 */

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/userContext";
import List from "../components/list";

const Board = (props) => {
  // get userData from context and filter curent board data
  const { userData } = useContext(UserContext);
  const initBoardData = userData.filter((board) => {
    return board.id === props.boardId;
  });
  // set current board lists state
  const [boardLists, setBoardLists] = useState([...Object.values(initBoardData[0].lists)]);

  return (
    <div id="kanban-board">
      <div id="board-wrapper">
        {boardLists.map((list, index) => (
          <List data={list} key={list.id} boardId={props.boardId} id={list.id} callback={props.listCallback} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Board;
