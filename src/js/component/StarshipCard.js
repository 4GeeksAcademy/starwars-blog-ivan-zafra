import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";

function StarshipCard() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.fetchStarShips();
  }, []);

  const handleFavorites = (starship) => {
    const isFavorite = store.favorites.some((fav) => fav.id === starship.id);
    if (isFavorite) {
      actions.removeFavorites(starship.name);
    } else {
      actions.addFavorites(starship.name, starship.id, "starship");
    }
  };

  return (
    <div
      className="d-flex col-10 overflow-auto mt-5 mx-auto cards"
      style={{ height: "50rem" }}
    >
      {store.starships.map((starship, index) => {
        const isFavorite = store.favorites.some(
          (fav) => fav.id === starship.id && fav.type === "starship"
        );
        return (
          <div
            key={index}
            className="card col-1 mx-1"
            style={{ width: "20rem", height: "38rem" }}
          >
            <h3>{starship.name}</h3>
            <img
              src={`https://starwars-visualguide.com/assets/img/starships/${starship.id}.jpg`}
              className="card-img-top"
              alt={starship.name}
              style={{ height: "20rem", width: "20rem" }}
            />
            <p>Modelo: {starship.model}</p>
            <p>Diseñador: {starship.manufacturer}</p>
            <p>Coste: {starship.cost_in_credits}</p>
            <p>Largo: {starship.length}</p>
            <p>Velocidad máxima: {starship.max_atmosphering_speed}</p>
            <Link to={`/StarshipDetail/${starship.id}`}>Mas información</Link>
            <button
              className={isFavorite ? "fas fa-heart" : "far fa-heart"}
              onClick={() => handleFavorites(starship)}
            ></button>
          </div>
        );
      })}
    </div>
  );
}

export default StarshipCard;
