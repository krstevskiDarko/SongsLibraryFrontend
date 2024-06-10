import React from 'react';
import { useMusic } from '../../Context/MusicContext';
import Header from "../Header/Header";
import {Link} from "react-router-dom";

const Songs = () => {
    const { songs, artists, loading, error } = useMusic();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Header></Header>
            <div className={"bg-blue-500 flex justify-center items-center pt-20"}>
                <Link to={"/songs/longest"}>
                    <button className={"bg-lime-500 mx-5 font-bold hover:bg-lime-600 p-6 rounded-2xl"}>
                        Click to see Longest Song endpoint
                    </button>
                </Link>
                <Link to={"/songs/threeSongs"}>
                    <button className={"bg-cyan-300 mx-5  font-bold hover:bg-cyan-500 p-6 rounded-2xl"}>
                        Click to see First 3 songs with duration between 5 and 10 endpoint
                    </button>
                </Link>
            </div>
            <div className="bg-blue-500 flex justify-center items-center pt-5">
                <Link to={"/songs/addSong"}>
                    <button className={"bg-green-500 font-bold hover:bg-green-700 p-6 rounded-2xl"}>
                        Add New Song
                    </button>
                </Link>
            </div>
            <div className="flex flex-col justify-center items-center min-h-screen bg-blue-500">
                <div className="text-5xl font-bold mb-8 pt-10">All Songs:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-5 pb-10">
                    {songs.map((song) => (
                        <div key={song.id} className="bg-gray-200 rounded shadow-2xl shadow-black border-2 border-gray">
                            <div className="p-6 text-center">
                                <div className="font-bold text-xl mb-2">{song.title}</div>
                                <div className="italic mb-4">
                                    {artists
                                        .filter(artist => artist.id === song.artist)
                                        .map(artist => artist.name)}
                                </div>
                                <div className="mt-2">
                                    <div className="text-sm">{song.durationInMinutes} minutes</div>
                                    <div className="text-sm">{new Date(song.releaseDate).toLocaleDateString()}</div>
                                    <div className="text-medium font-semibold">{song.genre}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default React.memo(Songs);
