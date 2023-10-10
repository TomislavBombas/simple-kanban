import React, { useState, Fragment } from "react";
import { DotsDropdownMenu } from "./small_components/menu";
import TaskEditor from "./small_components/taskEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faComment,
  faPaperclip,
  faAlignLeft,
} from "@fortawesome/free-solid-svg-icons";
import { functionNameFromString } from "../utils/utils";
import Popup from "../utils/popup";
import { Draggable } from "react-beautiful-dnd";
import { itemTypes } from "./itemTypes";

export function TaskSummary(props) {
  const [task, setTask] = useState(props.data);
  const [menuOpen, setMenuOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(props.open);
  const listMenuItems = ["Edit task", "Delete task"];
  const funcMap = {
    editTask: () => {
      editTask();
    },
    deleteTask: () => {
      deleteTask();
    },
  };

  // document.addEventListener("mousemove", (evt) => {
  //   let x = evt.clientX / innerWidth;
  //   let y = evt.clientY / innerHeight;

  //   root.style.setProperty("--mouse-x", x);
  //   root.style.setProperty("--mouse-y", y);
  // });

  function editTask() {
    let newTaskState = { ...task };
    newTaskState.open = true;
    setTask(newTaskState);
    setTaskOpen(true);
    //props.callback(newTaskState);
  }

  function deleteTask() {
    let newTaskState = { ...task };
    newTaskState.deleted = true;
    setTask(newTaskState);
    props.callback(newTaskState);
  }

  function toggleTask() {
    setTaskOpen(!taskOpen);
  }

  function updateTask(updatedtask) {
    setTask(updatedtask);
  }

  function makeEditTaskPopup(task) {
    return (
      <Popup opened={true} callback={toggleTask}>
        <div className="task-edit-wrapper">
          <TaskEditor data={task} callback={updateTask} />
        </div>
      </Popup>
    );
  }

  function TaskHeader(innerProps) {
    return (
      <div
        className="task-summary-header headline"
        {...innerProps.dragHandleProps}
      >
        <h4
          onClick={(e) => {
            toggleTask();
          }}
        >
          {task.name}
        </h4>
        <div
          className="dots-menu-wrapper"
          onMouseEnter={(e) => {
            e.preventDefault();
            setMenuOpen(!menuOpen);
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            setMenuOpen(!menuOpen);
          }}
        >
          <button
            className="btn dots-menu-icon"
            onClick={(e) => {
              setMenuOpen(!menuOpen);
            }}
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
          {menuOpen === true && (
            <DotsDropdownMenu
              menuItems={listMenuItems}
              menuAction={handleDotsMenu}
            />
          )}
        </div>
      </div>
    );
  }
  function TaskSummary(innerProps) {
    return (
      <Fragment>
        <div
          className="task-summary-content content"
          onClick={(e) => {
            toggleTask();
          }}
          dangerouslySetInnerHTML={{ __html: task.text }}
        ></div>
        <div
          className="task-summary"
          onClick={(e) => {
            toggleTask();
          }}
        >
          <div className="task-summary-comments">
            <FontAwesomeIcon icon={faComment} />
            <p>{innerProps.comments.length}</p>
          </div>
          <div className="task-summary-description">
            <FontAwesomeIcon icon={faAlignLeft} />
          </div>
          <div className="task-summary-attachments">
            <FontAwesomeIcon icon={faPaperclip} />
            <p>{innerProps.attachments.length}</p>
          </div>
        </div>
      </Fragment>
    );
  }

  function makeTaskCard(task) {
    return (
      <Draggable draggableId={String(task.id)} index={Number(props.index)}>
        {(provided) => (
          <div
            className="task-summary task-wrapper"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <TaskHeader dragHandleProps={provided.dragHandleProps} />
            <TaskSummary {...task} />
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    );
  }

  function handleDotsMenu(name) {
    let fname = functionNameFromString(name);
    funcMap[fname]();
  }
  return !taskOpen ? makeTaskCard(task) : makeEditTaskPopup(task);
}
