import React, { useState, useEffect, useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Location = (props) => {
    const { store, actions } = useContext(Context);

    const [imageError, setImageError] = useState(false);

    const isFavorite = store.favorites.some(favorite => favorite.uid === props.uid && favorite.type === `planets`);

    const handleAddFavorites = () => {
        isFavorite ? actions.removeFavorite(props) :
            actions.addFavorites({ type: `planets`, title: props.title, uid: props.uid });
    };
    const handleImageError = () => {
        setImageError(true);
    };
    return (
        <div className="card mx-1" style={{ width: "18rem" }}>
            <img src={`https://rickandmortyapi.com/api/location/${props.uid}.jpg`} className="card-img-top" alt="..." />
            <div className="card-body text-white">
                <h5 className="card-title">{props.title}</h5>
                <Link className="btn btn-dark" to={"/location/" + props.uid}><span className="more">Location</span></Link>
                <button className="btn btn-outline-warning" onClick={handleAddFavorites}>
                    <i className={isFavorite ? "fa fa-heart text-danger" : "fa fa-heart text-white"}></i>
                </button>
            </div>
        </div>
    );
};