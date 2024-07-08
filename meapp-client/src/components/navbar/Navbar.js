import { useNavigate } from "react-router";
import NavbarLink from "./navbar-link/NavbarLink";
import classes from "./Navbar.module.css";

const Navbar = ({ navItems, currLink, setCurrLink }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    setCurrLink("/")
    navigate(`/`);
  };

  return (
    <nav className={classes["navbar-container"]}>
      <ul>
        <div className={classes["logo"]} onClick={handleLogoClick}></div>
        {navItems.map((item) => (
          <NavbarLink
            route={item.route}
            key={item.id}
            id={item.id}
            onLinkClick={item.onLinkClick}
            text={item.text}
            currLink={currLink}
            setCurrLink={setCurrLink}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
