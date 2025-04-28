import "./Footer.css";
function Footer({ activeCount, doneCount }) {
  return (
    <footer className="footer">
      <div className="counts">
        <p className="count">Active tasks: {activeCount || 0}</p>
        <p className="count">Finished tasks: {doneCount || 0}</p>
      </div>
      <div className="copy">Kanban board by Ludmila Demidova, 2025</div>
    </footer>
  );
}

export default Footer;
