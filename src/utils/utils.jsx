import React, { useState, createRef, useEffect, Fragment } from "react";

//============================================================================
// Small component to made editing titles simpler.
// Does as the name suggests
//============================================================================
export function EditTextInPlace(props) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(false);

  function handleValueChange(e) {
    e.preventDefault();
    setEdit(false);
    props.callback(value);
  }

  function handleValue() {
    if (!edit) return <span className="edit-icon-on-hover">{props.value}</span>;

    return (
      <form onSubmit={handleValueChange}>
        <input
          autoFocus
          className="discreete-input"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onBlur={(e) => {
            handleValueChange(e); // if input field looses focus, submit changes. This is usefull for editing in place...
          }}
        />
      </form>
    );
  }

  function startEdit() {
    setValue(props.value);
    setEdit(true);
  }
  return (
    <Fragment>
      <span onClick={startEdit}>{handleValue()}</span>
    </Fragment>
  );
}
//============================================================================

//============================================================================
//============================================================================
export const editorInitVars = {
  height: 200,
  menubar: false,
  plugins: [
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "media",
    "table",
    "code",
    "help",
    "wordcount",
  ],
  toolbar:
    "undo redo | formatselect | " +
    "bold italic backcolor | alignleft aligncenter " +
    "alignright alignjustify | bullist numlist outdent indent | " +
    "removeformat | help",
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:0.85rem; }",
  skin: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "oxide-dark"
    : "oxide",
  content_css: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "default",
};
//============================================================================

//============================================================================
// In case a spread operator doesn't do the job
//============================================================================
export function renewObject(object = {}, reference = {}) {
  let reference_object = object;
  if (reference_object.length == 0) reference_object = reference;
  let new_object = {};
  Object.keys(reference_object).map((key) => {
    new_object[key] = { ...new_object[key] } || { ...reference_object[key] };
  });
  return new_object;
}
//============================================================================

//============================================================================
// Just a small function to return random avatar images
//============================================================================
export function randomUserAvatar() {
  let rando = Math.round(Math.random() * 15) + 1;
  rando < 10 ? (rando = "0" + rando) : (rando = String(rando));
  return "./avatars/guest-avatar-" + rando + ".jpg";
}
//============================================================================
// Placeholder to do login stuff
//============================================================================
export function loginUser(username, password) {}
//============================================================================

//============================================================================
// Generates a function camel-case name from a name
//============================================================================
export function functionNameFromString(name) {
  let functionName = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  functionName = functionName.charAt(0).toLowerCase() + functionName.slice(1);
  return functionName;
}
//============================================================================

//============================================================================
//============================================================================
export function UploadFile(props) {
  const [upload, setUpload] = useState(false);
  const currentURL = window.location.href; // returns the absolute URL of a page
  const pathname = window.location.pathname; //returns the current url minus the domain name
  const locationUrl = currentURL.replace(pathname);

  function handleFiles(files) {
    [...files].forEach(uploadSingleFile);
  }

  function uploadSingleFile(file) {
    let url = locationUrl;
    let formData = new FormData();

    formData.append("file", file);

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then(() => {
        /* Done. Inform the user */
      })
      .catch(() => {
        /* Error. Inform the user */
      });
  }

  function handleFileUpload(e) {
    alert(locationUrl);
    let dt = e.dataTransfer;
    let files = dt.files;

    handleFiles(files);
  }
  function highlightArea(state) {}
  if (upload === false) {
    return (
      <button
        className="btn btn-secondary"
        onClick={(e) => {
          setUpload(true);
        }}
      >
        Upload file
      </button>
    );
  } else {
    return (
      <div
        className="file-drop-area"
        onDrop={handleFileUpload}
        onDragEnter={(e) => highlightArea(true)}
        onDragOver={(e) => highlightArea(true)}
        onDragLeave={(e) => highlightArea(false)}
      >
        <p>Drop file to upload or</p>
      </div>
    );
  }
}
//============================================================================

export function getUserAvatar(id) {
  return randomUserAvatar();
}
export function getUserName(id) {
  const name = "John Doe";
  // const name = fetch(
  //   "https://cors-anywhere.herokuapp.com/https://api.name-fake.com/random/random"
  // ).then((person) => person.name);
  return name;
}
