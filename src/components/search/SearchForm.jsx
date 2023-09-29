import React, { useEffect, useRef, useState } from "react";
import classes from "./SearchForm.module.css";
import SearchIcon from "../../components/UI/SearchIcon";

function SearchForm(props) {
  const [enteredValue, setEnteredValue] = useState("");
  const [error, setError] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  //=====================================
  // Handler
  const onChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const onSubmitHandler = (e) => {
    setError(false);
    e.preventDefault();
    if (enteredValue === "") {
      setError(true);
      return;
    }
    console.log(enteredValue, "submitted");
    props.onSearch(enteredValue);
    setEnteredValue("");
  };
  const resetEnteredValueHandler = () => {
    if (enteredValue === "") {
      return;
    }
    setEnteredValue("");
  };

  // Error: When search without any entered text
  // --->  Focus to input field to make attention
  if (error) {
    inputRef.current.focus();
  }

  return (
    <div className={classes["form-container"]}>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <input
            type="text"
            value={enteredValue}
            onChange={onChangeHandler}
            ref={inputRef}
          />
          <SearchIcon className={classes.icon} />
        </div>
        <hr />
        <div className={classes.actions}>
          <button
            type="button"
            className={classes.reset}
            onClick={resetEnteredValueHandler}
          >
            RESET
          </button>
          <button>SEARCH </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
