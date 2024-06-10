import React, { useState, useEffect } from 'react';
import SongService from '../../../Repository/SongRepository';
import Header from "../../Header/Header";

const MacedonianArtists = () => {
    const [macedonianArtists, setMacedonianArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMacedonianArtists = async () => {
            try {
                const data = await SongService.fetchMacedonianArtists();
                setMacedonianArtists(data);
                console.log(macedonianArtists)
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchMacedonianArtists();
    }, []);

    if (loading) {
        return <div className="bg-gray-200 p-4 rounded-lg">Loading Macedonian artists...</div>;
    }

    if (error) {
        return <div className="bg-red-200 text-red-800 p-4 rounded-lg">Error fetching Macedonian artists: {error}</div>;
    }

    return (
        <>
            <Header />
            <div className="flex flex-col justify-center items-center min-h-screen bg-blue-500">
                <div className="text-5xl font-bold mb-8">Macedonian artists born before 1999:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
                    {macedonianArtists.map(artist => (
                        <div key={artist.id}
                             className="bg-gray-200 rounded shadow-2xl shadow-black border-2 border-gray">
                            <div className="p-6 text-center">
                                <h2 className="font-bold text-xl mb-2">{artist.name}</h2>
                                <h2 className="font-bold italic mb-2">{artist.artisticName}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MacedonianArtists;
