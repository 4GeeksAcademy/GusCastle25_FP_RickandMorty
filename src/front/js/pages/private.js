import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Characters } from "../component/Characters";
import { Location } from "../component/Location";
import { Navigate, Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
	const { store, actions } = useContext(Context);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log(store.id)
	}, [store.id]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			actions.verifyToken();
		}
		setLoading(false);
		actions.loadSomeData()
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!store.auth) {
		return <Navigate to="/" />;
	};



	return (
		<div className="text-center m-1 row">

			<div className="col-md-10">
				<h1 className="text-center mt-5 text-white">Characters</h1>
				<div className="row flex-row flex-nowrap overflow-auto mx-3">
					{store.character.map((character) => <Characters key={character.id} id={character.id} title={character.name} />)}
				</div>
				<h1 className="text-center mt-5 text-white">Location</h1>
				<div className="row flex-row flex-nowrap overflow-auto mx-3">
					{store.location.map((item) => <Location key={item.id} uid={item.id} title={item.name} />)}
				</div>
			</div>

			<div className="col-md-2">
				<div className="form-container">
					<p><span style={{ fontWeight: "bolder" }}>Welcome</span>{store.email}</p>
					<p className="title">This is your private area</p>
					<p className="title">Profile</p>
					<div className="container d-flex flex-column justify-content-center align-items-center">
						<p className="signup pe-2">Do you want to exit?</p>
						<Link to="/">
							<button rel="noopener noreferrer" href="#" className="btn btn-warning m-2" onClick={() => actions.logout()}> Log Out</button>
						</Link>
						<button className="btn btn-outline-danger" onClick={() => actions.deleteUser(store.id)}>Eliminar Cuenta</button>
					</div>
				</div>
			</div>

			<Link to="/">
				<span className="btn btn-primary btn-lg m-3" href="#" role="button">
					Back home
				</span>
			</Link>
		</div>
	);
};

Private.propTypes = {
	match: PropTypes.object
};