import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export function MainMenu(props) {
  return (
    <nav id="main-nav">
      <ul>
        <li key="create-new" className="new-group-item">
          <button
            className="btn btn-light"
            onClick={(e) => {
              props.menuCommands.addNew(props.new_item, true);
            }}
            title="Create new"
          >
            <FontAwesomeIcon icon={faCirclePlus} />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export function DotsDropdownMenu(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="dots-menu-nav">
      <ul className="dropdown-submenu pull-left list-menu">
        {props.menuItems.map((item, index) => {
          return (
            <li
              key={"list-menu-item-" + index}
              onClick={(e) => {
                props.menuAction(item);
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
