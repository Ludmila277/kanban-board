import { useState } from "react";
import Logo from "../../img/user-avatar.svg";
import Arrow from "../../img/arrow.svg";
import Vector from "../../img/Vector.svg";
import "./Header.css";
import Dropdownmenu from "../dropdownmenu/dropdownmenu";

function Header() {
  const [isOpen, setOpen] = useState(false);
  const handleAddNewClick = () => {
    setOpen(!isOpen);
  };

  return (
    <header className="header">
      <h1 className="title">Awesome Kanban Board</h1>
      <div className="menu">
        <img className="logo" src={Logo} alt="avatar" />
        <button className="button" onClick={handleAddNewClick}>
          {isOpen ? (
            <img className="arrow" src={Arrow} alt="arrow" />
          ) : (
            <img className="vector" src={Vector} alt="vector" />
          )}
        </button>
        {isOpen && <Dropdownmenu />}
      </div>
    </header>
  );
}

export default Header;
