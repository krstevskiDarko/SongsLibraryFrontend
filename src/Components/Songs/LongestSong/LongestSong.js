import React, {useState} from 'react';
import SongService from '../../../Repository/SongRepository';
import {useMusic} from "../../../Context/MusicContext";
import Header from "../../Header/Header";

const LongestSongByGenre = () => {
    const {artists, genres} = useMusic();

    const initialArtistId = artists.length > 0 ? artists[0].id : '';
    const [artistId, setArtistId] = useState(initialArtistId);
    const [genre, setGenre] = useState('POP');
    const [longestSong, setLongestSong] = useState(null);
    const [error, setError] = useState(null);

    const handleGetLongestSong = async () => {
        try {
            const response = await SongService.getLongestSongByGenre(artistId, genre);
            setLongestSong(response);
            setError(null);
        } catch (error) {
            console.error('Error fetching longest song:', error);
            setError(error.response.data + " Try with another parameter!");
        }
    };

    return (
        <>
            <Header/>
            <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500">
                <div className="mb-4">
                    <label htmlFor="artistId" className="mr-2">Select Artist:</label>
                    <select id="artistId" value={artistId} onChange={(e) => setArtistId(e.target.value)}
                            className="border rounded-md p-2">
                        {artists.map(artist => (
                            <option key={artist.id} value={artist.id}>{artist.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="genre" className="mr-2">Select Genre:</label>
                    <select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)}
                            className="border rounded-md p-2">
                        {genres.map(genre => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                    </select>
                </div>

                <button onClick={handleGetLongestSong}
                        className="bg-green-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center mt-5">
                    Get Longest Song
                </button>

                {error && (
                    <div className="text-red-600 mt-4 bg-red-200 p-5 rounded-2xl">{error}</div>
                )}

                {longestSong && (
                    <div className="mt-8 bg-blue-100 min-w-fit p-6 rounded-2xl">
                        <h2 className="text-2xl font-bold py-2">Longest Duration Song:</h2>
                        <p className={"text-xl font-semibold"}>Title: {longestSong.title}</p>
                        <p className={"text-xl font-semibold"}>Duration: {longestSong.durationInMinutes} minutes</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default LongestSongByGenre;
