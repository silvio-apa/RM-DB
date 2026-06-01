import { beforeEach, expect, test, vi } from "vitest";
import { addFavorite, updateFavorite } from "./favoritesApi";

beforeEach(() => {
  global.fetch = vi.fn();
});

test("UT5: addFavorite sends a POST request", async () => {
  const favorite = {
    characterId: 1,
    name: "Rick Sanchez",
    image: "https://example.com/rick.png",
    status: "Alive",
    species: "Human",
    note: "",
  };

  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ id: 1, ...favorite }),
  });

  await addFavorite(favorite);

  expect(fetch).toHaveBeenCalledWith("http://localhost:3001/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(favorite),
  });
});

test("UT6: updateFavorite sends a PATCH request", async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      id: 1,
      note: "Cool character",
    }),
  });

  await updateFavorite(1, { note: "Cool character" });

  expect(fetch).toHaveBeenCalledWith("http://localhost:3001/favorites/1", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ note: "Cool character" }),
  });
});