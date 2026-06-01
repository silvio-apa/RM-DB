import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCharacterById } from "../services/rickAndMortyApi";
import {
  addFavorite,
  getFavoriteByCharacterId,
} from "../services/favoritesApi";

function CharacterDetailsPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoritesMessage, setFavoritesMessage] = useState("");

  useEffect(() => {
    async function loadCharacter() {
      try {
        const data = await getCharacterById(id);
        setCharacter(data);
        const existingFavorite = await getFavoriteByCharacterId(Number(id));
        setIsFavorite(Boolean(existingFavorite));
      } catch (error) {
        setErrorMessage(
          "Character details could not be loaded. Please try again later.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadCharacter();
  }, [id]);

  async function handleAddToFavorite() {
    try {
      const newFavorite = {
        characterId: character.id,
        name: character.name,
        image: character.image,
        status: character.status,
        species: character.species,
        note: "",
      };

      await addFavorite(newFavorite);
      setIsFavorite(true);
      setFavoritesMessage("Character added to favorites!");
    } catch (error) {
      setFavoritesMessage(
        "Failed to add to favorites. Please try again later.",
      );
    }
  }

  if (isLoading) {
    return <p>Loading character details...</p>;
  }
  if (errorMessage) {
    return <p>Error: {errorMessage}</p>;
  }
  if (!character) {
    return <p>Character not found.</p>;
  }

  return (
    <section>
      <Link to="/characters">Back to Characters</Link>

      <div className="character-details">
        <img src={character.image} alt={character.name} />
        <div>
          <h1>{character.name}</h1>
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>
          <p>Origin: {character.origin.name}</p>
          <p>Location: {character.location.name}</p>
          <button onClick={handleAddToFavorite} disabled={isFavorite}>
            {isFavorite ? "Already in Favorites" : "Add to Favorites"}
          </button>
          {favoritesMessage && <p>{favoritesMessage}</p>}
        </div>
      </div>
    </section>
  );
}

export default CharacterDetailsPage;
