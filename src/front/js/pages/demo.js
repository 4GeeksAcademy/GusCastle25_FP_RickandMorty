import React, { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../store/appContext";

export const Demo = () => {
    const { store, actions } = useContext(Context);

    const [characters, setCharacters] = useState([]);
    const [nameFilter, setNameFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const charactersEl = useRef(null);

    useEffect(() => {
        // Función para obtener personajes desde la API
        const getCharacters = async (name, status) => {
            let url = 'https://rickandmortyapi.com/api/character/';

            if (name || status) {
                url += '?';
                if (name) {
                    url += `name=${name}&`;
                }
                if (status) {
                    url += `status=${status}`;
                }
            }

            const response = await fetch(url);
            const data = await response.json();

            return data.results;
        };

        // Función para renderizar personajes en el DOM
        const displayCharacters = async (name, status) => {
            const characters = await getCharacters(name, status);
            setCharacters(characters);
        };

        displayCharacters(nameFilter, statusFilter);
    }, [nameFilter, statusFilter]);

    return (
        <div>
            <div className="text-center mt-5">
                <input
                    className="text-center mx-2"
                    id="name-filter"
                    type="text"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    placeholder="Filter by name"
                />
                <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </select>
            </div>
            <div id="characters" ref={charactersEl}>
                {characters.map((character) => (
                    <div key={character.id} className="character-card text-center mt-5">
                        <p>{character.status}</p>
                        <img src={character.image} className="img-fluid rounded-pill" alt={character.name} />
                        <h2>{character.name}</h2>
                        {/* <p>Species: {character.species}</p> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

