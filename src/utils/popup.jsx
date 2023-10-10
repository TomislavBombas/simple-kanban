import React, { createRef, useEffect } from "react";

//============================================================================
// Returns a popup component containint the value prop as content
//============================================================================
export default function Popup(props) {
  const popupRef = createRef();
  useEffect(() => {
    setTimeout(() => {
      popupRef.current.classList.add("visible");
    }, 100);
  }, []);

  if (props.opened) {
    return (
      <div id="popup" ref={popupRef}>
        <div
          className="semi-transparent-black"
          id="popup-background"
          onClick={(e) => {
            e.target.parentNode.classList.remove("visible");
            setTimeout(() => {
              props.callback();
            }, 600);
          }}
        ></div>
        <div id="popup-wrapper">{props.children}</div>
      </div>
    );
  } else {
    return <Fragment>{props.children}</Fragment>;
  }
}
//============================================================================
