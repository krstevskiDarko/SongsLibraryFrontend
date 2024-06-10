import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {CircularProgress} from "@mui/material";
import SongsService from "../../../Repository/SongRepository";
import {useMusic} from '../../../Context/MusicContext';
import Header from "../../Header/Header"; // Import the context

const AddArtist = () => {
    const navigate = useNavigate();
    const {addArtistToContext,fetchArtists} = useMusic();
    const [name, setName] = useState("");
    const [artisticName, setArtisticName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [nationality, setNationality] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const addArtistHandler = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
             await SongsService.addArtist({
                name,
                artisticName,
                dateOfBirth,
                nationality
            });
            fetchArtists()
            toast.success("Successfully added an artist!");
            setIsLoading(false);
            navigate("/artists");
        } catch (error) {
            toast.error("Not successful");
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header/>
            <div className={" flex bg-blue-400 min-w-fit min-h-screen justify-center items-center"}>
                <form className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded shadow-md"
                      onSubmit={addArtistHandler}>
                    <h2 className="text-2xl font-bold mb-4 text-center">Add New Artist</h2>
                    <div className="flex justify-between">
                        <div className="w-1/2 mr-2">
                            <div className="relative mt-8 mb-3">
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="peer h-10 w-full border border-gray-300 placeholder-transparent focus:outline-none focus:border-indigo-500 pl-2 focus:border-l-4 mb-4"
                                    placeholder="Name"
                                />
                                <label
                                    htmlFor="name"
                                    className="absolute left-2 -top-5 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-1 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-indigo-500"
                                >
                                    Name
                                </label>
                            </div>
                        </div>
                        <div className="w-1/2 ml-2">
                            <div className="relative mt-8 mb-3">
                                <input
                                    value={artisticName}
                                    onChange={(e) => setArtisticName(e.target.value)}
                                    required
                                    type="text"
                                    id="artisticName"
                                    name="artisticName"
                                    className="peer h-10 w-full border border-gray-300 placeholder-transparent focus:outline-none pl-2 focus:border-l-4 focus:border-indigo-500 mb-4"
                                    placeholder="Artistic Name"
                                />
                                <label
                                    htmlFor="artisticName"
                                    className="absolute left-2 -top-5 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-1 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-indigo-500"
                                >
                                    Artistic Name
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="relative mb-3">
                        <input
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            className="peer h-10 w-full border border-gray-300 placeholder-transparent focus:outline-none focus:border-indigo-500 pl-2 focus:border-l-4  mb-4"
                            placeholder=""
                        />
                        <label
                            htmlFor="dateOfBirth"
                            className="absolute left-2 -top-5 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-1 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-indigo-500"
                        >
                            Date of Birth
                        </label>
                    </div>
                    <div className="relative mb-3">
                        <input
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                            type="text"
                            id="nationality"
                            name="nationality"
                            className="peer h-10 w-full border border-gray-300 placeholder-transparent focus:outline-none pl-2 focus:border-l-4 focus:border-indigo-500 mb-4"
                            placeholder="Nationality"
                        />
                        <label
                            htmlFor="nationality"
                            className="absolute left-2 -top-5 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-1 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-indigo-500"
                        >
                            Nationality
                        </label>
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
            </div>
        </>
    );
};

export default AddArtist;
