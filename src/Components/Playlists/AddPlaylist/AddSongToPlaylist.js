import React, { useState } from 'react';
import SongService from '../../../Repository/SongRepository';
import { useMusic } from "../../../Context/MusicContext";
import Header from "../../Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import Long from 'long'

const AddSongToPlaylist = () => {
    const { songs, addSongToPlaylistContext, playlists,fetchPlaylists } = useMusic();
    const { id } = useParams();
    const navigate = useNavigate();

    const initialSongId = songs.length > 0 ? songs[0].id : '';
    const [songId, setSongId] = useState(initialSongId);
    const [error, setError] = useState(null);

    const handleAddSongToPlaylist = async () => {
        try {
            await SongService.addSongToPlaylist(id, songId);
            addSongToPlaylistContext(id, songId);
            fetchPlaylists();
            setError(null);
            navigate("/playlists");
        } catch (error) {
            console.error('Error adding song to playlist:', error);
            setError(error.response?.data + " Try with another parameter!");
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500">

                <div className="mb-4">
                    <label htmlFor="songId" className="mr-2">Select Song:</label>
                    <select id="songId" value={songId} onChange={(e) => setSongId(e.target.value)}
                            className="border rounded-md p-2">
                        {songs.map(song => (
                            <option key={song.id} value={song.id}>{song.title}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleAddSongToPlaylist}
                        className="bg-green-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center mt-5">
                    Add song to the playlist
                </button>

                {error && (
                    <div className="text-red-600 mt-4 bg-red-200 p-5 rounded-2xl">{error}</div>
                )}
            </div>
        </>
    );
};

export default AddSongToPlaylist;
