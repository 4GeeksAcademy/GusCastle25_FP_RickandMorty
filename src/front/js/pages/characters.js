import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Characters = props => {
	const { store, actions } = useContext(Context);
	const [people, setPeople] = useState({}); // Inicializamos como null
	const params = useParams();
	
	useEffect(() => {
			fetch("https://rickandmortyapi.com/api/character", { method: "GET" })
				.then((response) => response.json())
				.then((data) => setPeople({ character: data.results }) )
				.catch((error) => console.error(error));
			console.log("se cargo personajes desde vista")
		}, [])

	return (
		<div className="jumbotron text-white">
			<h1 className="display-4">{props.title}: {props.id}</h1>
			<hr className="my-4" />
			<p>name: {people.title}</p>
			<p>status: {people.status}</p>
			<p>species: {people.species}</p>
			<p>gender: {people.gender}</p> 
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