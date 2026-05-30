import { Link } from "react-router-dom";

function CharacterCard({ character }) {
    return (
        <article className="character-card">
            <img src={character.image} alt={character.name} />

            <div>
                <h2>{character.name}</h2>
                <p>Status: {character.status}</p>
                <p>Species: {character.species}</p>

                <Link to={`/characters/${character.id}`}>View Details</Link>
            </div>
        </article>
    );
}

export default CharacterCard;