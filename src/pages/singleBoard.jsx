import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/userContext";
import List from "../components/list";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Board = (props) => {
  const { userData, setUserData } = useContext(UserContext);
  const initBoardData = userData.filter((board) => {
    return board.id === props.boardId;
  });
  const [boardLists, setBoardLists] = useState([
    ...Object.values(initBoardData[0].lists),
  ]);

  const onDragEnd = (result) => {
    return;
    if (
      result.destination ||
      result.destination === null ||
      (result.source.droppableId === result.destination.droppableId &&
        result.source.index === result.destination.index)
    )
      return;

    let newBoardList = [...boardLists];
    const { source, destination, type } = result;
    const boardId = props.boardId;

    let sourceList = newBoardList.filter(
      (list) => list.id === source.droppableId
    );
    sourceList = sourceList.splice();
    let destinationList = newBoardList.filter(
      (list) => list.id === destination.droppableId
    );

    console.log("result is", sourceList, destinationList);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div id="kanban-board">
        <Droppable
          droppableId={String(props.boardId)}
          type="group"
          isCombineEnabled
        >
          {(provided) => (
            <div
              id="board-wrapper"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {boardLists.map((list, index) => (
                <List
                  data={list}
                  key={list.id}
                  boardId={props.boardId}
                  id={list.id}
                  callback={props.listCallback}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Board;
