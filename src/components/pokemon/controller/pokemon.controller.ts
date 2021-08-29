import express, { Request, Response } from 'express';
import { AxiosError } from 'axios';
import { Pokemon, PokemonBodyComposition, PokemonSearchForm } from '../models/pokemon.interface';
import { getPokemonBodyCompositionByName, getPokemonByName, mapToBodyComposition } from '../service/pokemon.service';

interface PokemonControllerParams {
  pokemonName: string;
}

interface PokemonSearchFormBody {
  body: PokemonSearchForm;
}

const pokemonController = express.Router();

pokemonController.get('/:pokemonName', (req: Request<PokemonControllerParams>, res: Response) => {
  const { pokemonName } = req.params;

  getPokemonByName(pokemonName, res);
});

pokemonController.post('/info/body-composition', (req: Request, res: Response) => {
  const { body }: PokemonSearchFormBody = req;

  getPokemonBodyCompositionByName(body, res);
});

export default pokemonController;
