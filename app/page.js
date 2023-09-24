"use client"
import React, { useState } from "react";
import UpdateContestsButton from './UpdateContestsButton';
import UpdateConcursosButton from "./UpdateConcursosButton";
import UpdateFavoritesButton from "./UpdateFavoritesButton";
import Favorites from "./Favorites";
import Contests from "./Contests";
import Concursos from "./Concursos";

export default function Page() {

    // State for Favorites
    const [favoritesUpdated, setFavoritesUpdated ] = useState(false);
    const handleFavoritesUpdated = () => {
        setFavoritesUpdated(!favoritesUpdated);
    };

    // State for controlling whether to render the Contests component
    const [renderContests, setRenderContests] = useState(false);
    const [contestsKey, setContestsKey] = useState(0);

    const handleRenderContests = () => {
        setRenderContests(!renderContests);
        setContestsKey(contestsKey + 1);
    };

    // State for controlling whether to render the Concursos component
    const [renderConcursos, setRenderConcursos] = useState(false);
    const [concursosKey, setConcursosKey] = useState(0);

    const handleRenderConcursos = () => {
        setRenderConcursos(!renderConcursos);
        setConcursosKey(concursosKey + 1);
    };

    return (
        <main>
            <div className="p-2">
                <div className="w-1/4 text-3xl">List of Contests for Short Stories in English & Spanish</div>
                <div className="justify-end">
                    <div className="m-20 mr-20 flex">
                    <UpdateContestsButton onClick={handleRenderContests} />
                    <Contests key={contestsKey} onFavoriteAdded={handleFavoritesUpdated} />
                
                    <UpdateConcursosButton onUpdate={handleRenderConcursos}/>
                    <Concursos key={concursosKey} onFavoriteAdded={handleFavoritesUpdated}/>
            
                    <UpdateFavoritesButton onFavoriteAdded={handleFavoritesUpdated}/>
                    <Favorites key={favoritesUpdated}/>
                    </div>
                </div>
            </div>
        </main>
    );
}
