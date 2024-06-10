import React, {useState, useEffect} from 'react';
import {useMusic} from '../../Context/MusicContext';
import Header from "../Header/Header";
import {Link, useNavigate} from "react-router-dom";
import PlaylistTotalDuration from '../Playlists/TotalDuration/PlaylistTotalDuration';
import SongsService from "../../Repository/SongRepository";

const Playlists = () => {
    const navigate = useNavigate();
    const {playlists: contextPlaylists, songs, loading, error} = useMusic();
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

    useEffect(() => {
        setPlaylists(contextPlaylists);
    }, [contextPlaylists]);

    const navigation = (id) => {
        navigate(`/playlists/songs/${id}`)
    }

    const handleNavigation = (id) => {
        setSelectedPlaylistId(id);
    };

    const handleCloseDuration = () => {
        setSelectedPlaylistId(null);
    };

    const handleDelete = async (id) => {
        try {
            await SongsService.deletePlaylist(id);
            setPlaylists((prevPlaylists) => prevPlaylists.filter(playlist => playlist.id !== id));
        } catch (error) {
            console.error('Error deleting playlist:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Header/>
            <div className="">
                <div className="bg-blue-500 flex justify-center items-center pt-20">
                    <Link to="/playlists/artist">
                        <button className="bg-purple-500 mx-5 font-bold hover:bg-purple-700 p-6 rounded-2xl">
                            Click to see Playlists with songs from specified artist endpoint
                        </button>
                    </Link>
                    <Link to="/playlists/public">
                        <button className="bg-yellow-500 mx-5 font-bold hover:bg-yellow-700 p-6 rounded-2xl">
                            Click to see Playlists that are public with max of 3 songs endpoint
                        </button>
                    </Link>
                </div>
                <div className="bg-blue-500 flex justify-center items-center pt-20">
                    <Link to={"/playlists/addPlaylist"}>
                        <button className={"bg-green-500 font-bold hover:bg-green-700 p-6 rounded-2xl"}>
                            Add New Playlist
                        </button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center min-h-screen bg-blue-500">
                <div className="text-5xl font-bold mb-8">All Playlists:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
                    {playlists.map((playlist) => (
                        <div key={playlist.id}
                             className="bg-gray-200 rounded shadow-2xl shadow-black border-2 border-gray flex flex-col justify-between">
                            <div className="p-6 text-center">
                                <div className="font-bold text-xl mb-2">{playlist.name}</div>
                                <div className="italic mb-4">{playlist.statusPublic ? 'Public' : 'Private'}</div>
                                <div className="mt-2">
                                    {songs
                                        .filter(song => playlist.songs.includes(song.id))
                                        .map((song, index) => (
                                            <div key={index}>
                                                {song.title} - {song.durationInMinutes} minutes
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="mt-auto">
                                <div
                                    onClick={() => handleNavigation(playlist.id)}
                                    className="bg-blue-300 border-2 border-gray-300 cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5"
                                >
                                    Calculate total duration of this playlist!
                                </div>
                                <div
                                    onClick={() => handleDelete(playlist.id)}
                                    className="bg-red-400 border-2 border-gray-300 cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5"
                                >
                                    Delete this playlist!
                                </div>
                                <div
                                    onClick={() => navigation(playlist.id)}
                                    className="bg-green-400 border-2 border-gray-300 focus:ring-4 focus:ring-blue-300 cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5"
                                >
                                    Add Songs to this playlist!
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedPlaylistId && (

                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <PlaylistTotalDuration id={selectedPlaylistId} onClose={handleCloseDuration}/>
                    </div>
                )}

            </div>
        </>
    );
};

export default React.memo(Playlists);
