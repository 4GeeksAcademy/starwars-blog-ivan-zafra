import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";

function PeopleCard() {
  const { store, actions } = useContext(Context);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    actions.fetchPeople();
  }, []);

  useEffect(() => {
    setPeople(store.people);
  }, [store.people]);

  const handleFavorites = (person) => {
    const isFavorite = store.favorites.some((fav) => fav.id === person.id);
    if (isFavorite) {
      actions.removeFavorites(person.name);
    } else {
      actions.addFavorites(person.name, person.id, "character");
    }
  };

  return (
    <div
      className="d-flex col-10 overflow-auto mt-5 mx-auto cards"
      style={{ height: "50rem" }}
    >
      {people.map((person, index) => {
        const isFavorite = store.favorites.some(
          (fav) => fav.id === person.id && fav.type === "character"
        );
        return (
          <div
            key={index}
            className="card col-1 mx-1"
            style={{ width: "20rem", height: "38rem" }}
          >
            <h3>{person.name}</h3>
            <img
              src={`https://starwars-visualguide.com/assets/img/characters/${person.id}.jpg`}
              className="card-img-top"
              alt={person.name}
              style={{ height: "20rem", width: "20rem" }}
            />
            <p>Altura: {person.height}</p>
            <p>Peso: {person.mass}</p>
            <p>Color de pelo: {person.hair_color}</p>
            <p>Color de piel: {person.skin_color}</p>
            <p>Color de ojos: {person.eye_color}</p>
            <Link to={`/CharacterDetail/${person.id}`}>Mas información</Link>
            <button
              className={isFavorite ? "fas fa-heart" : "far fa-heart"}
              onClick={() => handleFavorites(person)}
            >
              {" "}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PeopleCard;
