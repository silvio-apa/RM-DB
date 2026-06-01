import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CharacterCard from "./CharacterCard";

const testCharacter = {
  id: 1,
  name: "Rick Sanchez",
  image: "https://example.com/rick.png",
  status: "Alive",
  species: "Human",
};

test("UT1: CharacterCard renders character data", () => {
  render(
    <MemoryRouter>
      <CharacterCard character={testCharacter} />
    </MemoryRouter>,
  );

  expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  expect(screen.getByText("Status: Alive")).toBeInTheDocument();
  expect(screen.getByText("Species: Human")).toBeInTheDocument();

  const image = screen.getByAltText("Rick Sanchez");
  expect(image).toHaveAttribute("src", "https://example.com/rick.png");
});

test("UT2: Detail link contains the character ID", () => {
  render(
    <MemoryRouter>
      <CharacterCard character={testCharacter} />
    </MemoryRouter>,
  );

  const link = screen.getByRole("link", { name: /view details/i });
  expect(link).toHaveAttribute("href", "/characters/1");
});