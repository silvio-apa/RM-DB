import { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import { getCharacters } from "../services/rickAndMortyApi";

function CharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    async function loadCharacters() {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const data = await getCharacters(searchTerm, currentPage);
        setCharacters(data.results || []);
        setTotalPages(data.info?.pages || 1);
      } catch (error) {
        console.error(error);
        setErrorMessage("Characters could not be loaded. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
    loadCharacters();
  }, [searchTerm, currentPage, reloadKey]);

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }

  function goToPreviousPage() {
    if (!isLoading && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function goToNextPage() {
    if (!isLoading && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function retryLoading() {
    setErrorMessage("");
    setReloadKey(reloadKey + 1);
  }

  return (
    <section>
      <h1>Characters</h1>

      <p>
        Browse characters from Rick and Morty, search for your favorite ones and
        open their detail pages to learn more about them.
      </p>

      <input
        className="search-input"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search characters by name..."
      />

      {isLoading && <p>Loading characters...</p>}
      {!isLoading && errorMessage && (
        <div>
          <p>Error: {errorMessage}</p>
          <button onClick={retryLoading}>Try Again</button>
        </div>
      )}
      {!isLoading && !errorMessage && characters.length === 0 && (
        <p>No characters found.</p>
      )}

      <div className="character-grid">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {characters.length > 0 && (
        <div className="pagination">
          <button
            onClick={goToPreviousPage}
            disabled={isLoading || currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={isLoading || currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}

export default CharactersPage;
