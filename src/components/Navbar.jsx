import { NavLink } from "react-router-dom";


function Navbar() {
    return (
        <nav className="navbar">
            <h2>Rick and Morty Database</h2>

            <div className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/characters">Characters</NavLink>
                <NavLink to="/favorites">Favorites</NavLink>
            </div>
        </nav>
    );
}   

export default Navbar;