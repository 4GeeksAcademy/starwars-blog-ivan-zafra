import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(store.favorites);
  }, [store.favorites]);

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Inicio</span>
        </Link>

        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favoritos
          </button>
          <ul className="dropdown-menu">
            {favorites?.map((favorite) => {
              return (
                <li key={favorite.id}>
                  {favorite.type === "character" && (
                    <Link to={`/CharacterDetail/${favorite.id}`}>
                      {favorite.name}
                    </Link>
                  )}
                  {favorite.type === "starship" && (
                    <Link to={`/StarshipDetail/${favorite.id}`}>
                      {favorite.name}
                    </Link>
                  )}
                  {favorite.type === "planet" && (
                    <Link to={`/PlanetDetail/${favorite.id}`}>
                      {favorite.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};
