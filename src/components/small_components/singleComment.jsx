/**
 * This component is responsible for rendering a single comment.
 */

import { useContext } from "react";
import { UserContext } from "../userContext";
import Reaction from "./reaction";

function SingleComment(props) {
  const { userInfo } = useContext(UserContext);

  const addReaction = (commentId, userId, reaction) => {
    props.comment.reactions.push({ userId: userId, reaction: reaction });
    props.callback(props.comment);
  };

  return (
    <div className="comment">
      <div className="small-avatar avatar">
        <img src={userInfo.avatar} />
      </div>
      <div className="comment-wrapper">
        <div className="comment-meta">
          <div className="comment-data">
            <strong>{userInfo.name}</strong>
            <span> </span>
            {props.comment.datetime[1]}
            <span> </span>
            {props.comment.datetime[2]}
            <span> </span>
            {props.comment.datetime[4]}
          </div>
        </div>
        <div className="comment-text">{props.comment.text}</div>
        <div className="comment-reactions">
          <Reaction data={props.comment} callback={addReaction} userId={userInfo.id} />
        </div>
      </div>
    </div>
  );
}

export default SingleComment;
