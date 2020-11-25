import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = (props) => {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    if (props.isMobile) {
        return (
            <div className="bg-transparent w-100 d-flex justify-content-end p-3">
                <button
                    className="btn btn-outline-dark border-0 toggle-btn"
                    onClick={toggleSidebar}
                >
                    <i className={`fas fa-2x text-dark ${showSidebar ? "fa-times": "fa-bars"}`} />
                </button>
                <div className={`sidebar ${showSidebar ? "active" : ""}`}>
                    <NavLink
                        to="/"
                        className="pri-font text-dark mx-3 p-3"
                        exact
                        onClick={toggleSidebar}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/log"
                        className="pri-font text-dark mx-3 p-3"
                        exact
                        onClick={toggleSidebar}
                    >
                        Log
                    </NavLink>
                </div>
            </div>
        );
    }
    return (
        <div className="navbar ">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink
                        to="/"
                        className="pri-font text-dark mx-3 p-3"
                        exact
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/log"
                        className="pri-font text-dark mx-3 p-3"
                        exact
                    >
                        Log
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
