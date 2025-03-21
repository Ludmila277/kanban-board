import "./Footer.css";

function Footer(props) {
  const { count, count1 } = props;
  return (
    <footer className="footer">
      <div className="counts">
        <p className="count">Active tasks:{count}</p>
        <p className="count">Finished tasks: {count1}</p>
      </div>
      <div className="copy">Kanban board by Ludmila Demidova, 2025</div>
    </footer>
  );
}

export default Footer;
