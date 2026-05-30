const BASE_URL = 'https://rickandmortyapi.com/api';

export async function getCharacters() {
  const response = await fetch(`${BASE_URL}/character`);

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