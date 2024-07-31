import React, { useState, useEffect, useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Location = (props) => {
    // console.log(props)
    const { store, actions } = useContext(Context);

    const [imageError, setImageError] = useState(false);

    const isFavorite = store.favorites.some(favorite => favorite.id === props.uid && favorite.type === `location`);

    const handleAddFavorites = () => {
        isFavorite ? actions.removeFavorite(props) :
            actions.addFavorites({ type: `location`, title: props.title, id: props.uid });
    };

    return (
        <div className="card mx-1" style={{ width: "18rem" }}>
            <h5 className="card-title">{props.title}</h5>
            <img src={`https://m.media-amazon.com/images/S/pv-target-images/3f8ae4a13de932bc679af5272ce983693d773818ff67a774dfcf0592bcd3beb7._SX1080_FMjpg_.jpg`} className="card-img-top img-fluid rounded-pill" alt="..." />
            <div className="card-body text-white">
                <Link className="btn btn-dark" to={"/location/" + props.uid}><span className="more">Location</span></Link>
                <button className="btn btn-outline-warning" onClick={handleAddFavorites}>
                    <i className={isFavorite ? "fa fa-heart text-danger" : "fa fa-heart text-white"}></i>
                </button>
            </div>
        </div>
    );
};