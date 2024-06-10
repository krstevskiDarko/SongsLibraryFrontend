import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 text-white">
            <h1 className="text-4xl font-bold mb-8">Welcome to My Song Library!</h1>
            <div className="flex space-x-4">
                <Link to="/artists" className="p-4 bg-gray-800 rounded-lg text-lg font-semibold">Artists</Link>
                <Link to="/songs" className="p-4 bg-gray-800 rounded-lg text-lg font-semibold">Songs</Link>
                <Link to="/playlists" className="p-4 bg-gray-800 rounded-lg text-lg font-semibold">Playlists</Link>
            </div>
        </div>
    );
}

export default HomePage;
