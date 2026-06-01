import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, expect, test, vi } from "vitest";
import FavoritesPage from "./FavoritesPage";
import * as favoritesApi from "../services/favoritesApi";

vi.mock("../services/favoritesApi");

beforeEach(() => {
  vi.clearAllMocks();
});

test("UT7: FavoritesPage deletes a favorite", async () => {
  favoritesApi.getFavorites.mockResolvedValueOnce([
    {
      id: 1,
      characterId: 1,
      name: "Rick Sanchez",
      image: "https://example.com/rick.png",
      status: "Alive",
      species: "Human",
      note: "",
    },
  ]);

  favoritesApi.deleteFavorite.mockResolvedValueOnce();

  render(
    <MemoryRouter>
      <FavoritesPage />
    </MemoryRouter>,
  );

  expect(await screen.findByText("Rick Sanchez")).toBeInTheDocument();

  const deleteButton = screen.getByRole("button", {
    name: /remove from favorites/i,
  });

  await userEvent.click(deleteButton);

  expect(favoritesApi.deleteFavorite).toHaveBeenCalledWith(1);

  await waitFor(() => {
    expect(screen.queryByText("Rick Sanchez")).not.toBeInTheDocument();
  });
});