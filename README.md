# Pokédex Lite

A web application that utilizes data from [PokéAPI](https://pokeapi.co/) to search, filter through, and display comprehensive data on various Pokémon species. Users can search from categories including generation, type, shape, habitat, color, as well as directly through Pokémon name or Pokédex number. Pokémon can also be stored as favourites for future referencing.

## Usage

The app is hosted online and can be run at https://project2-pokedex-lite.vercel.app/

To deploy the app locally, clone the project into a Create-React-App directory, install the additional dependencies `react-router` and `react-router-dom`, and run `npm start`.

## Technologies Used

- ReactJS <picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/llkyz/llkyz/icons/react/react-original.svg"><img height="30" width="30" src="https://cdn.jsdelivr.net/gh/llkyz/llkyz/icons/react/react-original.svg"></picture> 
- HTML5 <picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/llkyz/llkyz/icons/html5/html5-white-original-wordmark.svg"><img height="30" width="30" src="https://cdn.jsdelivr.net/gh/llkyz/llkyz/icons/html5/html5-original-wordmark.svg"></picture>
- CSS3 <picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/llkyz/llkyz/icons/css3/css3-white-original-wordmark.svg"><img height="30" width="30" src="https://cdn.jsdelivr.net/gh/llkyz/llkyz/icons/css3/css3-original-wordmark.svg"></picture>
- JavaScript <picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/llkyz/llkyz/icons/javascript/javascript-original.svg"><img height="30" width="30" src="https://cdn.jsdelivr.net/gh/llkyz/llkyz/icons/javascript/javascript-original.svg"></picture>

## User Stories

As a Pokémon gamer, I want a Pokémon list so that I can easily find the Pokémon I'm looking for and all the information about it.

## Layout

### Wireframe

The overall navigation flow of the app. The main pages are the Pokédex and Pokémon page, with the other pages acting as navigation aids to direct users toward the main pages.

![layout](https://user-images.githubusercontent.com/115427253/204695718-2d1a6b7c-7078-4f90-943d-a3bb2b7bca92.png)
---

### Region page

Displays a list of locations in that region. Users can click specific locations to get a list of Pokémon found in that location.

![page3](https://user-images.githubusercontent.com/115427253/204696919-d87f04e2-73f6-45c5-a1f1-e48801ab5991.jpg)
---

### Pokédex page

Currently displaying the full list of Pokémon available. Clicking any Pokémon card will display detailed information regarding that Pokémon. This page can be used to filter by various properties like Type or Color.

![page1](https://user-images.githubusercontent.com/115427253/204696899-728e044a-b0c5-43f3-a9df-2dfd0edc7d06.jpg)
---

### Pokémon Species page

Displays a comprehensive list of information regarding the Pokémon, including:
- Name
- Picture
- Forms
- Stats
- Attributes
- Evolution Chain
- Abilities
- Moves
- Encounters
- Flavor Text

![page2](https://user-images.githubusercontent.com/115427253/204696909-f80f01b4-7f46-415d-9c40-d3f88e4cdd25.jpg)

## Challenges

The PokéAPI provides access to an extensive amount of information and resources. While this was incredibly helpful in building an informational app, it also proved challenging to sift through the mountain of data to grab what I required.

Due to the way certain information was structured within the API, I often had to filter, clean, and re-organize the information before it could be presented to the user.

As the project developed, it also gradually became bulkier and harder to make changes without affecting a significant portion of the existing code. This is especially so when modifying data structures that could potentially run through the majority of the app. Thus I understood the importance of planning and tying down the data flow properly before starting on a project.

<hr>

## APIs Used

- [PokéAPI](https://pokeapi.co/)

## References

- [CSS Only 3D Bar Graph](https://codepen.io/TimRuby/pen/DGYoYz)
