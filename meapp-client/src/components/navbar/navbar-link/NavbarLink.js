import { useNavigate } from "react-router";
import classes from "./NavbarLink.module.css";

const NavbarLink = (props) => {
  const navigate = useNavigate();

  const handleLinkClick = (event) => {
    props.setCurrLink(props.route);
    props.onLinkClick();
    navigate(`/${props.route}`)
  };

  return (
    <span className={classes.link}>
      <li
        onClick={handleLinkClick}
        className={`${classes["link-item"]}`}
      >
        {props.text}
      </li>
      {props.route === props.currLink && <div className={classes.bottomLine}></div>}
    </span>
  );
};

export default NavbarLink;
