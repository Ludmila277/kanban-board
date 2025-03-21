import Logo from "../../img/user-avatar.svg";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1 className="header-title">Awesome Kanban Board</h1>
      <img className="header-logo" src={Logo} alt="Личный кабинет" />
    </header>
  );
}

export default Header;
