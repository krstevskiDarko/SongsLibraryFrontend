import React, { useState, useEffect } from 'react';
import SongService from '../../../Repository/SongRepository';

const PlaylistTotalDuration = ({ id, onClose }) => {
    const [duration, setDuration] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlaylistDetails = async () => {
            try {
                const data = await SongService.getPlaylistDuration(id);
                setDuration(data);
                setLoading(false);
            } catch (error) {
                setError(error.response.data);
                setLoading(false);
            }
        };

        fetchPlaylistDetails();
    }, [id]);

    if (loading) {
        return <div className="bg-gray-200 p-4 rounded-lg">Loading...</div>;
    }

    if (error) {
        return <div className="bg-red-200 text-red-800 p-4 rounded-lg">Error: {error}</div>;
    }

    return (
        <div className="bg-gray-200 rounded shadow-2xl shadow-black border-2 border-gray p-6 text-center">
            <div className="text-2xl font-bold mb-4">Total Duration</div>
            <div>{duration} minutes</div>
            <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                Close
            </button>
        </div>
    );
};

export default PlaylistTotalDuration;
