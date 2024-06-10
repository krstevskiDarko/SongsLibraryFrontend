import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../../Pages/Home/HomePage';
import Songs from '../Songs/Songs';
import { MusicProvider } from '../../Context/MusicContext';
import './App.css';
import Artists from "../Artist/Artists";
import Playlists from "../Playlists/Playlists";
import MacedonianArtists from "../Artist/MacedonianArtists/MacedonianArtists";
import ArtistDetails from "../Artist/ArtistDetails/ArtistDetails";
import LongestSong from "../Songs/LongestSong/LongestSong";
import SpecifiedPlaylist from "../Playlists/PlaylistWithSongsFromArtist/SpecifiedPlaylist";
import PublicPlaylists from "../Playlists/PublicPlaylists/PublicPlaylists";
import PlaylistTotalDuration from "../Playlists/TotalDuration/PlaylistTotalDuration";
import ThreeSongs from "../Songs/ThreeSongs/ThreeSongs";
import AddArtist from "../Artist/AddArtist/AddArtist";
import AddPlaylist from "../Playlists/AddPlaylist/AddPlaylist";
import AddSong from "../Songs/AddSong/AddSong";
import AddSongToPlaylist from "../Playlists/AddPlaylist/AddSongToPlaylist";


const App = () => {
    return (
        <MusicProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/songs" element={<Songs />} />
                    <Route path="/songs/longest" element={<LongestSong />} />
                    <Route path="/songs/threeSongs" element={<ThreeSongs />} />
                    <Route path="/songs/addSong" element={<AddSong />} />

                    <Route path="/playlists" element={<Playlists />} />
                    <Route path="/playlists/artist" element={<SpecifiedPlaylist />} />
                    <Route path="/playlists/public" element={<PublicPlaylists />} />
                    <Route path="/playlists/totalDuration/:id" element={<PlaylistTotalDuration />} />
                    <Route path="/playlists/addPlaylist" element={<AddPlaylist />} />
                    <Route path="/playlists/songs/:id" element={<AddSongToPlaylist />} />

                    <Route path="/artists" element={<Artists />} />
                    <Route path="/artists/macedonian" element={<MacedonianArtists/>}/>
                    <Route path="/artists/:id" element={<ArtistDetails />} />
                    <Route path="/artists/addArtist" element={<AddArtist />} />


                </Routes>
            </BrowserRouter>
        </MusicProvider>
    );
};

export default App;
