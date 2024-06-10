import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-blue-950 text-white p-4">
            <nav className="flex justify-between items-center">
                <h1 className="text-4xl font-bold"><Link to={"/"}>Song Library</Link></h1>
                <ul className="flex space-x-5 text-xl">
                    <li>
                        <Link to="/artists">Artists</Link>
                    </li>
                    <li>
                        <Link to="/songs">Songs</Link>
                    </li>
                    <li>
                        <Link to="/playlists">Playlists</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
