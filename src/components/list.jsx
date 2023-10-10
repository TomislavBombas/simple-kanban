import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { TaskSummary } from "./task";
import { DotsDropdownMenu } from "./small_components/menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { EditTextInPlace } from "../utils/utils";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { itemTypes } from "./itemTypes";

export default function List(props) {
  const [tasks, setTasks] = useState([...props.data.tasks]);
  const [menuOpen, setMenuOpen] = useState(false);

  const listMenuItems = ["Edit list info", "Add task", "Delete list"];

  const handleDotsMenu = (name) => {
    console.log(name);
  };

  function updateTasks(modifiedTask) {
    setTasks((currentTasks) => {
      return currentTasks.filter((task) => {
        if (task.id === modifiedTask.id) {
          task = modifiedTask;
          if (!task.deleted) {
            return task;
          }
        } else {
          return task;
        }
      });
    });
  }

  function createNewTask(e) {
    const newTask = {
      id: uuid(),
      name: "New task",
      open: true,
      attachments: [],
      comments: [],
      description: "",
    };
    setTasks([...tasks, newTask]);
  }

  function ListHeader(innerProps) {
    return (
      <div className="kanban-list-header" {...innerProps.dragHandleProps}>
        <h3>
          <EditTextInPlace
            value={innerProps.data.name}
            callback={(name) => {
              innerProps.data.name = name;
              innerProps.callback(innerProps.data);
            }}
          />
        </h3>
        <div
          className="dots-menu-wrapper"
          onMouseEnter={(e) => {
            setMenuOpen(!menuOpen);
          }}
          onMouseLeave={(e) => {
            setMenuOpen(!menuOpen);
          }}
        >
          <button className="btn dots-menu-icon">
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
          {menuOpen === true && (
            <DotsDropdownMenu
              menuItems={listMenuItems}
              action={handleDotsMenu}
            />
          )}
        </div>
      </div>
    );
  }
  function TaskList(innerProps) {
    return (
      <Droppable droppableId={String(innerProps.data.id)}>
        {(provided) => (
          <div
            className="kanban-list-tasks"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => {
              return (
                <TaskSummary
                  key={task.id}
                  id={task.id}
                  index={index}
                  open={task.open}
                  data={task}
                  callback={updateTasks}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }

  return (
    <Draggable draggableId={String(props.data.id)} index={props.index}>
      {(provided) => (
        <div
          className="kanban-list"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="kanban-list-wrapper">
            <ListHeader
              dragHandleProps={provided.dragHandleProps}
              data={props.data}
            />
            <TaskList data={props.data} />

            <button
              className="btn btn-secondary btn-new-task"
              onClick={createNewTask}
            >
              Create task
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
