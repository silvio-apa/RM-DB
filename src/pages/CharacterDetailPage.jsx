import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCharacterById } from "../services/rickAndMortyApi";


function CharacterDetailsPage() {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function loadCharacter() {
            try {
                const data = await getCharacterById(id);
                setCharacter(data);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadCharacter();
    }, [id]);

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
                </div>
            </div> 
        </section>
    );
}


export default CharacterDetailsPage;