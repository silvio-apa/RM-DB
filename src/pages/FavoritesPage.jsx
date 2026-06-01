import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteFavorite,
  getFavorites,
  updateFavorite,
} from "../services/favoritesApi";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadFavorites() {
      try {
        const data = await getFavorites();
        setFavorites(data);
      } catch (error) {
        setErrorMessage("Failed to load favorites. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadFavorites();
  }, []);

  async function handleDeleteFavorite(id) {
    try {
      await deleteFavorite(id);

      const updatedFavorites = favorites.filter(
        (favorite) => favorite.id !== id,
      );
      setFavorites(updatedFavorites);
    } catch (error) {
      setErrorMessage("Failed to remove favorite. Please try again later.");
    }
  }

  function handleNoteChange(id, note) {
    setErrorMessage("");
    const updatedFavorites = favorites.map((favorite) =>
      favorite.id === id ? { ...favorite, note } : favorite,
    );
    setFavorites(updatedFavorites);
  }

  async function handleSaveNote(id, note) {
    try {
      setErrorMessage("");
      const updatedFavorite = await updateFavorite(id, { note });

      const updatedFavorites = favorites.map((favorite) =>
        favorite.id === id ? updatedFavorite : favorite,
      );
      setFavorites(updatedFavorites);
    } catch (error) {
      setErrorMessage("Note could not be saved. Please try again.");
    }
  }

  if (isLoading) {
    return <p>Loading favorites...</p>;
  }

  return (
    <section>
      <h1>Favorites</h1>

      <p>
        Save your favorite characters, add personal notes and manage your own
        collection.
      </p>

      {errorMessage && <p>Error: {errorMessage}</p>}

      {favorites.length === 0 && <p> No favorites saved yet.</p>}

      <div className="character-grid">
        {favorites.map((favorite) => (
          <article className="character-card" key={favorite.id}>
            <img src={favorite.image} alt={favorite.name} />
            <div>
              <h2>{favorite.name}</h2>
              <p>Status: {favorite.status}</p>
              <p>Species: {favorite.species}</p>

              <Link to={`/characters/${favorite.characterId}`}>
                View Details
              </Link>

              <label className="note-label">
                Personal Note:
                <textarea
                  className="note-textarea"
                  value={favorite.note || ""}
                  onChange={(event) =>
                    handleNoteChange(favorite.id, event.target.value)
                  }
                  placeholder="Add your personal note here..."
                />
              </label>
              <button
                className="save-button"
                onClick={() => handleSaveNote(favorite.id, favorite.note || "")}
              >
                Save Note
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteFavorite(favorite.id)}
              >
                Remove from Favorites
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FavoritesPage;
