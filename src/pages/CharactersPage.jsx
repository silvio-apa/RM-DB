import { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import { getCharacters } from "../services/rickAndMortyApi";


function CharactersPage() {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        async function loadCharacters() {
            try {
                const data = await getCharacters();
                setCharacters(data.results);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        loadCharacters();
    }, []);



    return (
        <section>
            <h1>Characters</h1>

            <p> Browse characters from Rick and Morty, search for your favorite ones
                and open their detail pages to learn more about them.
            </p>

            {isLoading && <p>Loading characters...</p>}
            {errorMessage && <p>Error: {errorMessage}</p>}

            <div className="character-grid">
                {characters.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                ))}
            </div>
        </section>
    );
}   

export default CharactersPage;