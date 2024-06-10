import React, { useState, useEffect } from 'react';
import SongService from '../../../Repository/SongRepository';
import Header from "../../Header/Header";

const ThreeSongs = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchThreeSongs = async () => {
            try {
                const data = await SongService.getFirstThreeSongs();
                setSongs(data);
                console.log(songs)
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchThreeSongs();
    }, []);

    if (loading) {
        return <div className="fixed inset-0 bg-gray-200 p-4 rounded-lg">Loading Three Songs...</div>;
    }

    if (error) {
        return <div className="bg-red-200 text-red-800 p-4 rounded-lg">Error fetching Three songs: {error}</div>;
    }

    return (
        <>
            <Header />
            <div className="flex flex-col justify-center items-center min-h-screen bg-blue-500">
                <div className="text-5xl font-bold mb-8">First Three songs between 5 and 10 minutes:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
                    {songs.map(song => (
                        <div key={song.id}
                             className="bg-gray-200 rounded shadow-2xl shadow-black border-2 border-gray">
                            <div className="p-6 text-center">
                                <h2 className="font-bold text-xl mb-2">{song.title}</h2>
                                <h2 className="font-bold italic mb-2">{song.durationInMinutes} minutes</h2>
                                <h2 className="font-bold italic mb-2">{song.releaseDate}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ThreeSongs;
