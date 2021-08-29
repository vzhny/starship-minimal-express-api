# Project Requirements

1. Write code to pull Pikachu’s height and weight from: https://pokeapi.co/.

2. Write code to pull 5-6 (pick your favorite) Pokemon’s height and weight from the API.

3. Write an interface in REST or GraphQL to be able to pull heights and weights for one or more Pokemon(s).

4. Make the app so it can return mean, median, and mode from the interface you created in #3.

# Plan of Action

## Initial Setup

- Create a new Express.js project using TypeScript. Add any additional packages needed such as @types packages, axios, nodemon, etc.
- Set up VS Code for debugging.
- Create a folder structure for the app:
  - `root/`
    - `src/`
      - `config/`
      - `components/`
        - `pokemon/`
          - `controller/`
          - `service/`
          - `models/`

## API Planning

For this set of requirements, we want to create a `pokemon` controller to expose access to the requirement endpoints, in `pokemon.controller.ts`.

This pokemon controller should have the following endpoints:

- POST `/info` - this endpoint serves as the base URL for retrieving the pokemon information from the external API.

  - POST `/body-composition` - this endpoint serves as the URL for retrieving the pokemon's body composition information, namely height and weight.
    - POST `/statistics` - this endpoint serves as the URL for calculating the list of pokemon's mean, median, and mode.

- The above endpoints receive a request body in the form of a search form as follows: `{ "pokemonNames": [] }`

## Endpoints

- `/pokemon/pikachu-body-composition` which internally calls `/pokemon/info/body-composition` with a request body of `{ "pokemonNames": ["pikachu"] }`
- `/pokemon/favorites-body-composition` which internally calls `/pokemon/info/body-composition` with a request body of `{ "pokemonNames": ["braviary", "ferrothorn", "rotom-wash", "cofagrigus", "volcarona", "sylveon"] }`
- `/pokemon/info/body-composition` with a request body of `{ "pokemonNames": [<one or more pokemon names>] }`
- `/pokemon/info/body-composition/statistics` with a request body of `{ "pokemonNames": [<one or more pokemon names>] }`

## Mean/Median/Mode Notes

- The mean is the average of a list of numbers.
- The median is the middle number in a list of ordered numbers. If the list has an even length, the median would be the average of the two middle numbers.
- The mode is the most frequent number(s) in a list of numbers.
