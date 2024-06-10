import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import SongsService from "../../../Repository/SongRepository";
import { useMusic } from '../../../Context/MusicContext';
import Header from "../../Header/Header";

const AddPlaylist = () => {

    const navigate = useNavigate();
    const {addPlaylistToContext, fetchPlaylists} = useMusic();
    const [name, setName] = useState("");
    const [dateCreated, setDateCreated] = useState("");
    const [statusPublic, setStatusPublic] = useState(true);
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const addPlaylistHandler = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const newPlaylist = await SongsService.addPlaylist({
                name,
                dateCreated,
                statusPublic,
                songs
            });
            toast.success("Successfully added a playlist!");
            fetchPlaylists()
            setIsLoading(false);
            setError(null)
            navigate("/playlists");

        } catch (error) {
            toast.error("Not successful");
            setError("Error:" + error.response.data)
            setIsLoading(false);
        }
    };


    return (
        <>
            <Header/>

            <div className={" flex flex-col bg-blue-400 min-w-fit min-h-screen justify-center items-center"}>
                <form className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded shadow-md"
                      onSubmit={addPlaylistHandler}>
                    <h2 className="text-2xl font-bold mb-4 text-center">Add New Playlist</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Name
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="h-10 w-full border border-gray-300 rounded px-3 py-2 leading-tight focus:outline-none focus:border-indigo-500"
                            placeholder="Name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Date Created
                        </label>
                        <input
                            value={dateCreated}
                            onChange={(e) => setDateCreated(e.target.value)}
                            type="date"
                            id="dateCreated"
                            name="dateCreated"
                            className="h-10 w-full border border-gray-300 rounded px-3 py-2 leading-tight focus:outline-none focus:border-indigo-500"
                            placeholder="Date Created"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Is it public?
                        </label>
                        <div>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio h-5 w-5 text-indigo-600"
                                    value={true}
                                    checked={statusPublic === true}
                                    onChange={() => setStatusPublic(true)}
                                />
                                <span className="ml-2">Public</span>
                            </label>
                            <label className="inline-flex items-center ml-6">
                                <input
                                    type="radio"
                                    className="form-radio h-5 w-5 text-indigo-600"
                                    value={false}
                                    checked={statusPublic === false}
                                    onChange={() => setStatusPublic(false)}
                                />
                                <span className="ml-2">Private</span>
                            </label>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            type="submit"
                            className="bg-indigo-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {isLoading ? (
                                <CircularProgress color="inherit" size="1rem"/>
                            ) : (
                                "Add"
                            )}
                        </button>
                    </div>
                </form>
                {error && (
                    <div className="text-red-600 mt-4 bg-red-200 p-5 rounded-2xl">{error}</div>
                )}
            </div>
        </>
    );
};

export default AddPlaylist;
