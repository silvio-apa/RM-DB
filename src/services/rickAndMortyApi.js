const BASE_URL = 'https://rickandmortyapi.com/api';

export async function getCharacters(name = "", page = 1) {
  const trimmedName = name.trim();
  const url = trimmedName
    ? `${BASE_URL}/character/?name=${encodeURIComponent(trimmedName)}&page=${page}`
    : `${BASE_URL}/character/?page=${page}`;
  
  const response = await fetch(url);
  if (response.status === 404) {
    return {
      info: {
        next: null,
        prev: null,
        pages: 0,
      },
       results: [] };
  }

  if (!response.ok) {
    throw new Error('Characters could not be loaded.');
  }

  return response.json();
}


export async function getCharacterById(id) {
  const response = await fetch(`${BASE_URL}/character/${id}`);

  if (!response.ok) {
    throw new Error('Character could not be loaded.');
  }

  return response.json();
}