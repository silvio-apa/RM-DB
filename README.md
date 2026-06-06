# Rick and Morty Database

This project is a React web application for browsing Rick and Morty characters.  
Users can search characters, switch between result pages, view character details, save favorites and add personal notes.

## Features

- Browse Rick and Morty characters
- Search characters by name
- Pagination with Previous and Next buttons
- View detailed character information
- Save characters as favorites
- Add, edit and delete personal notes for favorites
- Remove favorites
- Error handling for API problems
- Unit tests with Vitest

## Technologies

- React
- Vite
- React Router
- Rick and Morty API
- json-server
- Vitest
- React Testing Library

## Installation

### 1. Requirements

- Node.js installed
- npm installed
- Git installed
- Visual Studio Code or another IDE
- Internet connection for the Rick and Morty API

### 2. Clone the project

```bash
git clone https://github.com/silvio-apa/RM-DB.git
cd RM-DB
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the local Favorites API

Open terminal 1 in the project folder and run:

```bash
npm run server
```

The json-server runs on:

```text
http://localhost:3001
```

The favorites can be checked in the browser under:

```text
http://localhost:3001/favorites
```

### 5. Start the React frontend

Open terminal 2 in the project folder and run:

```bash
npm run dev
```

The terminal will show a local Vite URL, normally:

```text
http://localhost:5173
```

Open this URL in the browser.

Important: The React frontend and the json-server must run at the same time. Otherwise, the favorites feature will not work.

## Run tests

Open terminal 3 run all unit tests with:

```bash
npm run test:run
```

The project includes unit tests for:

- CharacterCard rendering
- Detail link with correct character ID
- Rick and Morty API search URL
- 404 search result handling
- POST request for adding favorites
- PATCH request for updating favorites
- Deleting favorites on the Favorites page

## Function test after installation

After starting both servers, check the following:

- Home page opens correctly
- Navbar switches between Home, Characters and Favorites
- Characters page loads data from the Rick and Morty API
- Search and pagination work
- Detail page opens the correct character
- Add to Favorites saves a character in db.json
- Favorites page shows saved favorites
- Notes can be saved
- Favorites can be deleted

## Project structure

```text
public/
├── images/
│   └── rick-and-morty-home.png
└── favicon.svg

src/
├── components/
│   ├── CharacterCard.jsx
│   ├── CharacterCard.test.jsx
│   └── Navbar.jsx
├── pages/
│   ├── CharacterDetailPage.jsx
│   ├── CharactersPage.jsx
│   ├── FavoritesPage.jsx
│   ├── FavoritesPage.test.jsx
│   └── HomePage.jsx
├── services/
│   ├── favoritesApi.js
│   ├── favoritesApi.test.js
│   ├── rickAndMortyApi.js
│   └── rickAndMortyApi.test.js
├── test/
│   └── setup.js
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

## External API

The character data is loaded from the Rick and Morty API:

```text
https://rickandmortyapi.com/api
```

## Local database

Favorites are stored locally with json-server in:

```text
db.json
```

Example structure:

```json
{
  "favorites": []
}
```