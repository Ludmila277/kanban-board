import "./dropdownmenu.css";

function Dropdownmenu() {
  return (
    <nav className="dropdownmenu">
      <ul className="menu__list">
        <li className="menu__item">
          <span>Profile</span>
        </li>
        <li className="menu__item">
          <span>Log Out</span>
        </li>
      </ul>
    </nav>
  );
}

export default Dropdownmenu;
