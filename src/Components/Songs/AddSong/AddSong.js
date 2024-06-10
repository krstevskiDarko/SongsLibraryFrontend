import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import SongsService from "../../../Repository/SongRepository";
import { useMusic } from '../../../Context/MusicContext';
import Header from "../../Header/Header";
import Long from "long";

const AddSong = () => {
    const {addSongToContext, genres, artists,fetchSongs} = useMusic();

    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [durationInMinutes, setDurationInMinutes] = useState("");
    const [releaseDate, setReleaseDate] = useState(true);
    const [genre, setGenre] = useState('POP');
    const initialArtistId = artists.length > 0 ? artists[0].id : '';
    const [artistId, setArtistId] = useState(initialArtistId);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const addSongHandler = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            await SongsService.addSong(artistId,{
                title,
                durationInMinutes,
                releaseDate,
                genre
            });
            toast.success("Successfully added a playlist!");
            fetchSongs()
            setIsLoading(false);
            setError(null)
            navigate("/songs");

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
                      onSubmit={addSongHandler}>
                    <h2 className="text-2xl font-bold mb-4 text-center">Add New Song</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Title
                        </label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            id="title"
                            name="title"
                            required
                            className="h-10 w-full border border-gray-300 rounded px-3 py-2 leading-tight focus:outline-none focus:border-indigo-500"
                            placeholder="Title"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Duration In Minutes
                        </label>
                        <input
                            value={durationInMinutes}
                            onChange={(e) => setDurationInMinutes(e.target.value)}
                            type="number"
                            required
                            id="durationInMinutes"
                            name="durationInMinutes"
                            className="h-10 w-full border border-gray-300 rounded px-3 py-2 leading-tight focus:outline-none focus:border-indigo-500"
                            placeholder="Duration in minutes"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Release Date
                        </label>
                        <input
                            value={releaseDate}
                            onChange={(e) => setReleaseDate(e.target.value)}
                            type="date"
                            required
                            id="releaseDate"
                            name="releaseDate"
                            className="h-10 w-full border border-gray-300 rounded px-3 py-2 leading-tight focus:outline-none focus:border-indigo-500"
                            placeholder="Release Date"
                        />
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
                    <div className="mb-4">
                        <label htmlFor="artistId" className="mr-2">Select Artist:</label>
                        <select id="artistId" value={artistId} onChange={(e) => setArtistId(e.target.value)}
                                className="border rounded-md p-2">
                            {artists.map(artist => (
                                <option key={artist.id} value={artist.id}>{artist.name}</option>
                            ))}
                        </select>
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

export default AddSong;
