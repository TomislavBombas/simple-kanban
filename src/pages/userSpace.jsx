/**
 * This component is responsible for rendering the user data
 * It switches from board list to single board view
 * Sidebar is permanent but content changes based on user selection
 */

import { Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "../components/userContext";
import BoardsList from "./boardsList";
import Board from "./singleBoard";
import { v4 as uuid } from "uuid";
import Sidebar from "../components/sidebar";

function UserSpace() {
  const [taskListView, setTaskListView] = useState(-1);
  const [boardData, setBoardData] = useState({});
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    console.log("board data update");
    console.log(boardData);
  }, [boardData]);

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

  function setSingleBoardUserData(newBoardData) {
    setUserData((currentBoard) => {
      return currentBoard.filter((board) => {
        if (board.id === newBoardData.id) {
          board = { ...newBoardData };
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
  // Callback function to update list of user created Boards
  // ============================================================
  function handleBoards(newBoard, insert = false) {
    if (insert) {
      newBoard.name = "New board";
      newBoard.lists = [];
      setUserData((currentBoard) => [...currentBoard, newBoard]);
    }
    setSingleBoardUserData(newBoard);
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
      let newUserData = [...userData];
      let currentBoard;
      newUserData.filter((board) => {
        if (board.id === taskListView) {
          let newLists = [...board.lists];
          currentBoard = { ...board };
          newLists.push(newList);
          board.lists = [...newLists];
          return board;
        }
      });
      setUserData(newUserData);
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
    handleLists(
      {
        name: "New list",
        id: uuid(),
        tasks: [],
        deleted: false,
      },
      true,
    );
  }
  return (
    <Fragment>
      <Sidebar
        addNew={taskListView === -1 ? handleBoards : addNewList}
        currentView={taskListView === -1 ? "boards" : "lists"}
        goBackToBoardsList={goBackToBoardsList}
      />
      {taskListView === -1 && <BoardsList openBoard={openBoard} />}
      {taskListView !== -1 && <Board key={taskListView} boardId={boardData.id} listCallback={handleLists} />}
    </Fragment>
  );
}

export default UserSpace;
