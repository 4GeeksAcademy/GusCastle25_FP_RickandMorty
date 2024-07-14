import { SignUp } from "../pages/signup";
import { element } from "prop-types";
import { Characters } from "../component/Characters";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			results: [],
			info: [],
			character: [
				{
					"id": 1,
					"name": "Rick Sanchez",
					"status": "Alive",
					"species": "Human",
					"type": "",
					"gender": "Male"
				}
			],
			location: [
				{
					"id": 1,
					"name": "Earth (C-137)",
					"type": "Planet",
					"dimension": "Dimension C-137"
				}
			],
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			auth: false,
			misCharacters: [],
			favorites: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			loadSomeData: () => {
				
			// fetch().then().then(data => setStore({ "foo": data.bar }))
				
			fetch("https://rickandmortyapi.com/api/character", { method: "GET" })
				.then((response) => response.json())
				.then((data) => setStore({ character: data.results }))
				.catch((error) => console.error(error));
			console.log("se cargo desde flux")

			fetch("https://rickandmortyapi.com/api/location", { method: "GET" })
				.then((response) => response.json())
				.then((data) => setStore({ location: data.results }))
				.catch((error) => console.error(error));
			console.log("se cargo desde flux ")
		},

			SignUp: (email, password) => {
				console.log('signup desde Flux')
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': "application/json" },
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				};
				fetch(process.env.BACKEND_URL + "api/signup", requestOptions)
					.then(response => {
						if (response.ok) {
							return response.json();
						} else {
							throw new Error("User already exists");
						}
					})
					.then(data => {
						setStore({ auth: true, email: email });
						localStorage.setItem("token", data.access_token);
					})
					.catch(error => {
						console.error("There was an error!", error);
						setStore({ errorMessage: error.message });
					});
			},

			// login: (email, password) => {
			// 	console.log('Login desde Flux');

			// 	const requestOptions = {
			// 		method: 'POST',
			// 		headers: { 'Content-Type': 'application/json' },
			// 		body: JSON.stringify({ email, password }),
			// 	};

			// 	fetch(`${process.env.BACKEND_URL}api/login`, requestOptions)
			// 		.then(response => {
			// 			if (!response.ok) {
			// 				return response.json().then(err => {
			// 					throw new Error(err.message || "Email or password wrong");
			// 				});
			// 			}
			// 			return response.json();
			// 		})
			// 		.then(data => {
			// 			if (data.access_token) {
			// 				localStorage.setItem("token", data.access_token);
			// 				setStore({ auth: true, email });
			// 			} else {
			// 				throw new Error("No access token found in response");
			// 			}
			// 		})
			// 		.catch(error => {
			// 			console.error("There was an error!", error);
			// 			setStore({ errorMessage: error.message });
			// 		});
			// },

			login: (email, password) => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				const raw = JSON.stringify({
					"email": email,
					"password": password
				});

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch("https://vigilant-winner-699qjx99rgqp25rj-3001.app.github.dev/api/login", requestOptions)
					.then(response => {
						if (response.ok) {
							setStore({ auth: true, email: email })
						} else {
							throw new Error("Email or password wrong");
						}
						return response.json()
					})
					.then(data => {
						localStorage.setItem("token", data.access_token)
					})
					.catch((error) => console.error(error));
			},

			verifyToken: async () => {
				try {
					const token = localStorage.getItem("token");
					if (token) {
						setStore({ auth: true });
					} else {
						setStore({ auth: false });
					}
				} catch (error) {
					console.error("Error al verificar el token:", error);
				}
			},

			logout: () => {
				console.log("log out desde flux")
				localStorage.removeItem("token");
				setStore({ auth: false })
			},

			changeMessage: (titulo) => {
				setStore({ message: titulo });
				setStore({ misCharacters: "1" + "2" });
				console.log("changeMessage desde flux" + titulo)
			},

			addFavorites: (name) => {
				const currentfavorites = getStore().favorites
				const newfavorites = [...currentfavorites, name];
				setStore({ favorites: newfavorites });
			},

			removeFavorite: (element) => {
				const store = getStore();
				console.log(store.favorites)
				console.log(element)
				const newfavorites = store.favorites.filter(favorite => favorite.uid !== element.uid || favorite.type !== element.type);
				setStore({ favorites: newfavorites });
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

		//reset the global store
		setStore({ demo: demo });
			}
		}
	};
};

export default getState;
