import React, {useState} from 'react';
import SongService from '../../../Repository/SongRepository';
import {useMusic} from "../../../Context/MusicContext";
import Header from "../../Header/Header";
import specifiedPlaylist from "./SpecifiedPlaylist";

const SpecifiedPlaylist = () => {
    const {artists, songs} = useMusic();

    const initialArtistId = artists.length > 0 ? artists[0].id : '';
    const [artistId, setArtistId] = useState(initialArtistId);
    const [specifiedPlaylists, setSpecifiedPlaylist] = useState([]);
    const [error, setError] = useState(null);

    const handleGetLongestSong = async () => {
        try {
            const response = await SongService.getSpecifiedPlaylist(artistId);
            setSpecifiedPlaylist(response);
            setError(null);
        } catch (error) {
            console.error('Error fetching specified playlist:', error);
            setError(error.response.data + " Try with another artist!");
        }
    };

    return (<>
        <Header/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 py-10">
            <div className="mb-4">
                <label htmlFor="artistId" className="mr-2">Select Artist:</label>
                <select id="artistId" value={artistId} onChange={(e) => setArtistId(e.target.value)}
                        className="border rounded-md p-2">
                    {artists.map(artist => (<option key={artist.id} value={artist.id}>{artist.name}</option>))}
                </select>
            </div>

            <button onClick={handleGetLongestSong}
                    className="bg-green-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center mt-5">
                Get Specified Playlists From Artist
            </button>

            {error && (<div className="text-red-600 mt-4 bg-red-200 p-5 rounded-2xl">{error}</div>)}

            <div className={"flex flex-row items-center justify-center mx-5 "}>
                {specifiedPlaylists && specifiedPlaylists.map((playlist) => (
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
                    </div>))}
            </div>
        </div>
    </>);
};

export default SpecifiedPlaylist;
