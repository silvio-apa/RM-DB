const BASE_URL = "http://localhost:3001";

export async function getFavorites() {
  const response = await fetch(`${BASE_URL}/favorites`);

    if (!response.ok) {
        throw new Error("Favorites could not be loaded.");
    }
    return response.json();
}

export async function getFavoriteByCharacterId(characterId) {
    const response = await fetch(`${BASE_URL}/favorites?characterId=${characterId}`);

    if (!response.ok) {
        throw new Error("Favorite could not be checked.");
    }
    const favorites = await response.json();
    return favorites[0] || null;
    
}

export async function addFavorite(favorite) {
    const response = await fetch(`${BASE_URL}/favorites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(favorite),
    });

    if (!response.ok) {
        throw new Error("Favorite could not be added.");
    }
    return response.json();
}

export async function deleteFavorite(id) {
    const response = await fetch(`${BASE_URL}/favorites/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Favorite could not be deleted.");
    }
}
export async function updateFavorite(id, updatedData) {
    const response = await fetch(`${BASE_URL}/favorites/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        throw new Error("Favorite could not be updated.");
    }
    return response.json();
}
