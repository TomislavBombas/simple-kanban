import { Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "../components/userContext";
import BoardsList from "./boardsList";
import Board from "./singleBoard";
import Sidebar from "../components/sidebar";

function UserSpace() {
  const [taskListView, setTaskListView] = useState(-1);
  const [boardData, setBoardData] = useState({});
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    console.log("board data update");
    console.log(userData);
  }, userData);

  // ============================================================
  // When specific user Board is picked, open chosen board via ID
  // ============================================================
  function openBoard(boardId) {
    setTaskListView(boardId);
    let singleBoard = userData.find((board) => {
      return board.id == boardId;
    });
    setBoardData({ ...singleBoard });
  }
  // ============================================================
  // ============================================================

  // ============================================================
  // When specific user Board is picked, open chosen board via ID
  // ============================================================
  function goBackToBoardsList() {
    setTaskListView(-1);
  }
  // ============================================================
  // ============================================================

  // ============================================================
  // Callback function to update list of user created Boards
  // ============================================================
  function handleBoards(newBoard, insert = false) {
    console.log("handling boards", newBoard);
    if (insert) {
      newBoard.name = "New board";
      newBoard.lists = [];
      setUserData((currentBoard) => [...currentBoard, newBoard]);
    }

    setUserData((currentBoard) => {
      return currentBoard.filter((board) => {
        if (board.id === newBoard.id) {
          board = { ...newBoard };
          if (!board.deleted) {
            return board;
          }
        } else {
          return board;
        }
      });
    });
  }
  // ============================================================
  // ============================================================

  // ============================================================
  // Callback function to changing lists data
  // ============================================================
  function handleLists(newList, insert = false) {
    let openBoard = userData.find((board) => {
      return board.id === taskListView;
    });

    if (insert) {
      newList.name = "New list";
      newList.tasks = [];
      console.log(openBoard);
      let newBoardData = { ...openBoard };
      newBoardData.lists.push(newList);
      console.log("newBoardData", newBoardData);
      setUserData((currentBoard) => [...currentBoard, newBoardData]);
    } else {
      // =========================================================================================
      // Since we are changing multilevel object simple call to state update function (setUserData)
      // won't worm. So, we make a new array of userData objects via spred operator
      // and make changes to that array. We call setUserData with that array so state will update
      let newUserData = [...userData];
      newUserData.filter((board) => {
        if (board.id === taskListView) {
          let newLists = board.lists.filter((list) => {
            if (list.id === newList.id) {
              list = { ...newList };
              if (!list.deleted) {
                return list;
              }
            } else {
              return list;
            }
          });
          board.lists = [...newLists];
        } else {
          return board;
        }
      });
      setUserData(newUserData);
      // =========================================================================================
    }
  }
  // ============================================================
  // ============================================================
  function addNewList() {
    console.log("addingNewList");
    handleLists({});
  }
  return (
    <Fragment>
      <Sidebar
        addNew={taskListView === -1 ? handleBoards : addNewList}
        currentView={taskListView === -1 ? "boards" : "lists"}
        goBackToBoardsList={goBackToBoardsList}
      />
      {taskListView === -1 && <BoardsList openBoard={openBoard} />}
      {taskListView !== -1 && (
        <Board
          key={taskListView}
          boardId={boardData.id}
          listCallback={handleLists}
        />
      )}
    </Fragment>
  );
}

export default UserSpace;
