import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="border-end bg-white" id="sidebar-wrapper">
      <div className="sidebar-heading border-bottom bg-light p-4" style={{cursor: "pointer"}} onClick={()=>{navigate("/")}}>Inicio</div>
      <div className="list-group list-group-flush">
        <a
          className="list-group-item list-group-item-action list-group-item-light p-3"
        >
          Section 1
        </a>
        <a
          className="list-group-item list-group-item-action list-group-item-light p-3"
        >
          Section 2
        </a>
        <a
          className="list-group-item list-group-item-action list-group-item-light p-3"
        >
          Section 3
        </a>
        <a
          className="list-group-item list-group-item-action list-group-item-light p-3"
        >
          Section 4
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
