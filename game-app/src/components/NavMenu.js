import React from 'react';
import { Link } from 'react-router-dom'

const NavMenu = (props) => {
    return (
        <div className="nav-menu">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/leaderboard">Leaderboard</Link>
                </li>
                <li>
                    <Link to="/">Game Configuration</Link>
                </li>
            </ul>
        </div>
    )
}

export default NavMenu; 