import React, { useState, useEffect, useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Location = (props) => {
    const { store, actions } = useContext(Context);

    const [imageError, setImageError] = useState(false);

    const isFavorite = store.favorites.some(favorite => favorite.id === props.id && favorite.type === `location`);

    const handleAddFavorites = () => {
        isFavorite ? actions.removeFavorite(props) :
            actions.addFavorites({ type: `location`, title: props.title, id: props.id });
    };

    return (
        <div className="card mx-1" style={{ width: "18rem" }}>
            <img src={`https://get.wallhere.com/photo/7098x4360-px-Adult-Swim-animation-planet-Rick-and-Morty-space-1062446.jpg`} className="card-img-top img-fluid rounded-pill" alt="..." />
            <div className="card-body text-white">
                <h5 className="card-title">{props.title}</h5>
                <Link className="btn btn-dark" to={"/location/" + props.id}><span className="more">Location</span></Link>
                <button className="btn btn-outline-warning" onClick={handleAddFavorites}>
                    <i className={isFavorite ? "fa fa-heart text-danger" : "fa fa-heart text-white"}></i>
                </button>
            </div>
        </div>
    );
};