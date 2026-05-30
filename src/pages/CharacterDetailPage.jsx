import { useParams } from "react-router-dom";

function CharacterDetailsPage() {
    const { id } = useParams();

    return (
        <section>
            <h1>Character Details</h1>

            <p>Detailed information for character ID: {id} 
            </p>
        </section>
    );
}   

export default CharacterDetailsPage;