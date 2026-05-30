import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteFavorite, getFavorites } from "../services/favoritesApi";


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
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        loadFavorites();
    }, []);


    async function handleDeleteFavorite(id) {
        try {
            await deleteFavorite(id);

            const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
            setFavorites(updatedFavorites);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    if (isLoading) {
        return <p>Loading favorites...</p>;
    }

    if (errorMessage) {
        return <p>Error: {errorMessage}</p>;
    }

    return (
        <section>
            <h1>Favorites</h1>

            <p>Save your favorite characters, add personal notes and manage your own
               collection.
             </p>

            {favorites.length === 0 && <p> No favorites saved yet.</p>}

            <div className="character-grid">
                {favorites.map((favorite) => (
                    <article className="character-card" key={favorite.id}>
                        <img src={favorite.image} alt={favorite.name} />
                        <div>
                            <h2>{favorite.name}</h2>
                            <p>Status: {favorite.status}</p>
                            <p>Species: {favorite.species}</p>

                            <Link to={`/characters/${favorite.characterId}`}>View Details</Link>

                            <br />

                            <button onClick={() => handleDeleteFavorite(favorite.id)}>
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