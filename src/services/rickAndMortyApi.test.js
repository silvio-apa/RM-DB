import { beforeEach, expect, test, vi } from "vitest";
import { getCharacters } from "./rickAndMortyApi";

beforeEach(() => {
  global.fetch = vi.fn();
});

test("UT3: getCharacters builds the search URL correctly", async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      info: { pages: 1 },
      results: [],
    }),
  });

  await getCharacters("Rick", 2);

  expect(fetch).toHaveBeenCalledWith(
    "https://rickandmortyapi.com/api/character/?name=Rick&page=2",
  );
});

test("UT4: getCharacters returns empty results for 404 search", async () => {
  fetch.mockResolvedValueOnce({
    ok: false,
    status: 404,
  });

  const data = await getCharacters("xyzxyz", 1);

  expect(data).toEqual({
    info: {
      next: null,
      prev: null,
      pages: 0,
    },
    results: [],
  });
});