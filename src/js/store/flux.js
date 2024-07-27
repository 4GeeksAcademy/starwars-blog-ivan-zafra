const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      people: [],
      planets: [],
      starships: [],
      favorites: [],
      currentPerson: null,
      currentPlanet: null,
      currentStarship: null,
    },
    actions: {
      fetchPeople: async (type = "people", id = 1, count = 0) => {
        if (count >= 10) {
          return;
        }

        const resp = await fetch(`https://swapi.dev/api/${type}/?page=${id}`);
        const data = await resp.json();

        const peopleWithId = data.results.map((person) => {
          const urlParts = person.url.split("/");
          const id = urlParts[urlParts.length - 2];
          return { ...person, id };
        });

        setStore({ people: [...getStore().people, ...peopleWithId] });

        if (data.next) {
          getActions().fetchPeople(resource, page + 1, count + 1);
        }
      },

      fetchPersonDetails: async (id) => {
        try {
          const url = `https://swapi.dev/api/people/${id}/`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Error al obtener los detalles de la persona");
          }
          const data = await response.json();
          setStore({ currentPerson: data });
        } catch (error) {
          console.error("Error al obtener los detalles de la persona: ", error);
        }
      },

      fetchPlanets: async (type = "planets", id = 1, count = 0) => {
        if (count >= 10) {
          return;
        }

        const resp = await fetch(`https://swapi.dev/api/${type}/?page=${id}`);
        const data = await resp.json();

        const planetsWithId = data.results.map((planet) => {
          const urlParts = planet.url.split("/");
          const id = urlParts[urlParts.length - 2];
          return { ...planet, id };
        });

        setStore({ planets: [...getStore().planets, ...planetsWithId] });

        if (data.next) {
          getActions().fetchPlanets(resource, page + 1, count + 1);
        }
      },

      fetchPlanetDetail: async (id) => {
        try {
          const url = `https://swapi.dev/api/planets/${id}/`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Error al obtener la información del planeta");
          }
          const data = await response.json();
          setStore({ currentPlanet: data });
        } catch (error) {
          console.error("Error al obtener la información del planeta: ", error);
        }
      },

      fetchStarShips: async (type = "starships", id = 1, count = 0) => {
        if (count >= 10) {
          return;
        }

        const resp = await fetch(`https://swapi.dev/api/${type}/?page=${id}`);
        const data = await resp.json();

        const starshipsWithId = data.results.map((starship) => {
          const urlParts = starship.url.split("/");
          const id = urlParts[urlParts.length - 2];
          return { ...starship, id };
        });

        setStore({ starships: [...getStore().starships, ...starshipsWithId] });

        if (data.next) {
          getActions().fetchStarShips(resource, page + 1, count + 1);
        }
      },
      fetchStarshipDetails: async (id) => {
        try {
          const url = `https://swapi.dev/api/starships/${id}/`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Error al obtener los detalles de la nave");
          }
          const data = await response.json();
          setStore({ currentStarship: data });
        } catch (error) {
          console.error("Error al obtener los detalles de la nave: ", error);
        }
      },
      addFavorites: (name, id, type) => {
        const store = getStore();
        const newFavorite = { name, id, type };
        const newFavorites = [...store.favorites, newFavorite];
        setStore({ favorites: newFavorites });
      },

      removeFavorites: (name) => {
        const store = getStore();
        const newFavorites = store.favorites.filter(
          (favorite) => favorite.name !== name
        );
        setStore({ favorites: newFavorites });
      },
    },
  };
};

export default getState;
