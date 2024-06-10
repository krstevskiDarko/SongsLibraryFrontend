import React, { useState, useEffect } from 'react';
import SongService from '../../../Repository/SongRepository';
import Header from "../../Header/Header";
import {useMusic} from "../../../Context/MusicContext";

const PublicPlaylists = () => {

    const {songs } = useMusic()

    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublicPlaylists = async () => {
            try {
                const data = await SongService.getPublicPlaylists();
                setPlaylists(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPublicPlaylists();
    }, []);

    if (loading) {
        return <div className="bg-gray-200 p-4 rounded-lg">Loading Playlists...</div>;
    }

    if (error) {
        return <div className="bg-red-200 text-red-800 p-4 rounded-lg">Error fetching Playlists: {error}</div>;
    }

    return (
        <>
            <Header />
            <div className="flex flex-col justify-center items-center min-h-screen bg-blue-500">
                <div className="text-5xl font-bold mb-8">Playlists that are public and have at most 3 songs:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
                    {playlists.map(playlist => (
                        <div key={playlist.id} className="mt-8 mx-5 bg-blue-100 min-w-fit p-6 rounded-2xl shadow-2xl">
                            <h2 className="text-2xl font-bold py-2">Playlists :</h2>
                            <p className={"text-xl font-semibold"}>Name: {playlist.name}</p>
                            <p className={"text-xl font-semibold"}>Date Created: {playlist.dateCreated}</p>
                            <p className={"text-xl font-semibold"}>Status: {playlist.statusPublic ? 'Public' : 'Private'}</p>
                            <div className={"text-xl font-semibold"}>Songs:
                                {songs
                                    .filter(song => playlist.songs.includes(song.id))
                                    .map(song => (<div key={song.id} className="mt-2">
                                        <div>{song.title}</div>
                                        <div className="text-sm">{song.artistName}</div>
                                        <div className="text-sm">{song.durationInMinutes} minutes</div>
                                        <div
                                            className="text-sm">{new Date(song.releaseDate).toLocaleDateString()}</div>
                                    </div>))}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PublicPlaylists;
