import axios from '../custom-axios/axios';

const SongsService = {
    fetchSongs: async () => {
        try {
            const { data } = await axios.get("/song");
            return data;
        } catch (error) {
            console.error('Error fetching songs:', error);
            throw error;
        }
    },
    fetchArtists: async () => {
        try {
            const { data } = await axios.get("/artist");
            return data;
        } catch (error) {
            console.error('Error fetching artists:', error);
            throw error;
        }
    },
    fetchPlaylist: async () => {
        try {
            const { data } = await axios.get("/playlist");
            return data;
        } catch (error) {
            console.error('Error fetching playlists:', error);
            throw error;
        }
    },
    fetchGenres: async () => {
        try{
            const { data } = await axios.get("/song/genres");
            return data;
        } catch (error) {
            console.error('Error fetching genres:', error);
            throw error;
        }
    },
    fetchMacedonianArtists: async () => {
        try {
            const { data } = await axios.get("/artist/macedonians");
            return data;
        } catch (error){
            console.error('Error fetching macedonians');
            throw error;
        }
    },
    fetchArtistDetails: async (id) =>{
        try{
            const { data } = await axios.get(`/artist/${id}`);
            return data;
        } catch (error) {
            console.error('Error fetching artistDetails:', error);
            throw error;
        }
    },
    getLongestSongByGenre: async (artistId, genre) =>{
        try{
            const { data } = await  axios.get(`/song/longestDuration/${artistId}?genre=${genre}`);
            return data;
        } catch (error) {
            console.error('Error getLongestSongByGenre:', error);
            throw error;
        }
    },
    getSpecifiedPlaylist: async (artistId) =>{
        try{
            const { data } = await axios.get(`/playlist/artist/${artistId}`);
            return data;
        } catch (error) {
            console.error('Error getSpecifiedPlaylist:', error);
            throw error;
        }
    },
    getPublicPlaylists: async () =>{
        try {
            const { data } = await axios.get(`/playlist/public`);
            return data;
        } catch (error) {
            console.error('Error getPublicPlaylists:', error);
            throw error;
        }
    },
    getPlaylistDuration: async (id) =>{
        try {
            const { data } = await axios.get(`/playlist/totalDuration/${id}`);
            return data;
        } catch (error) {
            console.error('Error getPlaylistDetails:', error);
            throw error;
        }
    },
    getFirstThreeSongs: async () =>{
        try{
            const { data } = await axios.get(`/song/threeSongs`);
            return data;
        } catch (error) {
            console.error('Error getFirstThreeSongs:', error);
            throw error;
        }
    },
    deletePlaylist: async (id) =>{
        try {
            await axios.delete(`/playlist/delete/${id}`);

        } catch (error) {
            console.error('Error deleting playlist:', error);
            throw error;
        }
    },
    addArtist: async (data) =>{
        try {
            await axios.post(`/artist/save`, data);
            return data;
        } catch (error) {
            console.error('Error adding artist:', error);
            throw error;
        }
    },
    addPlaylist: async (data) =>{
        try {
            await axios.post(`/playlist/save`, data);
            return data;
        } catch (error) {
            console.error('Error adding playlist:', error);
            throw error;
        }
    },
    addSong: async (id,data) =>{
        try {
            await axios.post(`/song/save/${id}`, data);
            return data;
        } catch (error) {
            console.error('Error adding song:', error);
            throw error;
        }
    },
    addSongToPlaylist: async (playlistId, songId) => {
        try {
            const {data} = await axios.post(`/playlist/add/${playlistId}?songId=${songId}`)
            return data;
        } catch (error) {
            console.error('Error adding song:', error);
            throw error;
        }
    }

};

export default SongsService;
