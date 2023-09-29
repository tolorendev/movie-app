import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

function Modal(props) {
  const overlayContent = (
    <div className={classes.overlay} onClick={props.onClose}></div>
  );

  const modalContent = (
    <div className={classes.modal}>
      <div className={classes["modal-inner"]}>{props.children}</div>
    </div>
  );
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        overlayContent,
        document.getElementById("overlay")
      )}
      {modalContent}
    </React.Fragment>
  );
}

export default Modal;
