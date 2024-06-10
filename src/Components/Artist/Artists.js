import React from 'react';
import {useMusic} from '../../Context/MusicContext';
import Header from "../Header/Header";
import {Link, useNavigate} from "react-router-dom";

const Artists = () => {
    const {artists, loading, error} = useMusic();

    const navigate = useNavigate();

    const navigation = (artist) => {
        navigate(`/artists/${artist}`);
    }

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
                <Link to={"/artists/macedonian"}>
                    <button className={"bg-red-300 font-bold hover:bg-red-400 p-6 rounded-2xl"}>
                        Click to see Macedonian artist endpoint
                    </button>
                </Link>
            </div>
            <div className={"bg-blue-500 flex justify-center items-center pt-20"}>
                <Link to={"/artists/addArtist"}>
                    <button className={"bg-green-500 font-bold hover:bg-green-700 p-6 rounded-2xl"}>
                        Add New Artist
                    </button>
                </Link>
            </div>
            <div className="flex flex-col justify-center items-center min-h-screen bg-blue-500 pt-10">
                <div className="text-5xl font-bold mb-8">All Artists:</div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 p-5">
                    {artists.map((artist) => (
                        <div key={artist.id}
                             className="bg-gray-200 rounded shadow-2xl shadow-black border-2 border-gray">
                            <div className="p-6 text-center">
                                <div className="font-bold text-xl mb-2">{artist.name}</div>
                                <div className="italic mb-4">{artist.artisticName}</div>
                                <div className="mt-2">
                                    <div>{artist.nationality}</div>
                                    <div>{new Date(artist.dateOfBirth).toLocaleDateString()}</div>
                                </div>
                                <div
                                    onClick={() => navigation(artist.id)}
                                    className="bg-blue-300 border-2 border-gray-300 focus:ring-4 focus:ring-blue-300 cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5"
                                >
                                    Get more details!
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default React.memo(Artists);
