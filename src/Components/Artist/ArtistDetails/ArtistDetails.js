import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SongService from '../../../Repository/SongRepository';
import Header from '../../Header/Header';

const ArtistDetails = () => {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtistDetails = async () => {
            try {
                const data = await SongService.fetchArtistDetails(id);
                setArtist(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchArtistDetails();
    }, [id]);

    if (loading) {
        return <div className="bg-gray-200 p-4 rounded-lg">Loading...</div>;
    }

    if (error) {
        return <div className="bg-red-200 text-red-800 p-4 rounded-lg">Error: {error}</div>;
    }

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500">
                <div className="text-5xl font-bold mb-8">Artist Details</div>
                <div className="flex justify-center w-full">
                    <div className="max-w-screen-xl w-full px-5">
                        <div className="bg-gray-200 rounded shadow-2xl shadow-black border-2 border-gray p-6 text-center">
                            <h2 className="font-bold text-3xl mb-2">{artist.name}</h2>
                            <h2 className="font-bold italic text-xl mb-2">{artist.artisticName}</h2>
                            <p className="mt-2">Nationality: {artist.nationality}</p>
                            <p>Date of Birth: {new Date(artist.dateOfBirth).toLocaleDateString()}</p>
                            <div className="flex justify-center mt-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 mx-2">Song Titles </h3>
                                    <ul>
                                        {artist.songTitles.map((title, index) => (
                                            <li key={index}>{title}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 mx-2">Release Date </h3>
                                    <ul>
                                        {artist.songDates.map((date, index) => (
                                            <li key={index}>{new Date(date).toLocaleDateString()}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ArtistDetails;
