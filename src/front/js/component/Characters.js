import React, { useState, useEffect, useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Characters = (props) => {
    const { store, actions } = useContext(Context);
    const [people, setPeople] = useState({}); // Inicializamos como null

    const isFavorite = store.favorites.some(favorite => favorite.id === props.id && favorite.type === `character`);

    const handleAddFavorites = () => {
        isFavorite ? actions.removeFavorite(props) :
            actions.addFavorites({ type: `character`, title: props.title, id: props.id });
    };

    return (
        <div className="card mx-1" style={{ width: "18rem" }}>
            <h5 className="card-title">{props.title}</h5>
            <img src={`https://rickandmortyapi.com/api/character/avatar/${props.id}.jpeg`} className="card-img-top img-fluid rounded-pill" alt="..." />
            <div className="card-body text-white">
                <Link className="btn btn-dark" to={"/character/" + props.id}><span className="more">Character</span></Link>
                <button className="btn btn-outline-warning" onClick={handleAddFavorites}>
                    <i className={isFavorite ? "fa fa-heart text-danger" : "fa fa-heart text-white"}></i>
                </button>
                {/* <p className="card-text">Id {props.id}</p> */}

            </div>
        </div>
    );
};