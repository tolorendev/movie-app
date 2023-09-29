import { useEffect, useState } from "react";
import SearchIcon from "../UI/SearchIcon";
import classes from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  const [scrollVertical, setScrollVertical] = useState(0);

  //======================================
  // Handle scroll event
  useEffect(() => {
    const onScroll = () => setScrollVertical(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navbarClasses =
    scrollVertical > 100
      ? `${classes.navbar} ${classes.background2}`
      : classes.navbar;

  return (
    <nav className={navbarClasses}>
      <div className={classes.container}>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <h1>Movie App</h1>{" "}
        </NavLink>
        <NavLink to="/search">
          <SearchIcon className={classes.search} />
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
