import logo from "../assets/logo.svg";

function Navbar({ theme, changeTheme }) {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <img className="logo" src={logo} alt="Task Manager logo" />
                <h2>Task Manager</h2>
            </div>

            <div className="nav-right">
                <label className="theme-switch">
                    <input
                        type="checkbox"
                        checked={theme === "dark"}
                        onChange={changeTheme}
                    />
                    <span className="switch-slider"></span>
                </label>
                <span className="user-name">Keshav Garg</span>
                <div className="profile-logo">KG</div>
            </div>
        </nav>
    );
}

export default Navbar;
