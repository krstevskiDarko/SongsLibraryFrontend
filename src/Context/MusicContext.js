import React, { createContext, useContext, useState, useEffect } from 'react';
import SongsService from '../Repository/SongRepository';

const MusicContext = createContext({
    songs: [],
    artists: [],
    playlists: [],
    loading: true,
    error: null,
});

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSongs = async () => {
        try {
            const songsData = await SongsService.fetchSongs();
            setSongs(songsData);
        } catch (err) {
            setError(err);
        }
    };

    const fetchArtists = async () => {
        try {
            const artistsData = await SongsService.fetchArtists();
            setArtists(artistsData);
        } catch (err) {
            setError(err);
        }
    };

    const fetchGenres = async () => {
        try {
            const genresData = await SongsService.fetchGenres();
            setGenres(genresData);
        } catch (err) {
            setError(err);
        }
    };

    const fetchPlaylists = async () => {
        try {
            const playlistsData = await SongsService.fetchPlaylist();
            setPlaylists(playlistsData);
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([
                fetchSongs(),
                fetchArtists(),
                fetchGenres(),
                fetchPlaylists()
            ]);
            setLoading(false);
        };

        loadData();
    }, []);

    const addArtistToContext = (newArtist) => {
        setArtists((prevArtists) => [...prevArtists, newArtist]);
    };

    const addPlaylistToContext = (newPlaylist) => {
        setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
    };

    const addSongToContext = (newSong) => {
        setSongs((prevSongs) => [...prevSongs, newSong]);
    };

    const addSongToPlaylistContext = (playlistId, newSong) => {
        setPlaylists((prevPlaylists) =>
            prevPlaylists.map((playlist) =>
                playlist.id.toString() === playlistId.toString()
                    ? { ...playlist, songs: [...playlist.songs, newSong.id] }
                    : playlist
            )
        );
    };

    return (
        <MusicContext.Provider
            value={{
                songs,
                artists,
                playlists,
                loading,
                error,
                genres,
                addArtistToContext,
                addPlaylistToContext,
                addSongToContext,
                addSongToPlaylistContext,
                fetchSongs,
                fetchArtists,
                fetchGenres,
                fetchPlaylists
            }}
        >
            {children}
        </MusicContext.Provider>
    );
};

export default MusicContext;
