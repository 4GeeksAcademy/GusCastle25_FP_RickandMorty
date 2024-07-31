import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import Login from "./login";
import "../../styles/home.css";
import { Demo } from "./demo";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(true); // Variable para controlar si el componente está montado

    useEffect(() => {
        const verifyToken = async () => {
            await actions.verifyToken();
            if (mounted) { // Verificar si el componente está montado antes de actualizar el estado
                setLoading(false);
            }
        };

        if (loading) {
            verifyToken();
        }

        // Función de limpieza para actualizar el estado de 'mounted' cuando el componente se desmonta
        return () => {
            setMounted(false);
        };
    }, [loading, actions, mounted]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (store.auth) {
        return <Navigate to="/private" />;
    }

    return (
        <div className="row">
            <div className="col-md-10">
                <Demo />
            </div>
            <div className="col-md-2 text-center mt-3">
                <Login />
            </div>
        /</div>
    );
};
