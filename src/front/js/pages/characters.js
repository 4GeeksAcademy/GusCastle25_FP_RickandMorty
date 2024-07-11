import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Characters = props => {
	const { store, actions } = useContext(Context);
	const [character, setCharacter] = useState({})
	const params = useParams();

	useEffect(() => {
		fetch("https://rickandmortyapi.com/api/character" + params.character_id, { method: "GET" })
			.then((response) => response.json())
			.then((data) => setCharacter(data.resuls.properties))
			.catch((error) => console.error(error));
		console.log("se llama los personajes")
	}, [])
	console.log(params)
	return (
		<div className="jumbotron text-white">
			<h1 className="display-4">{character.name}: {params.character_id}</h1>

			<hr className="my-4" />
			<p>name: {character.name}</p>
			<p>status: {character.status}</p>
			<p>species: {character.species}</p>
			<p>gender: {character.gender}</p>
			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back home
				</span>
			</Link>
		</div>
	);
};

Characters.propTypes = {
	match: PropTypes.object
};