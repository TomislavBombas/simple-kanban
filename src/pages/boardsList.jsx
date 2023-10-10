import { useContext } from "react";
import { UserContext } from "../components/userContext";
import { BoardSummary } from "../components/boards";

function BoardsList(props) {
  const { userData, setUserData } = useContext(UserContext);

  return (
    <div id="kanban-boards-list">
      {userData &&
        userData.length > 0 &&
        userData.map((board) => {
          return (
            <BoardSummary
              key={board.id}
              data={board}
              updateData={setUserData}
              handleClick={(e) => {
                props.openBoard(board.id);
              }}
            />
          );
        })}
    </div>
  );
}

export default BoardsList;
