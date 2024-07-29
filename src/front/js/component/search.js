import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Characters } from "./Characters";
import { Location } from "./Location";

export const Search = () => {
    const { store } = useContext(Context);

    return (
        <div className="search-results">
            {store.filteredCharacters && store.filteredCharacters.length > 0 && (
                <div className="container mb-3">
                    <h2 className="carousel-title">Characters</h2>
                    <div className="d-flex flex-wrap">
                    {store.filteredCharacters.map((character) => <Characters key={character.id} id={character.id} title={character.name} />)}                     
                    </div>
                </div>
            )}  
            {store.filteredLocation && store.filteredLocation.length > 0 && (
                <div className="container mb-3">
                    <h2 className="carousel-title">Location</h2>
                    <div className="d-flex flex-wrap">
                    {store.filteredLocation.map((item) => <Location key={item.id} uid={item.id} title={item.name} />)}
                    </div>
                </div>
            )} 
        </div>
    );
};