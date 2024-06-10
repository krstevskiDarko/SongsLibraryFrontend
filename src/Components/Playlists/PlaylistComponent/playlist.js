import React from "react";
import {useMusic} from "../../../Context/MusicContext";

const PlaylistComponent = (playlist) => {
    const {songs} = useMusic();
    return (
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
        </div>
    );
}

export default PlaylistComponent