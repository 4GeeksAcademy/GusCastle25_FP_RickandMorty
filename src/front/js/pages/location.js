import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Location = props => {
    const { store, actions } = useContext(Context);
    const [location, setLocation] = useState({});
    const params = useParams();

    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/location", { method: "GET" })
            .then((response) => response.json())
            .then((data) => setLocation(data.results))
            .catch((error) => console.error(error));
        console.log("se cargo vista Location")
    }, [])

    return (
        <div className="jumbotron text-white">
            <h1 className="display-4">{props.title}: {props.id}</h1>
            <hr className="my-4" />
            <p>name: {location.name}</p>
            <p>type: {location.type}</p>
            <p>dimension: {location.dimension}</p>
            <p>residents: {location.residents}</p>
            <Link to="/">
                <span className="btn btn-primary btn-lg" href="#" role="button">
                    Back home
                </span>
            </Link>
        </div>
    );
};

Location.propTypes = {
    match: PropTypes.object
};