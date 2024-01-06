/**
 * This component is responsible for rendering the sidebar.
 */
import { useContext } from "react";
import { UserContext } from "./userContext";
import { randomUserAvatar } from "../utils/utils";
import { MainMenu } from "./small_components/menu";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function Sidebar(props) {
  const new_item = {
    id: uuid(),
    lists: [],
    deleted: false,
  };
  const { userInfo } = useContext(UserContext);

  return (
    <div id="kanban-sidebar">
      <ul className="list-group">
        <li key="user" className="list-group-item">
          <button className="btn btn-light user-avatar">
            {userInfo && userInfo.avatar ? <img src={userInfo.avatar} /> : <img src={randomUserAvatar()} />}
          </button>
          {userInfo && userInfo.avatar ? <p>{userInfo.name}</p> : <p>Guest</p>}
        </li>
        {props.currentView === "lists" && (
          <button
            className="btn btn-link"
            title="back"
            onClick={(e) => {
              e.preventDefault();
              props.goBackToBoardsList();
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}
        <li key="menu-wrapper" className="menu-group-item">
          <MainMenu new_item={new_item} menuCommands={{ addNew: props.addNew }} />
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
