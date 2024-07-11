import React, { useState, useEffect, useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Characters = (props) => {
    const { store, actions } = useContext(Context);

    const isFavorite = store.favorites.some(favorite => favorite.uid === props.uid && favorite.type === `character`);

    const handleAddFavorites = () => {
        isFavorite ? actions.removeFavorite(props) :
            actions.addFavorites({ type: `character`, title: props.title, uid: props.uid });
    };

    return (
        <div className="card mx-1" style={{ width: "18rem" }}>
            <img src={`https://rickandmortyapi.com/api/character/avatar/${props.uid}.jpg`} className="card-img-top" alt="..." />
            <div className="card-body text-white">
                <h5 className="card-title">{props.title}</h5>
                <Link className="btn btn-dark" to={"/character/" + props.uid}><span className="more">Character</span></Link>
                <button className="btn btn-outline-warning" onClick={handleAddFavorites}>
                    <i className={isFavorite ? "fa fa-heart text-danger" : "fa fa-heart text-white"}></i>
                </button>
            </div>
        </div>
    );
};