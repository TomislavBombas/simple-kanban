/**
 * This component is responsible for rendering the chosen board in edit mode
 * Works as a popup
 */

import React, { useState, useRef, useContext, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { UserContext } from "../userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper, faAlignLeft, faPaperclip, faComment, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { Editor } from "@tinymce/tinymce-react";
import { EditTextInPlace, editorInitVars, UploadFile } from "../../utils/utils";
import "./small_components_css/taskEditor.scss";
import SingleComment from "./singleComment";
import Reaction from "./reaction";

// This returns a task editor with comments and attachments
function TaskEditor(props) {
  const editorRef = useRef(null);
  const [task, setTask] = useState([props.data]);
  const [comments, setComments] = useState([props.data.comments]);

  // ==========================================================
  // Comments section
  // ==========================================================
  // This is to update comments state
  function updateComments(comment) {
    setComments((currentComment) => {
      return currentComment.filter((singleComment) => {
        if (singleComment.id === comment.id) {
          return { ...comment };
        } else {
          return singleComment;
        }
      });
    });
  }

  // Hen new comment is added update data
  function handleCommentInput(value) {
    const date = Date().split(" ");
    props.data.comments.push({
      id: uuid(),
      text: value,
      datetime: date,
      reactions: [],
    });
    setComments(...[props.data.comments]);
  }
  // ==========================================================

  // ==========================================================
  // Description section
  // ==========================================================
  // This is to update props data
  function updateTaskDescription(e) {
    props.data.text = editorRef.current.getContent();
  }
  // ==========================================================

  // ==========================================================
  // Attachments section
  // ==========================================================
  function updateAttachments() {
    console.log("Updateing attachments");
  }
  // ==========================================================

  return (
    <div className="task-editor">
      <div className="task-editor-section-headline task-editor-headline">
        <FontAwesomeIcon icon={faNewspaper} />
        <h3>
          <EditTextInPlace
            value={props.data.name}
            callback={(name) => {
              props.data.name = name;
              setTask({ ...props.data });
              props.callback(props.data);
            }}
          />
        </h3>
      </div>
      <div className="task-editor-content">
        <div className="task-editor-content-description">
          <div className="task-editor-section-headline">
            <FontAwesomeIcon icon={faAlignLeft} />
            <h4>Description</h4>
          </div>
          <div className="task-editor-section-content-edit">
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={props.data.text}
              init={editorInitVars}
              onEditorChange={updateTaskDescription}
            />
          </div>
        </div>
        <div className="task-editor-content-attachemnts">
          <div className="task-editor-section-headline">
            <FontAwesomeIcon icon={faPaperclip} />
            <h4>Attachments</h4>
          </div>
          <div className="task-editor-section-attachemnts-edit">
            <UploadFile callback={updateAttachments} />
          </div>
        </div>
        <div className="task-editor-content-comments">
          <div className="task-editor-section-headline">
            <FontAwesomeIcon icon={faChartLine} />
            <h4>Activity</h4>
          </div>
          <div className="task-editor-section-comments-edit">
            <form
              className="input-group mb-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleCommentInput(e.target[0].value);
                e.target[0].value = "";
              }}
            >
              <span className="input-group-text" id="basic-addon1">
                <FontAwesomeIcon icon={faComment} />
              </span>
              <input type="text" className="form-control" placeholder="Add comment" aria-label="Add comment" aria-describedby="basic-addon1" />
            </form>
          </div>
          <div className="task-editor-section-comments-list">
            {props.data.comments.map((comment) => {
              return <SingleComment key={comment.id} comment={comment} callback={updateComments} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskEditor;
