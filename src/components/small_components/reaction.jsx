import React, { useState } from "react";
import { getUserAvatar, getUserName } from "../../utils/utils";
import { v4 as uuid } from "uuid";
import "./small_components_css/reactions.scss";

const reactionsList = [
  "smile",
  "thumb-up",
  "thumb-down",
  "frown",
  "puke",
  "confused",
  "plus",
];

function Reaction(props) {
  let reactions;
  props.data && props.data.reactions.length > 0
    ? (reactions = props.data.reactions)
    : (reactions = []);
  const [data, setData] = useState(reactions);

  return (
    <div className="reaction-component">
      <div className="reaction-add">
        <ul className="reaction-add-wrapper">
          {reactionsList
            .slice(0)
            .reverse()
            .map((name) => {
              const reactionClass = "reaction-icon reaction-" + name;
              return (
                <li
                  key={name}
                  className={reactionClass}
                  title={name}
                  onClick={(e) => {
                    props.callback(props.data.id, props.userId, name);
                    setData([
                      ...data,
                      { userId: props.userId, reaction: name },
                    ]);
                  }}
                ></li>
              );
            })}
        </ul>
      </div>
      <div className="reaction-listing">
        <ul className="reaction-list">
          {data.map((reaction) => {
            const reactionClass = "reaction-icon reaction-" + reaction.reaction;

            return (
              <li className="reaction-list-item" key={uuid()}>
                <div className="tiny-avatar avatar">
                  <img
                    src={getUserAvatar(reaction.userId)}
                    title={getUserName(reaction.userId)}
                  />
                </div>
                <div className={reactionClass} title={reaction.reaction}></div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Reaction;
