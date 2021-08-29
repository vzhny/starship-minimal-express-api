import { Request, Response } from 'express';
import axios from 'axios';
import { BASE_POKEAPI_URL } from '../../../config/config';
import { Pokemon, PokemonBodyComposition, PokemonSearchForm } from '../models/pokemon.interface';
import { pick } from 'lodash';

const simpleCache = new Map<string, Pokemon>();

const getPokemonFromPokeAPI = (pokemonName: string) => {
  return axios.get<Pokemon>(`${BASE_POKEAPI_URL}/pokemon/${pokemonName}`);
};

export const getPokemonByName = async (pokemonName: string, res: Response) => {
  if (simpleCache.has(pokemonName)) {
    const cachedPokemon = simpleCache.get(pokemonName);

    // This additional if check is excessive since the initial if expression above is checking the the map
    // has the pokemon data by name and will only return true if the data exists.
    // This if check is to prevent the following TypeScript error:
    // TS2345: Argument of type 'Pokemon | undefined' is not assignable to parameter of type 'Pokemon'.
    if (cachedPokemon !== undefined) {
      res.status(200).json(cachedPokemon);
    }
  } else {
    try {
      const { status, data } = await getPokemonFromPokeAPI(pokemonName);

      simpleCache.set(pokemonName, data);

      res.status(status).json(data);
    } catch (error: any) {
      // TS1196: Catch clause variable type annotation must be 'any' or 'unknown' if specified.
      const { status, statusText } = error.response;

      res.status(status).json({ message: statusText });
    }
  }
};

export const getPokemonBodyCompositionByName = async ({ pokemonNames }: PokemonSearchForm, res: Response) => {
  const lowercasePokemonNames = pokemonNames.map((name: string) => name.toLowerCase());
  const uniquePokemonNames = new Set<string>(lowercasePokemonNames);
  const uniquePokemonNamesList = Array.from(uniquePokemonNames.values());

  const response = await uniquePokemonNamesList.reduce<Promise<PokemonBodyComposition[]>>(async (listPromise, name) => {
    const list = await listPromise;

    if (simpleCache.has(name)) {
      const cachedPokemon = simpleCache.get(name);

      // This additional if check is excessive since the initial if expression above is checking the the map
      // has the pokemon data by name and will only return true if the data exists.
      // This if check is to prevent the following TypeScript error:
      // TS2345: Argument of type 'Pokemon | undefined' is not assignable to parameter of type 'Pokemon'.
      if (cachedPokemon !== undefined) {
        list.push(mapToBodyComposition(cachedPokemon));
      }
    } else {
      try {
        const { status, data } = await getPokemonFromPokeAPI(name);

        simpleCache.set(name, data);

        list.push(mapToBodyComposition(data));
      } catch (error: any) {
        // TS1196: Catch clause variable type annotation must be 'any' or 'unknown' if specified.

        return list;
      }
    }

    return list;
  }, Promise.resolve([] as PokemonBodyComposition[]));

  res.status(200).json(response);
};

export const mapToBodyComposition = (pokemon: Pokemon) => {
  return pick(pokemon, ['name', 'height', 'weight']) as PokemonBodyComposition;
};
