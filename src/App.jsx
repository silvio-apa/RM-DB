import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CharactersPage from "./pages/CharactersPage";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main className="page">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Characters" element={<CharactersPage />} />
          <Route path="/Characters/:id" element={<CharacterDetailPage />} />
          <Route path="/Favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </>
  );
}
  
export default App;